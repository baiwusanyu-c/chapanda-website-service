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

const ENV_PATH = path.join(process.cwd(), `./env/.env.${process.env.APP_ENV}`);
console.log(ENV_PATH);

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
