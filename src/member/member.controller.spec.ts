import { Test } from '@nestjs/testing';
import { CreateMemberRequest } from './dto/presentation/create-member.request';
import { INestApplication, ValidationPipe } from '@nestjs/common';
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
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    memberService = moduleRef.get(MemberService);
  });

  afterAll(async () => {
    await app.close();
  });

  const testEmail: string = 'foo1234@test.com';
  const testPassword: string = 'password12!@';
  const testName: string = 'foobar';

  test('create(): 회원 가입 요청에 httpStatus 201을 응답해야한다.', async () => {
    //given
    const createMemberDto: CreateMemberRequest = {
      email: testEmail,
      password: testPassword,
      passwordConfirm: testPassword,
      name: testName,
    };

    //expected
    const response = await request(app.getHttpServer())
      .post('/member/signup')
      .send(createMemberDto)
      .expect(201);

    console.log('>>>', response.status);
    console.log(response.body);

    return response;
  });

  test('createMemberRequest: 올바른 이메일 형식이 아닐경우 BadRequestException 이 발생한다.', async () => {
    //given
    const createMemberDto: CreateMemberRequest = {
      email: 'invalidEmail',
      password: testPassword,
      name: testName,
    };

    //expected
    return request(app.getHttpServer())
      .post('/member/signup')
      .send(createMemberDto)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('올바른 이메일 형식이 아니다냥!');
      });
  });
});
