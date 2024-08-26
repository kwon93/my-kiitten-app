import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [MemberModule, PrismaModule, RedisModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
