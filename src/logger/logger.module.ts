import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggerOptions } from 'winston';
import { ChaPandaLogger } from './logger.service';

export const WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER';

@Global()
@Module({})
export class ChapandaLoggerModule {
  public static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: ChapandaLoggerModule,
      providers: [
        {
          provide: WINSTON_LOGGER_TOKEN,
          useValue: new ChaPandaLogger(options),
        },
      ],
      exports: [WINSTON_LOGGER_TOKEN],
    };
  }
}
