export class CreatedMemberResponse {
  id: number;
  email: string;
  name: string;
  createdAt: Date;

  static from(responseMember: {
    id: number;
    email: string;
    name: string;
    createdAt: Date;
  }): CreatedMemberResponse {
    const response = new CreatedMemberResponse();
    response.id = responseMember.id;
    response.email = responseMember.email;
    response.name = responseMember.name;
    response.createdAt = responseMember.createdAt;
    return response;
  }
}
