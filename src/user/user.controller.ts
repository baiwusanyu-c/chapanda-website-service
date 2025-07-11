import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
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
import { ApiResponseDto, genResContent, StatusCode } from '../utils';
import { FindRemoveUserDto } from './dto/find-remove-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserResDto } from './dto/login-user-res.dto';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { Permission } from '../permission/entities/permission.entity';

@ApiExtraModels(ApiResponseDto, FindUserDto, LoginUserResDto, Permission)
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
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 创建用户
  @ApiOperation({
    summary: '[公开]创建用户',
    description: '创建用户接口',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '创建用户成功',
    content: genResContent(null),
  })
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiExtraModels(ApiResponseDto, FindUserDto)
  @ApiOperation({
    summary: '查询所有用户',
    description: '查询所有用户接口',
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '查询成功',
    content: genResContent(FindUserDto, 'array'),
  })
  @ApiHeader({
    name: 'token', // 请求头名称
    description: '身份认证标记', // 描述
    required: true, // 标记为可选
    schema: {
      type: 'string',
    },
  })
  @HttpCode(StatusCode.OK)
  @UseGuards(JwtAuthGuard)
  @Post('getAllUsers')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: '查询用户',
    description: '根据id查询用户接口',
  })
  @ApiBody({
    type: FindRemoveUserDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '查询成功',
    content: genResContent(FindUserDto),
  })
  @ApiHeader({
    name: 'token', // 请求头名称
    description: '身份认证标记', // 描述
    required: true, // 标记为可选
    schema: {
      type: 'string',
    },
  })
  @HttpCode(StatusCode.OK)
  @UseGuards(JwtAuthGuard)
  @Post('getUser')
  findOne(@Body() findRemoveUserDto: FindRemoveUserDto) {
    return this.userService.findOne(findRemoveUserDto.id);
  }

  @ApiOperation({
    summary: '更新用户',
    description: '更新用户接口',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '更新成功',
    content: genResContent(null),
  })
  @ApiHeader({
    name: 'token', // 请求头名称
    description: '身份认证标记', // 描述
    required: true, // 标记为可选
    schema: {
      type: 'string',
    },
  })
  @HttpCode(StatusCode.OK)
  @UseGuards(JwtAuthGuard)
  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @ApiOperation({
    summary: '删除用户',
    description: '根据id删除用户接口',
  })
  @ApiBody({
    type: FindRemoveUserDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '删除成功',
    content: genResContent(null),
  })
  @ApiHeader({
    name: 'token', // 请求头名称
    description: '身份认证标记', // 描述
    required: true, // 标记为可选
    schema: {
      type: 'string',
    },
  })
  @HttpCode(StatusCode.OK)
  @UseGuards(JwtAuthGuard)
  @Post('remove')
  remove(@Body() findRemoveUserDto: FindRemoveUserDto) {
    return this.userService.remove(findRemoveUserDto.id);
  }

  @ApiOperation({
    summary: '[公开]用户登录',
    description: '用户登录接口',
  })
  @ApiBody({
    type: LoginUserDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '登录成功',
    content: genResContent(LoginUserResDto),
  })
  @HttpCode(StatusCode.OK)
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @ApiOperation({
    summary: '[公开]用户登出',
    description: '用户登出接口',
  })
  @ApiBody({
    type: FindRemoveUserDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '登出成功',
    content: genResContent(null),
  })
  @ApiHeader({
    name: 'token', // 请求头名称
    description: '身份认证标记', // 描述
    required: true, // 标记为可选
    schema: {
      type: 'string',
    },
  })
  @HttpCode(StatusCode.OK)
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Body() findRemoveUserDto: FindRemoveUserDto) {
    return this.userService.logout(findRemoveUserDto);
  }
}
