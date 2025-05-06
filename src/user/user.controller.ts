import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiExtraModels,
} from '@nestjs/swagger';
import { ApiResponseDto, genResContent } from '../utils';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 创建用户
  @ApiOperation({
    summary: '创建用户',
    description: '创建用户接口',
  })
  @ApiExtraModels(ApiResponseDto)
  @ApiResponse({
    status: 200,
    description: '创建用户成功',
    content: genResContent(),
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('getAllUsers')
  findAll() {
    return this.userService.findAll();
  }

  @Post('getUser')
  findOne(@Body() id: string) {
    return this.userService.findOne(+id);
  }

  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return 'this.userService.update( updateUserDto);';
  }

  @Post('remove')
  remove(@Body() id: string) {
    return this.userService.remove(+id);
  }
}
