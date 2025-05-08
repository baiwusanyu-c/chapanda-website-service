import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { genResponse, md5, StatusCode } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class PermissionService {
  @InjectEntityManager()
  private manager: EntityManager;
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: ChaPandaLogger;
  @Inject()
  i18n: I18nService;
  @Inject(JwtService)
  private jwtService: JwtService;
  @Inject(RedisService)
  private redisService: RedisService;
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
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const uuid = uuidv4();
      const query = `
          START TRANSACTION; 
          INSERT INTO permission
          (id, type, name, path, method, menuId, createTime, updateTime)
          VALUES
          (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
          COMMIT;`;

      await this.manager.query<User>(query, [
        uuid,
        createPermissionDto.type,
        createPermissionDto.name,
        createPermissionDto.path,
        createPermissionDto.method,
        createPermissionDto.menuId,
      ]);
      return genResponse<null>(
        StatusCode.OK,
        null,
        this.i18nGetter('permission.create.success'),
      );
    } catch (error) {
      this.logger.error(error, PermissionService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }
}
