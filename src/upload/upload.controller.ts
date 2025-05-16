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
import { FindPdfDto } from './dto/find-pdf.dto';
import { ResFileDto } from './dto/res-file.dto';

@ApiExtraModels(ApiResponseDto, UploadUrlDto, ResFileDto)
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

  @ApiOperation({
    summary: 'pdf文件查询',
    description: 'pdf文件查询接口',
  })
  @ApiBody({
    type: FindPdfDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: 'pdf文件查询成功',
    content: genResContent(ResFileDto, 'array'),
  })
  @HttpCode(StatusCode.OK)
  @Post('find-pdf')
  findPdf(@Body() findPdfDto: FindPdfDto) {
    return this.uploadService.findPdf(findPdfDto);
  }

  // TODO: 分页、分时间、分类查询pdf文件列表
}
