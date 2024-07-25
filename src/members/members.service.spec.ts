import { Test } from '@nestjs/testing';
import { MembersService } from './members.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateMemberDto } from './dto/create-member.dto';
import { ConfigModule } from '@nestjs/config';

jest.mock('bcrypt');
describe('MembersService Integration', () => {
  let membersService: MembersService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        { provide: MembersService, useClass: MembersService },
        {
          provide: PrismaService,
          useClass: PrismaService,
        },
      ],
    }).compile();

    membersService = module.get<MembersService>(MembersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await prismaService.$disconnect();
  });

  afterEach(async () => {
    await prismaService.member.deleteMany();
  });

  test('회원가입에 성공해 데이터베이스에 신규 회원이 저장되어야한다.', async () => {
    const testEmail: string = 'foo1@test.com';
    const testPassword: string = 'password12';
    const testName: string = 'foo';

    const createMemberDto: CreateMemberDto = {
      email: testEmail,
      password: testPassword,
      name: testName,
    };
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
    const newMember = await membersService.create(createMemberDto);

    expect(newMember).toBeDefined();
    expect(newMember.email).toEqual(testEmail);
    expect(newMember.name).toEqual(testName);
  });
});
