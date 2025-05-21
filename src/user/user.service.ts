import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { genResponse, md5, StatusCode } from '../utils';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserResDto } from './dto/login-user-res.dto';
import { FindRemoveUserDto } from './dto/find-remove-user.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class UserService {
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

  async create(createUserDto: CreateUserDto) {
    const has = await this.findUserByEmailOrName(
      createUserDto.username,
      createUserDto.email,
    );
    if (has && has.success) {
      throw new HttpException(
        this.i18nGetter('user.exception.exist'),
        StatusCode.OK,
      );
    }
    try {
      const hashPassword = md5(createUserDto.password);
      const uuid = uuidv4();
      const query = `
          START TRANSACTION; 
          INSERT INTO user
          (username, password, email, id, createTime, updateTime)
          VALUES
          (?, ?, ?, ?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
          COMMIT;`;

      await this.manager.query<User>(query, [
        createUserDto.username,
        hashPassword,
        createUserDto.email,
        uuid,
      ]);
      return genResponse<null>(
        StatusCode.OK,
        null,
        this.i18nGetter('user.create.success'),
      );
    } catch (error) {
      this.logger.error(error, UserService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async findAll() {
    try {
      const query = `SELECT * FROM user;`;
      const res = (await this.manager.query<User[]>(query)).map((v) => {
        Reflect.deleteProperty(v, 'password');
        return v;
      });
      if (!res.length) {
        throw new HttpException(
          this.i18nGetter('user.exception.noExist'),
          StatusCode.OK,
        );
      }
      return genResponse<User[]>(
        StatusCode.OK,
        res,
        this.i18nGetter('common.success'),
      );
    } catch (error) {
      this.logger.error(error, UserService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async findOne(id: string, hasPassword = false) {
    try {
      const query = `
        SELECT u.*,
               COALESCE(
                 JSON_ARRAYAGG(
                   JSON_OBJECT(
                     'id', p.id, 
                     'name', p.name,
                     'type', p.type,
                     'path', p.path,
                     'method', p.method,
                     'menuId', p.menuId,
                     'createTime', p.createTime,
                     'updateTime', p.updateTime
                   )
                 ),
                 JSON_ARRAY()
               ) AS permissions
        FROM \`user\` u
               LEFT JOIN user_permission_relation upr ON u.id = upr.user_id
               LEFT JOIN permission p ON upr.permission_id = p.id
        WHERE u.id = ?
        GROUP BY u.id;
      `;
      const res = await this.manager.query<User[]>(query, [id]);
      if (!res.length) {
        throw new HttpException(
          this.i18nGetter('user.exception.noExist'),
          StatusCode.OK,
        );
      }
      const user = res[0];
      if (user && !hasPassword) {
        Reflect.deleteProperty(user, 'password');
      }
      return genResponse<User>(
        StatusCode.OK,
        user,
        this.i18nGetter('common.success'),
      );
    } catch (error) {
      this.logger.error(error, UserService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async findUserByEmailOrName(name: string, email: string) {
    try {
      const query = `SELECT * FROM user WHERE username = ? OR email = ?;`;
      const res = await this.manager.query<User[]>(query, [name, email]);
      return {
        success: res.length,
        res,
      };
    } catch (error) {
      this.logger.error(error, UserService.name);
    }
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      const id = updateUserDto.id;
      const userRes = await this.findOne(id, true);
      if (userRes.code === StatusCode.OK && userRes.data) {
        const hashPassword = updateUserDto.password
          ? md5(updateUserDto.password)
          : userRes.data.password;
        const query = `START TRANSACTION; 
                       UPDATE user 
                       SET 
                        \`username\`= ?, 
                        \`password\`= ?, 
                        \`email\`= ?,
                        \`updateTime\`= CURRENT_TIMESTAMP(6)
                       WHERE \`id\` = ?;
                       COMMIT;`;
        await this.manager.query(query, [
          updateUserDto.username || userRes.data.username,
          hashPassword,
          updateUserDto.email || userRes.data.email,
          id,
        ]);
        return genResponse<null>(
          StatusCode.OK,
          null,
          this.i18nGetter('user.update.success'),
        );
      }
    } catch (error) {
      this.logger.error(error, UserService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async remove(id: string) {
    try {
      const query = `
      START TRANSACTION;
      DELETE FROM user WHERE id = ?;
      COMMIT;`;
      await this.manager.query<User[]>(query, [id]);
      return genResponse<null>(
        StatusCode.OK,
        null,
        this.i18nGetter('user.remove.success'),
      );
    } catch (error) {
      this.logger.error(error, UserService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }
  async login(loginUserDto: LoginUserDto) {
    try {
      const has = await this.findUserByEmailOrName(
        loginUserDto.account,
        loginUserDto.account,
      );
      if (has && has.success) {
        const user = has.res[0];
        const hashPassword = md5(loginUserDto.password);
        if (hashPassword !== user.password) {
          throw new HttpException(
            this.i18nGetter('user.login.failed'),
            StatusCode.OK,
          );
        }
        // generate token
        const token: string = this.jwtService.sign({
          user: {
            id: user.id,
            username: user.username,
          },
        });
        // token save to redis
        await this.redisService.setKey(`user:${user.id}`, token, 7200);
        return genResponse<LoginUserResDto>(
          StatusCode.OK,
          {
            token,
            id: user.id,
          },
          this.i18nGetter('user.login.success'),
        );
      } else {
        throw new HttpException(
          this.i18nGetter('user.login.failed'),
          StatusCode.OK,
        );
      }
    } catch (error) {
      this.logger.error(error, UserService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }
  async logout(findRemoveUserDto: FindRemoveUserDto) {
    try {
      const has = await this.findOne(findRemoveUserDto.id);
      if (has && has.code === StatusCode.OK) {
        const key = `user:${findRemoveUserDto.id}`;
        await this.redisService.deleteKey(key);
        return genResponse<null>(
          StatusCode.OK,
          null,
          this.i18nGetter('user.logout.success'),
        );
      } else {
        throw new HttpException(
          this.i18nGetter('user.logout.failed'),
          StatusCode.OK,
        );
      }
    } catch (error) {
      this.logger.error(error, UserService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }
}
