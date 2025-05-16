import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({ name: 'link', type: String, description: '新闻链接' })
  @IsNotEmpty({ message: 'news.link.empty' })
  @MaxLength(500, { message: 'news.link.maxLen' })
  link: string;

  @ApiProperty({ name: 'detail', type: String, description: '新闻详情' })
  @IsNotEmpty({ message: 'news.detail.empty' })
  @MaxLength(500, { message: 'news.detail.maxLen' })
  detail: string;

  @ApiProperty({ name: 'titleEn', type: String, description: '新闻英文标题' })
  @IsNotEmpty({ message: 'news.titleEn.empty' })
  @MaxLength(50, { message: 'news.titleEn.maxLen' })
  titleEn: string;

  @ApiProperty({ name: 'detailEn', type: String, description: '新闻英文详情' })
  @IsNotEmpty({ message: 'news.detailEn.empty' })
  @MaxLength(500, { message: 'news.detailEn.maxLen' })
  detailEn: string;

  @ApiProperty({ name: 'date', type: Date, description: '新闻日期' })
  @IsNotEmpty({ message: 'news.date.empty' })
  date: Date;

  @ApiProperty({ name: 'title', type: String, description: '新闻标题' })
  @IsNotEmpty({ message: 'news.title.empty' })
  @MaxLength(50, { message: 'news.title.maxLen' })
  title: string;
}
