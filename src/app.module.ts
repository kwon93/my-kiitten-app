import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MemberModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): RedisModuleOptions => ({
        config: {
          host: configService.get<string>('REDIS_HOST'),
        },
      }),
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
