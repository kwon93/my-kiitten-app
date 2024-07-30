import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MemberRepository {
  constructor(readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.member.findUnique({
      where: {
        email,
      },
    });
  }

  async persistMember({ email, name, password }) {
    return this.prisma.member.create({
      data: {
        email: email,
        name: name,
        password: password,
      },
    });
  }
}
