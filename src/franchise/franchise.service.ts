import { Inject, Injectable } from '@nestjs/common';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { FindFranchiseDto } from './dto/find-franchise.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/entities/user.entity';
import { genResponse, StatusCode } from '../utils';
import { News } from '../news/entities/news.entity';
import { Franchise } from './entities/franchise.entity';

@Injectable()
export class FranchiseService {
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
  async create(createFranchiseDto: CreateFranchiseDto) {
    try {
      const uuid = uuidv4();
      const query = `
          START TRANSACTION; 
          INSERT INTO franchise
          (id, title, titleEn, detail, detailEn, \`order\`, createTime, updateTime)
          VALUES
          (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
          COMMIT;`;

      await this.manager.query<any>(query, [
        uuid,
        createFranchiseDto.title,
        createFranchiseDto.titleEn,
        createFranchiseDto.detail,
        createFranchiseDto.detailEn,
        createFranchiseDto.order,
      ]);
      return genResponse<null>(
        StatusCode.OK,
        null,
        this.i18nGetter('franchise.create.success'),
      );
    } catch (error) {
      this.logger.error(error, FranchiseService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async list(findFranchiseDto: FindFranchiseDto) {
    try {
      const totalQuery = `SELECT COUNT(*) AS total FROM franchise`;
      const [totalResult] = await this.manager.query<Array<{ total: number }>>(
        totalQuery,
        [],
      );
      const total = totalResult.total;

      const recordsQuery = `
      SELECT * FROM franchise
      ORDER BY id 
      LIMIT ? OFFSET ?;
      `;
      const offset =
        (Number(findFranchiseDto.pageNum) - 1) * findFranchiseDto.pageSize;
      const pageSize = Number(findFranchiseDto.pageSize);
      const records = await this.manager.query<Franchise[]>(recordsQuery, [
        pageSize,
        offset,
      ]);
      const res = {
        total,
        records,
      };
      return genResponse<any>(
        StatusCode.OK,
        res,
        this.i18nGetter('franchise.find.success'),
      );
    } catch (error) {
      this.logger.error(error, FindFranchiseDto.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }
}
