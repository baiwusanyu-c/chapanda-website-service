import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import {
  ApiBody,
  ApiHeaders,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { genResContent, StatusCode } from '../utils';
import { SetUserPermissionDto } from './dto/set-user-permission.dto';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

@ApiHeaders([
  {
    name: 'x-custom-lang', // 请求头名称
    description: '语言标识 (可选)', // 描述
    required: false, // 标记为可选
    example: 'zh', // 示例值
    schema: {
      type: 'string',
      enum: ['zh', 'en'], // 可选枚举值
    },
  },
  {
    name: 'token', // 请求头名称
    description: '身份认证标记', // 描述
    required: true, // 标记为可选
    schema: {
      type: 'string',
    },
  },
])
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({
    summary: '创建权限',
    description: '创建权限接口',
  })
  @ApiBody({
    type: CreatePermissionDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '创建权限成功',
    content: genResContent(null),
  })
  @HttpCode(StatusCode.OK)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @ApiOperation({
    summary: '分配权限',
    description: '根据用户 id 与权限 id 为用户分配权限',
  })
  @ApiBody({
    type: SetUserPermissionDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '分配权限成功',
    content: genResContent(null),
  })
  @HttpCode(StatusCode.OK)
  @UseGuards(JwtAuthGuard)
  @Post('setPermissionToUser')
  setPermission(@Body() params: SetUserPermissionDto) {
    return this.permissionService.setPermission(params);
  }
}
