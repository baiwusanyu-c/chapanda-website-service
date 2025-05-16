import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiResponseDto, genResContent, StatusCode } from '../utils';
import { CreateShopsDto } from './dto/create-shops.dto';
import { FindShopDto } from './dto/find-shop.dto';
import { ResShopListDto } from './dto/res-shop.dto';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

@ApiExtraModels(ApiResponseDto, ResShopListDto)
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
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @ApiOperation({
    summary: '创建门店',
    description: '创建门店接口',
  })
  @ApiBody({
    type: CreateShopDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '创建门店成功',
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
  @UseGuards(JwtAuthGuard)
  @HttpCode(StatusCode.OK)
  @Post('insert')
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }

  @ApiOperation({
    summary: '批量创建门店',
    description: '批量创建门店接口',
  })
  @ApiBody({
    type: CreateShopsDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '批量创建门店成功',
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
  @UseGuards(JwtAuthGuard)
  @HttpCode(StatusCode.OK)
  @Post('batch-insert')
  batchCreate(@Body() createShopsDto: CreateShopsDto) {
    return this.shopService.batchCreate(createShopsDto.data);
  }

  @ApiOperation({
    summary: '[公开]查询门店',
    description: '查询门店接口',
  })
  @ApiBody({
    type: FindShopDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '查询门店成功',
    content: genResContent(ResShopListDto),
  })
  @HttpCode(StatusCode.OK)
  @Post('list')
  list(@Body() findShopDto: FindShopDto) {
    return this.shopService.list(findShopDto);
  }
}
