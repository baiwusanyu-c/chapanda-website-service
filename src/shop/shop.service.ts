import { Inject, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { genResponse, StatusCode } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/entities/user.entity';
import { FindShopDto } from './dto/find-shop.dto';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  @InjectEntityManager()
  private manager: EntityManager;
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: ChaPandaLogger;
  @Inject()
  i18n: I18nService;

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
  async create(createShopDto: CreateShopDto) {
    try {
      const uuid = uuidv4();
      const query = `
          START TRANSACTION; 
          INSERT INTO shop
          (id, region, regionEn, name, nameEn, createTime, updateTime)
          VALUES
          (?, ?, ?, ?, ?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
          COMMIT;`;

      await this.manager.query<User>(query, [
        uuid,
        createShopDto.region,
        createShopDto.regionEn,
        createShopDto.name,
        createShopDto.nameEn,
      ]);
      return genResponse<null>(
        StatusCode.OK,
        null,
        this.i18nGetter('shop.create.success'),
      );
    } catch (error) {
      this.logger.error(error, ShopService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async batchCreate(createShopDto: CreateShopDto[]) {
    try {
      let dataArr: string[] = [];
      const sqlArr: string[] = [];
      createShopDto.forEach((v) => {
        const uuid = uuidv4();
        dataArr = dataArr.concat([
          uuid,
          v.region,
          v.regionEn,
          v.name,
          v.nameEn,
        ]);
        sqlArr.push('(?, ?, ?, ?, ?, @current_time, @current_time)');
      });
      const query = `
          START TRANSACTION;
          SET @current_time = CURRENT_TIMESTAMP(6);
          INSERT INTO shop
          (id, region, regionEn, name, nameEn, createTime, updateTime)
          VALUES
          ${sqlArr.join(', ')};
          COMMIT;`;

      await this.manager.query<User>(query, dataArr);
      return genResponse<null>(
        StatusCode.OK,
        null,
        this.i18nGetter('shop.create.success'),
      );
    } catch (error) {
      this.logger.error(error, ShopService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async list(findShopDto: FindShopDto) {
    try {
      const totalQuery = `
        SET @region_en = ?;
        SELECT COUNT(*) AS total
        FROM shop
        WHERE (@region_en IS NULL OR regionEn = (CONVERT(@region_en USING utf8mb4) COLLATE utf8mb4_0900_ai_ci))`;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, totalResult] = await this.manager.query<
        [unknown, Array<{ total: number }>]
      >(totalQuery, [findShopDto.regionEn]);
      const total = totalResult[0].total;

      const recordsQuery = `
      SET @region_en = ?;
      SELECT *
      FROM shop
       WHERE (@region_en IS NULL OR regionEn = (CONVERT(@region_en USING utf8mb4) COLLATE utf8mb4_0900_ai_ci))
      ORDER BY id 
      LIMIT ? OFFSET ?;
      `;
      const offset = (Number(findShopDto.pageNum) - 1) * findShopDto.pageSize;
      const pageSize = Number(findShopDto.pageSize);
      const records = await this.manager.query<[unknown, Shop]>(recordsQuery, [
        findShopDto.regionEn,
        pageSize,
        offset,
      ]);
      const res = {
        total,
        records: records[1],
      };
      return genResponse<any>(
        StatusCode.OK,
        res,
        this.i18nGetter('shop.find.success'),
      );
    } catch (error) {
      this.logger.error(error, ShopService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }
}
