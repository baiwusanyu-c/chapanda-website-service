import { Inject, Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { MINIO_CLIENT } from '../minio/minio.module';
import * as Minio from 'minio';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/entities/user.entity';
import { genResponse, StatusCode } from '../utils';
import { FindPdfDto } from './dto/find-pdf.dto';
import { Upload } from './entities/upload.entity';
import { FindPdfsDto } from './dto/find-pdf-list.dto';
import { ResFileListDto, ResFileDto } from './dto/res-file.dto';

@Injectable()
export class UploadService {
  @InjectEntityManager()
  private manager: EntityManager;
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: ChaPandaLogger;
  @Inject()
  i18n: I18nService;
  @Inject(MINIO_CLIENT)
  private minioClient: Minio.Client;

  i18nGetter(key: string, operation?: string) {
    return this.i18n.t<string, string>(
      // 文案的 key
      key,
      {
        // 当前语言
        lang: I18nContext.current()!.lang,
        args: {
          operation,
        },
      },
    );
  }
  // TODO: 这么做会导致前端如果没上传成功，造成表插入脏数据
  async pdf(createUploadDto: CreateUploadDto) {
    try {
      const bucketName = 'chapanda-pdf';
      const uploadUrl = await this.getPresignedUploadUrl(
        bucketName,
        createUploadDto.fileName,
      );
      const previewUrl = await this.getPresignedPreviewUrl(
        bucketName,
        createUploadDto.fileName,
      );
      const downloadUrl = await this.getPresignedDownloadUrl(
        bucketName,
        createUploadDto.fileName,
      );

      const uuid = uuidv4();
      const query = `
          START TRANSACTION;
          INSERT INTO pdf
          (id, previewUrl, downLoadUrl, fileName, category, description, createTime, updateTime)
          VALUES
          (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
          COMMIT;`;

      await this.manager.query<User>(query, [
        uuid,
        previewUrl,
        downloadUrl,
        createUploadDto.fileName,
        createUploadDto.category,
        createUploadDto.description,
      ]);
      return genResponse<{ uploadUrl: string }>(
        StatusCode.OK,
        {
          uploadUrl,
        },
        this.i18nGetter('upload.create.success'),
      );
    } catch (error) {
      this.logger.error(error, UploadService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }
  async findPdf(findPdfDto: FindPdfDto) {
    try {
      const query = `SELECT * FROM pdf WHERE fileName = ? OR id = ?;`;
      const res = await this.manager.query<Upload[]>(query, [
        findPdfDto.fileName,
        findPdfDto.id,
      ]);

      return genResponse<Upload[]>(
        StatusCode.OK,
        res,
        this.i18nGetter('upload.find.success'),
      );
    } catch (error) {
      this.logger.error(error, UploadService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }
  async findPdfList(findPdfsDto: FindPdfsDto) {
    try {
      const totalQuery = `
      SET @keyword = (CONVERT(? USING utf8mb4) COLLATE utf8mb4_0900_ai_ci);
      SET @category = (CONVERT(? USING utf8mb4) COLLATE utf8mb4_0900_ai_ci);
      SET @startDate = (CONVERT(? USING utf8mb4) COLLATE utf8mb4_0900_ai_ci);
      SET @endDate = (CONVERT(? USING utf8mb4) COLLATE utf8mb4_0900_ai_ci);
      SELECT COUNT(*) AS total
      FROM pdf
      WHERE
        -- 关键字模糊匹配（description或fileName）
        (@keyword IS NULL OR 
         description LIKE CONCAT('%', @keyword, '%') OR 
         fileName LIKE CONCAT('%', @keyword, '%'))
        
        -- 分类匹配
        AND (@category IS NULL OR category = @category)
        
        -- 时间范围查询（带默认值逻辑）
        AND (
          (@startDate IS NULL AND @endDate IS NULL)  -- 无时间条件
          OR
          (
            updateTime >= @startDate 
            AND 
            updateTime <= COALESCE(@endDate, NOW())  -- endDate为空时取当前时间
          )
        )
      `;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const totalResult = await this.manager.query<
        [unknown, unknown, unknown, unknown, Array<{ total: number }>]
      >(totalQuery, [
        findPdfsDto.keyword,
        findPdfsDto.category,
        findPdfsDto.startDate,
        findPdfsDto.endDate,
      ]);
      const total = totalResult[4][0].total;

      const query = `
      SET @keyword = (CONVERT(? USING utf8mb4) COLLATE utf8mb4_0900_ai_ci);
      SET @category = (CONVERT(? USING utf8mb4) COLLATE utf8mb4_0900_ai_ci);
      SET @startDate = (CONVERT(? USING utf8mb4) COLLATE utf8mb4_0900_ai_ci);
      SET @endDate = (CONVERT(? USING utf8mb4) COLLATE utf8mb4_0900_ai_ci);
      SELECT *
      FROM pdf
      WHERE
        -- 关键字模糊匹配（description或fileName）
        (@keyword IS NULL OR 
         description LIKE CONCAT('%', @keyword, '%') OR 
         fileName LIKE CONCAT('%', @keyword, '%'))
        
        -- 分类匹配
        AND (@category IS NULL OR category = @category)
        
        -- 时间范围查询（带默认值逻辑）
        AND (
          (@startDate IS NULL AND @endDate IS NULL)  -- 无时间条件
          OR
          (
            updateTime >= @startDate 
            AND 
            updateTime <= COALESCE(@endDate, NOW())  -- endDate为空时取当前时间
          )
        )
      -- 建议添加排序以保证分页稳定性
      ORDER BY updateTime DESC
      -- 分页参数
      LIMIT ? OFFSET ?;`;
      const pageSize = Number(findPdfsDto.pageSize);
      const offset = (Number(findPdfsDto.pageNum) - 1) * pageSize;
      const records = await this.manager.query<
        [unknown, unknown, unknown, unknown, ResFileDto[]]
      >(query, [
        findPdfsDto.keyword,
        findPdfsDto.category,
        findPdfsDto.startDate,
        findPdfsDto.endDate,
        pageSize,
        offset,
      ]);
      const res = {
        total,
        records: records[4],
      };
      return genResponse<ResFileListDto>(
        StatusCode.OK,
        res,
        this.i18nGetter('upload.find.success'),
      );
    } catch (error) {
      this.logger.error(error, UploadService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  // 生成临时上传地址（PUT 方法）
  async getPresignedUploadUrl(
    bucketName: string,
    fileName: string,
    expires = 60 * 60,
  ): Promise<string> {
    return this.minioClient.presignedPutObject(bucketName, fileName, expires);
  }

  // 生成文件下载地址（GET 方法，浏览器会触发下载）
  async getPresignedPreviewUrl(
    bucketName: string,
    fileName: string,
    expires = 60 * 60,
  ): Promise<string> {
    return this.minioClient.presignedGetObject(bucketName, fileName, expires);
  }

  // 生成文件下载地址（GET 方法，浏览器会触发下载）
  async getPresignedDownloadUrl(
    bucketName: string,
    fileName: string,
    expires = 60 * 60,
  ): Promise<string> {
    return this.minioClient.presignedGetObject(bucketName, fileName, expires, {
      // 关键：设置 Content-Disposition 为 inline，让浏览器直接显示而非下载
      'response-content-disposition':
        'attachment; filename="' + encodeURIComponent(fileName) + '"',
    });
  }
}
