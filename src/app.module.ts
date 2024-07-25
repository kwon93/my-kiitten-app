import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [MembersModule, PrismaModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
