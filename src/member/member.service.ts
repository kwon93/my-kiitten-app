import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMemberRequest } from './dto/presentation/create-member.request';
import { UpdateMemberDto } from './dto/presentation/update-member.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MemberAlreadyExistsException } from '../exception/member/member-already-exists.exception';
import { CreateMemberParams } from './dto/business/create-member-params';
import { CreatedMemberResponse } from './dto/business/created-member.response';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberParams): Promise<CreatedMemberResponse> {
    const { email, password, name } = createMemberDto;
    const alreadyExitUser = await this.prisma.member.findUnique({
      where: { email },
    });
    if (alreadyExitUser) {
      throw new MemberAlreadyExistsException();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdMember = await this.prisma.member.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    return CreatedMemberResponse.from(createdMember);
  }

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
