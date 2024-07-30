import { Injectable } from '@nestjs/common';
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
    this.duplicateMemberValidation(alreadyExitUser);
    const hashedPassword: string = await this.encryptUserPassword(password);
    //TODO repository를 나눠서 Prisma 의존성 덜기..
    const createdMember = await this.persistMemberInfo(email, name, hashedPassword);
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

  private async persistMemberInfo(email: string, name: string, hashedPassword: string) {
    return this.prisma.member.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
      },
    });
  }

  private async encryptUserPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private duplicateMemberValidation(alreadyExitUser: object) {
    if (alreadyExitUser) {
      throw new MemberAlreadyExistsException();
    }
  }
}
