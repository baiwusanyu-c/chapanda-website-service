import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiResponseDto, genResContent, StatusCode } from '../utils';
import { FindNewsDto } from './dto/find-news.dto';
import { ResNewsListDto } from './dto/res-news.dto';

@ApiExtraModels(ApiResponseDto, ResNewsListDto, FindNewsDto)
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
  @HttpCode(StatusCode.OK)
  @Post('insert')
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @ApiOperation({
    summary: '查询新闻',
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
