import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { FranchiseService } from './franchise.service';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { FindFranchiseDto } from './dto/find-franchise.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiResponseDto, genResContent, StatusCode } from '../utils';
import { FindShopDto } from '../shop/dto/find-shop.dto';
import { ResFranchiseListDto } from './dto/res-franchise.dto';

@ApiExtraModels(ApiResponseDto, ResFranchiseListDto)
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
@Controller('franchise')
export class FranchiseController {
  constructor(private readonly franchiseService: FranchiseService) {}

  @ApiOperation({
    summary: '创建加盟步骤',
    description: '创建加盟步骤接口',
  })
  @ApiBody({
    type: CreateFranchiseDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '创建加盟步骤成功',
    content: genResContent(null),
  })
  @HttpCode(StatusCode.OK)
  @Post('process-insert')
  create(@Body() createFranchiseDto: CreateFranchiseDto) {
    return this.franchiseService.create(createFranchiseDto);
  }

  @ApiOperation({
    summary: '查询加盟步骤',
    description: '查询加盟步骤接口',
  })
  @ApiBody({
    type: FindFranchiseDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '查询加盟步骤成功',
    content: genResContent(ResFranchiseListDto),
  })
  @HttpCode(StatusCode.OK)
  @Post('process-list')
  list(@Body() findFranchiseDto: FindFranchiseDto) {
    return this.franchiseService.list(findFranchiseDto);
  }
}
