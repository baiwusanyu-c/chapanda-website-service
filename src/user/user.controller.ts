import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiExtraModels,
  ApiHeader,
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
  @ApiHeader({
    name: 'x-custom-lang', // 请求头名称
    description: '语言标识 (可选)', // 描述
    required: false, // 标记为可选
    example: 'zh', // 示例值
    schema: {
      type: 'string',
      enum: ['zh', 'en'], // 可选枚举值
    },
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiExtraModels(ApiResponseDto)
  @ApiResponse({
    status: 200,
    description: '创建用户成功',
    content: genResContent(null),
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
