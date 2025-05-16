import { Inject, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { FindNewsDto } from './dto/find-news.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/entities/user.entity';
import { genResponse, StatusCode } from '../utils';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
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

  async create(createNewsDto: CreateNewsDto) {
    try {
      const uuid = uuidv4();
      const query = `
          START TRANSACTION; 
          INSERT INTO news
          (id, title, detail,titleEn, detailEn, link, date, createTime, updateTime)
          VALUES
          (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
          COMMIT;`;

      await this.manager.query<User>(query, [
        uuid,
        createNewsDto.title,
        createNewsDto.detail,
        createNewsDto.titleEn,
        createNewsDto.detailEn,
        createNewsDto.link,
        new Date(createNewsDto.date),
      ]);
      return genResponse<null>(
        StatusCode.OK,
        null,
        this.i18nGetter('news.create.success'),
      );
    } catch (error) {
      this.logger.error(error, NewsService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async list(findNewsDto: FindNewsDto) {
    try {
      const totalQuery = `SELECT COUNT(*) AS total FROM news`;
      const [totalResult] = await this.manager.query<Array<{ total: number }>>(
        totalQuery,
        [],
      );
      const total = totalResult.total;

      const recordsQuery = `
      SELECT * FROM news
      ORDER BY id 
      LIMIT ? OFFSET ?;
      `;
      const offset = (Number(findNewsDto.pageNum) - 1) * findNewsDto.pageSize;
      const pageSize = Number(findNewsDto.pageSize);
      const records = await this.manager.query<News[]>(recordsQuery, [
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
        this.i18nGetter('news.find.success'),
      );
    } catch (error) {
      this.logger.error(error, NewsService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }
}
