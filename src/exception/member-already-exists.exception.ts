export class MemberAlreadyExistsException extends Error {
  static readonly MESSAGE: string = '이미 존재하는 회원이다냥';

  constructor() {
    super(MemberAlreadyExistsException.MESSAGE);
  }
}
