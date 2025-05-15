import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiResponseDto, genResContent, StatusCode } from '../utils';
import { UploadUrlDto } from './dto/upload-url.dto';

@ApiExtraModels(ApiResponseDto, UploadUrlDto)
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
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  // TODO: 只有特定人才能访问前端页面、此接口
  @ApiOperation({
    summary: 'pdf文件上传地址获取',
    description: 'pdf文件上传地址获取接口',
  })
  @ApiBody({
    type: CreateUploadDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: 'pdf文件上传地址获取成功',
    content: genResContent(UploadUrlDto),
  })
  @HttpCode(StatusCode.OK)
  @Post('pdf')
  pdf(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.pdf(createUploadDto);
  }
  // TODO: 根据 id 查询具体pdf文件信息
  // TODO: 分页、分时间、分类查询pdf文件列表
}
