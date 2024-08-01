export class MemberPersistDto {
  private _email: string;
  private _name: string;
  private _password: string;

  static of(email: string, name: string, password: string): MemberPersistDto {
    const memberPersistDto: MemberPersistDto = new MemberPersistDto();
    memberPersistDto._email = email;
    memberPersistDto._name = name;
    memberPersistDto._password = password;
    return memberPersistDto;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  get password(): string {
    return this._password;
  }
}
