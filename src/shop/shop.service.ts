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

  list() {
    return `This action returns all shop`;
  }
}
