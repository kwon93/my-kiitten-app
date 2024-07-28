import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MemberAlreadyExistsException } from '../exception/member/member-already-exists.exception';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async create(createMemberDto: CreateMemberDto): Promise<string> {
    const { email, password, name } = createMemberDto;
    const alreadyExitUser = await this.prisma.member.findUnique({
      where: { email },
    });
    if (alreadyExitUser) {
      throw new MemberAlreadyExistsException();
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newMember = await this.prisma.member.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });

    const { ...result } = newMember;
    return result.email;
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
