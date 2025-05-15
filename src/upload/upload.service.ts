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
          (id, previewUrl, downLoadUrl, fileName, category, createTime, updateTime)
          VALUES
          (?, ?, ?, ?, ?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
          COMMIT;`;

      await this.manager.query<User>(query, [
        uuid,
        previewUrl,
        downloadUrl,
        createUploadDto.fileName,
        createUploadDto.category,
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
