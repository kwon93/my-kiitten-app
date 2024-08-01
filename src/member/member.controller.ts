import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberRequest } from './dto/presentation/create-member.request';
import { UpdateMemberDto } from './dto/presentation/update-member.dto';
import { CreateMemberParams } from './dto/business/create-member-params';

@Controller('member')
export class MemberController {
  constructor(private readonly membersService: MemberService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() request: CreateMemberRequest) {
    return await this.membersService.signupProcess(CreateMemberParams.from(request));
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.update(+id, updateMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.membersService.remove(+id);
  }
}
