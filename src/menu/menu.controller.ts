import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { ApiResponseDto, genResContent, StatusCode } from '../utils';
import { MenuTreeDto } from './dto/menu-tree.dto';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

@ApiExtraModels(ApiResponseDto, MenuTreeDto)
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
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // 创建菜单
  @ApiOperation({
    summary: '创建菜单',
    description: '创建菜单接口',
  })
  @ApiBody({
    type: CreateMenuDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '创建菜单成功',
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
  @Post('add')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  // 获取完整菜单树
  @ApiOperation({
    summary: '[公开]获取完整菜单树',
    description: '获取完整菜单树接口',
  })
  @ApiBody({
    type: CreateMenuDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '查询成功',
    content: genResContent(MenuTreeDto, 'tree'),
  })
  @HttpCode(StatusCode.OK)
  @Post('getTreeMenus')
  findTreeMenus() {
    return this.menuService.findTreeMenus();
  }
}
