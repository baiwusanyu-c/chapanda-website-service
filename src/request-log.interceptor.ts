import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { tap } from 'rxjs';
import * as requestIp from 'request-ip';
// import { HttpService } from '@nestjs/axios';
// import * as iconv from 'iconv-lite';
import { WINSTON_LOGGER_TOKEN } from './logger/logger.module';
import { ChaPandaLogger } from './logger/logger.service';

@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: ChaPandaLogger;

  // @Inject(HttpService)
  // private httpService: HttpService;

  // async ipToCity(ip: string) {
  //   const response = await this.httpService.axiosRef(
  //     `https://whois.pconline.com.cn/ipJson.jsp?ip=${ip}&json=true`,
  //     {
  //       responseType: 'arraybuffer',
  //       transformResponse: [
  //         function (data) {
  //           const str = iconv.decode(data, 'gbk');
  //           return JSON.parse(str);
  //         },
  //       ],
  //     },
  //   );
  //   return response.data.addr;
  // }

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const userAgent = request.headers['user-agent'];

    const { ip, method, path } = request;

    const clientIp = requestIp.getClientIp(request) || ip;

    this.logger.log(
      `${method} ${path} ${clientIp} ${userAgent}: ${context.getClass().name} ${
        context.getHandler().name
      } invoked...`,
      RequestLogInterceptor.name,
    );

    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        this.logger.log(
          `${method} ${path} ${clientIp} ${userAgent}: ${response.statusCode}: ${Date.now() - now}ms`,
          RequestLogInterceptor.name,
        );
        this.logger.log(
          `Response: ${JSON.stringify(res)}`,
          RequestLogInterceptor.name,
        );
      }),
    );
  }
}
