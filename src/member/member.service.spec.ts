import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateMemberDto } from './dto/create-member.dto';
import { ConfigModule } from '@nestjs/config';
import { ConflictException } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberAlreadyExistsException } from '../exception/member/member-already-exists.exception';

describe('MembersService Integration', () => {
  let memberService: MemberService;
  let prismaService: PrismaService;
  const testEmail: string = 'foo1@test.com';
  const testPassword: string = 'password12';
  const testName: string = 'foo';

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        { provide: MemberService, useClass: MemberService },
        {
          provide: PrismaService,
          useClass: PrismaService,
        },
      ],
    }).compile();

    memberService = module.get<MemberService>(MemberService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  beforeEach(async () => {
    await prismaService.member.deleteMany();
  });

  test('create(): 회원가입에 성공해 데이터베이스에 신규 회원이 저장되어야한다.', async () => {
    //given
    const createMemberDto: CreateMemberDto = {
      email: testEmail,
      password: testPassword,
      name: testName,
    };
    //when
    const createdMemberEmail = await memberService.create(createMemberDto);

    //then
    const createdMember = await prismaService.member.findUnique({
      where: { email: createdMemberEmail },
    });

    expect(createdMember).toBeDefined();
    expect(createdMember.email).toEqual(testEmail);
    expect(createdMember.name).toEqual(testName);
  });

  test('create(): 이미 존재하는 회원일 경우 예외가 발생되어야한다.', async () => {
    //given
    const firstUserDto: CreateMemberDto = {
      email: testEmail,
      password: testPassword,
      name: testName,
    };
    await memberService.create(firstUserDto);

    const duplicateUserDto: CreateMemberDto = {
      email: testEmail,
      password: testPassword,
      name: testName,
    };

    //when //then
    await expect(memberService.create(duplicateUserDto)).rejects.toThrow(
      MemberAlreadyExistsException,
    );
  });

  test('create(): 비밀번호는 암호화 되어야한다.', async () => {
    //given
    const createMemberDto: CreateMemberDto = {
      email: testEmail,
      password: testPassword,
      name: testName,
    };

    //when
    const createdMemberEmail = await memberService.create(createMemberDto);

    //then
    const createdMember = await prismaService.member.findUnique({
      where: { email: createdMemberEmail },
    });

    expect(createdMember.password).not.toBe(createMemberDto.password);
    const isPasswordValid = await bcrypt.compare(createMemberDto.password, createdMember.password);
    expect(isPasswordValid).toBe(true);
  });
});
