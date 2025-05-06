import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  i18nGetter(key: string) {
    return this.i18n.t<string, string>(
      // 文案的 key
      key,
      {
        // 当前语言
        lang: I18nContext.current()!.lang,
      },
    );
  }

  async create(createUserDto: CreateUserDto) {
    const has = await this.findUserByEmail(createUserDto.email);
    if (has && has.success) {
      throw new HttpException(this.i18nGetter('user.exception.exist'), 200);
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
      return genResponse<string>(
        StatusCode.OK,
        this.i18nGetter('user.create.success'),
      );
    } catch (error) {
      this.logger.error(error, UserService.name);
      return genResponse<string>(
        StatusCode.UnknownError,
        (error as ErrorEvent).message,
      );
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {}
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
  // TODO
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
