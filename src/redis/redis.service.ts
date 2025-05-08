import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

export const REDIS_TOKEN = 'REDIS_TOKEN';
@Injectable()
export class RedisService {
  @Inject(REDIS_TOKEN)
  private redisClient: RedisClientType;
  async getKey(key: string) {
    return await this.redisClient.get(key);
  }

  async setKey(key: string, value: string | number, ttl?: number) {
    await this.redisClient.set(key, value);
    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async isExpiredKey(key: string) {
    return await this.redisClient.expireTime(key);
  }

  async deleteKey(key: string) {
    await this.redisClient.del(key);
  }
}
