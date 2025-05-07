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

@Injectable()
export class UserService {
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

  async create(createUserDto: CreateUserDto) {
    const has = await this.findUserByEmail(createUserDto.email);
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

  async findOne(id: string) {
    try {
      const query = `SELECT * FROM user WHERE id = ?;`;
      const res = await this.manager.query<User[]>(query, [id]);
      if (!res.length) {
        throw new HttpException(
          this.i18nGetter('user.exception.noExist'),
          StatusCode.OK,
        );
      }
      const user = res[0];
      if (user) {
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

  async findUserByEmail(email: string) {
    try {
      const query = `SELECT * FROM user WHERE email = ?;`;
      const res = await this.manager.query<User[]>(query, [email]);
      return {
        success: res.length,
        res,
      };
    } catch (error) {
      this.logger.error(error, UserService.name);
    }
  }

  // TODO
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    try {
      const query = `DELETE FROM user WHERE id = ?;`;
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
}
