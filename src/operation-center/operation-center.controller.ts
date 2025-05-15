import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { OperationCenterService } from './operation-center.service';
import { CreateOperationCenterDto } from './dto/create-operation-center.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiResponseDto, genResContent, StatusCode } from '../utils';
import { FindOperationCenterDto } from './dto/find-operation-center.dto';
import { ResOperationCenterListDto } from './dto/res-operation-center.dto';

@ApiExtraModels(
  ApiResponseDto,
  ResOperationCenterListDto,
  FindOperationCenterDto,
)
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
@Controller('operation-center')
export class OperationCenterController {
  constructor(
    private readonly operationCenterService: OperationCenterService,
  ) {}

  @ApiOperation({
    summary: '创建营运中心',
    description: '创建营运中心接口',
  })
  @ApiBody({
    type: CreateOperationCenterDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '创建营运中心成功',
    content: genResContent(null),
  })
  @HttpCode(StatusCode.OK)
  @Post('insert')
  create(@Body() createOperationCenterDto: CreateOperationCenterDto) {
    return this.operationCenterService.create(createOperationCenterDto);
  }

  @ApiOperation({
    summary: '查询营运中心',
    description: '查询营运中心接口',
  })
  @ApiBody({
    type: FindOperationCenterDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '查询营运中心成功',
    content: genResContent(ResOperationCenterListDto),
  })
  @HttpCode(StatusCode.OK)
  @Post('list')
  list(@Body() findOperationCenterDto: FindOperationCenterDto) {
    return this.operationCenterService.list(findOperationCenterDto);
  }
}
