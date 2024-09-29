import { RedisModule, RedisService } from '@liaoliaots/nestjs-redis';
import { Test, TestingModule } from '@nestjs/testing';

describe('Redis Connection Test', () => {
  let redisService: RedisService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        RedisModule.forRoot({
          config: {
            host: process.env.REDIS_HOST || '127.0.0.1',
          },
        }),
      ],
    }).compile();
    redisService = module.get<RedisService>(RedisService);
  });

  test('Redis 연결에 성공해야 한다.', async () => {
    const client = redisService.getOrNil();
    const testKey: string = 'test_key';
    const testValue: string = 'Hello Redis';

    await client.set(testKey, testValue);
    const getRedisValue = await client.get(testKey);

    expect(getRedisValue).toBe(testValue);
  });
});
