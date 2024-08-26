import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, expireSeconds?: number): Promise<void> {
    if (expireSeconds) {
      await this.redis.set(key, value, 'EX', expireSeconds);
    } else {
      await this.redis.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    this.redis.del(key);
  }
}
