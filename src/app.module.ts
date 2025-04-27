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
