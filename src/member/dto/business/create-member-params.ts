import { CreateMemberRequest } from '../presentation/create-member.request';

export class CreateMemberParams {
  email: string;
  password: string;
  name: string;

  static from(request: CreateMemberRequest): CreateMemberParams {
    const serviceDTO = new CreateMemberParams();
    serviceDTO.email = request.email;
    serviceDTO.name = request.name;
    serviceDTO.password = request.password;
    return serviceDTO;
  }
}
