import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { IsConfirmed } from '../../common/decorators/isConfirm.decorator';

export class CreateMemberDto {
  @IsEmail({}, { message: '올바른 이메일 형식이 아니다냥!' })
  @IsNotEmpty({ message: '사용될 이메일을 입력하라냥!' })
  @MaxLength(320, { message: '이메일이 원래 이렇기 기냥...??' })
  email: string;

  @IsString()
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/, {
    message: '비밀번호는 8~12자 사이여야 하고, 영문자, 숫자, 특수문자를 모두 포함해야 한다냥!',
  })
  password: string;

  @IsNotEmpty({ message: '확인용 비밀번호를 입력하라냥!' })
  @IsConfirmed('password', { message: '비밀번호가 일치하지 않는다냥!' })
  passwordConfirm?: string;

  @MaxLength(10, { message: '이름은 10글자를 넘길 수 없다냥!' })
  @IsString({ message: '이름을 문자로 입력해주라냥 ' })
  @IsNotEmpty({ message: '이름을 입력하라냥~' })
  name: string;
}
