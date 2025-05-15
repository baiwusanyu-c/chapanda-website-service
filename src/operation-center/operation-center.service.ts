import { Inject, Injectable } from '@nestjs/common';
import { CreateOperationCenterDto } from './dto/create-operation-center.dto';
import { FindOperationCenterDto } from './dto/find-operation-center.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/entities/user.entity';
import { genResponse, StatusCode } from '../utils';
import { OperationCenter } from './entities/operation-center.entity';

@Injectable()
export class OperationCenterService {
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
  async create(createOperationCenterDto: CreateOperationCenterDto) {
    try {
      const uuid = uuidv4();
      const query = `
          START TRANSACTION; 
          INSERT INTO operation_center
          (
          id, 
          name, 
          address, 
          \`type\`, 
          website, 
          supervisionPhone, 
          email, 
          networkSecurity, 
          franchiseHotline,
          customerServiceHotline,
          reportingMobile,
          weChat,
          createTime, 
          updateTime
          )
          VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
          COMMIT;`;

      await this.manager.query<User>(query, [
        uuid,
        createOperationCenterDto.name,
        createOperationCenterDto.address,
        createOperationCenterDto.type,
        createOperationCenterDto.website || null,
        createOperationCenterDto.supervisionPhone || null,
        createOperationCenterDto.email || null,
        createOperationCenterDto.networkSecurity || null,
        createOperationCenterDto.franchiseHotline || null,
        createOperationCenterDto.customerServiceHotline || null,
        createOperationCenterDto.reportingMobile || null,
        createOperationCenterDto.weChat || null,
      ]);
      return genResponse<null>(
        StatusCode.OK,
        null,
        this.i18nGetter('operation.create.success'),
      );
    } catch (error) {
      this.logger.error(error, OperationCenterService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async list(findOperationCenterDto: FindOperationCenterDto) {
    try {
      const totalQuery = `
        SET @type = ?;
        SELECT COUNT(*) AS total
        FROM \`operation_center\`
        WHERE (@type IS NULL OR \`type\` = CONVERT(@type USING utf8mb4) COLLATE utf8mb4_0900_ai_ci);`;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, totalResult] = await this.manager.query<
        [unknown, Array<{ total: number }>]
      >(totalQuery, [findOperationCenterDto.type]);
      const total = totalResult[0].total;
      const recordsQuery = `
        SET @type = ?;
        SELECT *
        FROM \`operation_center\`
        WHERE (@type IS NULL OR \`type\` = CONVERT(@type USING utf8mb4) COLLATE utf8mb4_0900_ai_ci)
        ORDER BY id 
        LIMIT ? OFFSET ?;`;
      const pageSize = Number(findOperationCenterDto.pageSize);
      const offset = (Number(findOperationCenterDto.pageNum) - 1) * pageSize;
      const records = await this.manager.query<[unknown, OperationCenter]>(
        recordsQuery,
        [findOperationCenterDto.type, pageSize, offset],
      );
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
      this.logger.error(error, OperationCenterService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }
}
