import { HttpException, HttpStatus } from '@nestjs/common';

export class MemberAlreadyExistsException extends HttpException {
  constructor() {
    super('이미 존재하는 집사다냥', HttpStatus.BAD_REQUEST);
  }
}
