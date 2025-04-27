import { LoggerService } from '@nestjs/common';
import { createLogger, Logger } from 'winston';
import * as dayjs from 'dayjs';
export class ChaPandaLogger implements LoggerService {
  private logger: Logger;

  constructor(options) {
    this.logger = createLogger(options);
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.info(message, { context: context, time });
  }

  error(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('info', message, { context: context, time });
  }

  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('info', message, { context: context, time });
  }
}
