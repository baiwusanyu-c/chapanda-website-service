import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { genResContent, StatusCode } from '../utils';
import { CreateShopsDto } from './dto/create-shops.dto';

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
  @HttpCode(StatusCode.OK)
  @Post('batch-insert')
  batchCreate(@Body() createShopsDto: CreateShopsDto) {
    return this.shopService.batchCreate(createShopsDto.data);
  }

  @Post('list')
  list(@Body() createShopDto: CreateShopDto) {
    return this.shopService.create(createShopDto);
  }
}
