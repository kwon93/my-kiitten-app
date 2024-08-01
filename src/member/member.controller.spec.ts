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
            signupProcess: jest.fn(),
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
    return await request(app.getHttpServer())
      .post('/member/signup')
      .send(createMemberDto)
      .expect(201);
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

  test('createMemberRequest: 이메일 입력이 없을 경우 BadRequestException 이 발생한다.', async () => {
    //given
    const createMemberDto: CreateMemberRequest = {
      email: '',
      password: testPassword,
      passwordConfirm: testPassword,
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

  test('createMemberRequest: 비밀번호는 8~12길이 사이고 숫자 및 특수문자를 포함해야한다.', async () => {
    //given
    const createMemberDto: CreateMemberRequest = {
      email: testEmail,
      password: 'password',
      passwordConfirm: 'password',
      name: testName,
    };

    //expected
    return request(app.getHttpServer())
      .post('/member/signup')
      .send(createMemberDto)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain(
          '비밀번호는 8~12자 사이여야 하고, 영문자, 숫자, 특수문자를 모두 포함해야 한다냥!',
        );
      });
  });

  test('createMemberRequest: 비밀번호 확인란을 입력해야한다.', async () => {
    //given
    const createMemberDto: CreateMemberRequest = {
      email: testEmail,
      password: 'password',
      passwordConfirm: '',
      name: testName,
    };

    //expected
    return request(app.getHttpServer())
      .post('/member/signup')
      .send(createMemberDto)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('확인용 비밀번호를 입력하라냥!');
      });
  });

  test('createMemberRequest: password Confirm 은 password 와 일치해야한다.', async () => {
    //given
    const createMemberDto: CreateMemberRequest = {
      email: testEmail,
      password: testPassword,
      passwordConfirm: 'invalidPasswordConfirm',
      name: testName,
    };

    //expected
    return request(app.getHttpServer())
      .post('/member/signup')
      .send(createMemberDto)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('비밀번호가 일치하지 않는다냥!');
      });
  });

  test('createMemberRequest: 이름은 10글자를 넘길 수 없다.', async () => {
    //given
    const createMemberDto: CreateMemberRequest = {
      email: testEmail,
      password: testPassword,
      passwordConfirm: testPassword,
      name: '열글자를넘는이름을가진미친사용자',
    };

    //expected
    return request(app.getHttpServer())
      .post('/member/signup')
      .send(createMemberDto)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('이름은 10글자를 넘길 수 없다냥!');
      });
  });
});
