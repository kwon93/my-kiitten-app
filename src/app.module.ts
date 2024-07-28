import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MemberModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
