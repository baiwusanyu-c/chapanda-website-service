import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiHeader,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiResponseDto, genResContent, StatusCode } from '../utils';
import { FindNewsDto } from './dto/find-news.dto';
import { ResNewsListDto } from './dto/res-news.dto';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';

@ApiExtraModels(ApiResponseDto, ResNewsListDto, FindNewsDto)
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
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({
    summary: '创建新闻',
    description: '创建新闻接口',
  })
  @ApiBody({
    type: CreateNewsDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '创建新闻成功',
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
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @ApiOperation({
    summary: '[公开]查询新闻',
    description: '查询新闻接口',
  })
  @ApiBody({
    type: FindNewsDto,
  })
  @ApiResponse({
    status: StatusCode.OK,
    description: '查询新闻成功',
    content: genResContent(ResNewsListDto),
  })
  @HttpCode(StatusCode.OK)
  @Post('list')
  list(@Body() findNewsDto: FindNewsDto) {
    return this.newsService.list(findNewsDto);
  }
}
