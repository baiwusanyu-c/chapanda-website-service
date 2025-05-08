import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService, REDIS_TOKEN } from './redis.service';

@Global() // 全局模块，其他模块无需显式导入
@Module({
  providers: [
    {
      provide: REDIS_TOKEN,
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
    RedisService,
  ],
  exports: [REDIS_TOKEN, RedisService], // 导出 Redis 客户端
})
export class RedisModule {}
