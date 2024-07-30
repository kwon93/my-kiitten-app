import { Injectable } from '@nestjs/common';
import { UpdateMemberDto } from './dto/presentation/update-member.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { MemberAlreadyExistsException } from '../exception/member/member-already-exists.exception';
import { CreateMemberParams } from './dto/business/create-member-params';
import { CreatedMemberResponse } from './dto/business/created-member.response';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
  constructor(
    readonly prisma: PrismaService,
    readonly memberRepository: MemberRepository,
  ) {}

  async create(createMemberDto: CreateMemberParams): Promise<CreatedMemberResponse> {
    const { email, password, name } = createMemberDto;
    await this.duplicateMemberValidation(email);

    const hashedPassword: string = await this.encryptUserPassword(password);
    const createdMember = await this.storeMemberInfo(email, name, hashedPassword);

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

  private async storeMemberInfo(email: string, name: string, hashedPassword: string) {
    return this.memberRepository.persistMember({
      email: email,
      name: name,
      password: hashedPassword,
    });
  }

  private async encryptUserPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  private async duplicateMemberValidation(email: string) {
    const alreadyExitUser = await this.memberRepository.findByEmail(email);
    if (alreadyExitUser) throw new MemberAlreadyExistsException();
  }
}
