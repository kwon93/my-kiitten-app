import { Test } from '@nestjs/testing';
import { CreateMemberDto } from './dto/create-member.dto';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

describe('membersController test', () => {
  let app: INestApplication;
  let memberService: MemberService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MemberController],
      providers: [
        {
          provide: MemberService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();

    memberService = moduleRef.get(MemberService);
  });

  afterAll(async () => {
    await app.close();
  });

  const testEmail: string = 'foo1@test.com';
  const testPassword: string = 'password12';
  const testName: string = 'foo';

  test('create(): 회원 가입 요청에 httpStatus 201을 응답해야한다.', () => {
    //given
    const createMemberDto: CreateMemberDto = {
      email: testEmail,
      password: testPassword,
      name: testName,
    };

    //when then
    return request(app.getHttpServer()).post('/member/signup').send(createMemberDto).expect(201);
  });
});
