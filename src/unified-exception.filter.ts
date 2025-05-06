import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { StatusCode, genResponse } from './utils';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';

@Catch()
export class UnifiedExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = StatusCode.UnknownError;
    let message: string = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      }
    }

    if (exception instanceof I18nValidationException) {
      const i18n = I18nContext.current();
      statusCode = exception.getStatus();
      if (exception.errors && i18n) {
        const resolveMsg: string[] = [];
        exception.errors.forEach((error) => {
          const { constraints } = error;
          if (constraints) {
            Object.keys(constraints).forEach((constraintsKey) => {
              const key = constraints[constraintsKey];
              const msg = i18n.t<string, string>(
                // 文案的 key
                key,
                {
                  // 当前语言
                  lang: I18nContext.current()!.lang,
                },
              );
              resolveMsg.push(msg);
            });
          }
        });
        message = resolveMsg.join(',');
      }
    }

    // 构造统一响应
    const unifiedResponse = genResponse(
      statusCode,
      null, // data 字段设为 null
      message,
    );
    response.status(200).json(unifiedResponse);
  }
}
