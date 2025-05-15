import { DynamicModule, Global, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService, REDIS_TOKEN } from './redis.service';

export interface RedisModuleOptions {
  socket: {
    host: string;
    port: number;
  };
}

@Global() // 全局模块，其他模块无需显式导入
@Module({})
export class RedisModule {
  static register(options: RedisModuleOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [
        {
          provide: REDIS_TOKEN,
          async useFactory() {
            const client = createClient(options);
            await client.connect();
            return client;
          },
        },
        RedisService,
      ],
      exports: [REDIS_TOKEN, RedisService],
    };
  }
}
