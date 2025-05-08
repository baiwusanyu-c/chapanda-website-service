import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { ChapandaLoggerModule } from './logger/logger.module';
import { format, transports } from 'winston';
import * as colors from 'ansi-colors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLogInterceptor } from './request-log.interceptor';
import 'winston-daily-rotate-file';
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Menu } from './menu/entities/menu.entity';
import { Permission } from './user/entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './menu/menu.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './redis/redis.module';

const ENV_PATH = path.join(process.cwd(), `./env/.env.${process.env.APP_ENV}`);

@Module({
  imports: [
    // 配置环境变量
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ENV_PATH],
    }),
    // 配置 winston 访问日志
    ChapandaLoggerModule.forRoot({
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf(({ context, level, message, time }) => {
              const appStr = colors.greenBright(`[NEST]`);
              const contextStr = colors.yellowBright(`[${context as string}]`);
              return `${appStr} ${time as string} ${level} ${contextStr} ${message as string} `;
            }),
          ),
        }),
        new transports.DailyRotateFile({
          format: format.combine(format.timestamp(), format.json()),
          filename: 'request.%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH-mm',
          dirname: 'log',
          maxSize: '1k',
          maxFiles: '30d', // 30d后自动删除日志
          auditFile: 'log/.audit.json',
        }),
      ],
      exceptionHandlers: [
        new transports.DailyRotateFile({
          format: format.combine(format.timestamp(), format.json()),
          filename: 'error.%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH-mm',
          dirname: 'log',
          maxSize: '1k',
          maxFiles: '30d', // 30d后自动删除日志
          auditFile: 'log/.audit.error.json',
        }),
      ],
      rejectionHandlers: [
        new transports.DailyRotateFile({
          format: format.combine(format.timestamp(), format.json()),
          filename: 'error.rejection.%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH-mm',
          dirname: 'log',
          maxSize: '1k',
          maxFiles: '30d', // 30d后自动删除日志
          auditFile: 'log/.audit.error.rejection.json',
        }),
      ],
    }),
    // i18n 配置
    I18nModule.forRoot({
      // 兜底语言
      fallbackLanguage: 'zh',
      // 加载语言配置
      loaderOptions: {
        path: path.join(process.cwd(), '/i18n/'),
        watch: true,
      },
      // 配置识别方案
      resolvers: [
        // 识别url参数上的语言， 3000/?l=zh
        new QueryResolver(['lang', 'l']),
        // 识别请求头的 x-custom-lang 字段
        new HeaderResolver(['x-custom-lang']),
        // 识别 cookie 的 lang 字段
        new CookieResolver(['lang']),
        AcceptLanguageResolver,
      ],
    }),
    // 数据库连接配置
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'chapanda-website-database',
      synchronize: true, // 同步建表，没Entity 对应表的时候插入数据会自动创建表, 生产环境禁止打开
      logging: true, // 是打印生成的 sql 语句。
      entities: [User, Permission, Menu], // entities 是指定有哪些和数据库的表对应的 Entity。['**/entity/*.ts']
      migrations: [], // 是修改表结构之类的 sql,
      subscribers: [], // 是一些 Entity 生命周期的订阅者，比如 insert、update、remove 前后，可以加入一些逻辑：
      // beforInsert, updateInsert ...
      connectorPackage: 'mysql2', // 指定用什么驱动包。
      poolSize: 10, // 连接池最大数量
      extra: {
        // 额外发送给驱动包的一些选项
        authPlugin: 'sha256_password',
        multipleStatements: true,
      },
    }),
    JwtModule.register({
      global: true,
      secret: 'chapanda',
    }),
    UserModule,
    MenuModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 启用请求日志记录拦截器，里面使用 ChapandaLoggerModule 打印日志
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLogInterceptor,
    },
  ],
})
export class AppModule {}
