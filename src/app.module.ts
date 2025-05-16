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
import { Permission } from './permission/entities/permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from './menu/menu.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from './redis/redis.module';
import { PermissionModule } from './permission/permission.module';
import { ShopModule } from './shop/shop.module';
import { Shop } from './shop/entities/shop.entity';
import { NewsModule } from './news/news.module';
import { News } from './news/entities/news.entity';
import { OperationCenterModule } from './operation-center/operation-center.module';
import { OperationCenter } from './operation-center/entities/operation-center.entity';
import { FranchiseModule } from './franchise/franchise.module';
import { Franchise } from './franchise/entities/franchise.entity';
import { UploadModule } from './upload/upload.module';
import { MinioModule } from './minio/minio.module';
import { Upload } from './upload/entities/upload.entity';
import configuration, { ENV_CONFIG } from '../env/config.env.development';

@Module({
  imports: [
    // 配置环境变量
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
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
          filename: ENV_CONFIG.LOG_CONFIG.request.filename,
          datePattern: 'YYYY-MM-DD-HH-mm',
          dirname: ENV_CONFIG.LOG_CONFIG.request.dirname,
          maxSize: ENV_CONFIG.LOG_CONFIG.request.max_size,
          maxFiles: ENV_CONFIG.LOG_CONFIG.request.max_files,
          auditFile: ENV_CONFIG.LOG_CONFIG.request.audit_file,
        }),
      ],
      exceptionHandlers: [
        new transports.DailyRotateFile({
          format: format.combine(format.timestamp(), format.json()),
          filename: ENV_CONFIG.LOG_CONFIG.exception.filename,
          datePattern: 'YYYY-MM-DD-HH-mm',
          dirname: ENV_CONFIG.LOG_CONFIG.exception.dirname,
          maxSize: ENV_CONFIG.LOG_CONFIG.exception.max_size,
          maxFiles: ENV_CONFIG.LOG_CONFIG.exception.max_files,
          auditFile: ENV_CONFIG.LOG_CONFIG.exception.audit_file,
        }),
      ],
      rejectionHandlers: [
        new transports.DailyRotateFile({
          format: format.combine(format.timestamp(), format.json()),
          filename: ENV_CONFIG.LOG_CONFIG.rejection.filename,
          datePattern: 'YYYY-MM-DD-HH-mm',
          dirname: ENV_CONFIG.LOG_CONFIG.rejection.dirname,
          maxSize: ENV_CONFIG.LOG_CONFIG.rejection.max_size,
          maxFiles: ENV_CONFIG.LOG_CONFIG.rejection.max_files,
          auditFile: ENV_CONFIG.LOG_CONFIG.rejection.audit_file,
        }),
      ],
    }),
    // i18n 配置
    I18nModule.forRoot({
      // 兜底语言
      fallbackLanguage: ENV_CONFIG.I18N_CONFIG.i18n_fallback,
      // 加载语言配置
      loaderOptions: {
        path: path.join(process.cwd(), ENV_CONFIG.I18N_CONFIG.i18n_path),
        watch: true,
      },
      // 配置识别方案
      resolvers: [
        // 识别url参数上的语言， 3000/?l=zh
        new QueryResolver(ENV_CONFIG.I18N_CONFIG.i18n_query_resolver),
        // 识别请求头的 x-custom-lang 字段
        new HeaderResolver(ENV_CONFIG.I18N_CONFIG.i18n_header_resolver),
        // 识别 cookie 的 lang 字段
        new CookieResolver(ENV_CONFIG.I18N_CONFIG.i18n_cookie_resolver),
        AcceptLanguageResolver,
      ],
    }),
    // 数据库连接配置
    TypeOrmModule.forRoot({
      host: ENV_CONFIG.MYSQL_CONFIG.mysql_server_host,
      port: ENV_CONFIG.MYSQL_CONFIG.mysql_server_port,
      username: ENV_CONFIG.MYSQL_CONFIG.mysql_server_username,
      password: ENV_CONFIG.MYSQL_CONFIG.mysql_server_password,
      database: ENV_CONFIG.MYSQL_CONFIG.mysql_server_database,
      synchronize: ENV_CONFIG.MYSQL_CONFIG.mysql_server_synchronize,
      type: 'mysql', // 同步建表，没Entity 对应表的时候插入数据会自动创建表, 生产环境禁止打开
      logging: true, // 是打印生成的 sql 语句。
      entities: [
        User,
        Permission,
        Menu,
        Shop,
        News,
        OperationCenter,
        Franchise,
        Upload,
      ], // entities 是指定有哪些和数据库的表对应的 Entity。['**/entity/*.ts']
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
      secret: ENV_CONFIG.JWT_CONFIG.jwt_secret,
    }),
    MinioModule.register({
      endPoint: ENV_CONFIG.MINIO_CONFIG.minio_server_host,
      port: ENV_CONFIG.MINIO_CONFIG.minio_server_port,
      useSSL: ENV_CONFIG.MINIO_CONFIG.minio_server_ssl,
      accessKey: ENV_CONFIG.MINIO_CONFIG.minio_server_access,
      secretKey: ENV_CONFIG.MINIO_CONFIG.minio_server_secret,
    }),
    RedisModule.register({
      socket: {
        host: ENV_CONFIG.REDIS_CONFIG.redis_server_host,
        port: ENV_CONFIG.REDIS_CONFIG.redis_server_port,
      },
    }),
    UserModule,
    MenuModule,
    PermissionModule,
    ShopModule,
    NewsModule,
    OperationCenterModule,
    FranchiseModule,
    UploadModule,
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
