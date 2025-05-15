import { ApiProperty } from '@nestjs/swagger';
export class ResShopDto {
  @ApiProperty({
    description: '主键id',
    type: 'string',
  })
  id: string;

  @ApiProperty({
    description: '新闻标题',
    type: 'string',
  })
  title: string;

  @ApiProperty({
    description: '新闻详情',
    type: 'string',
  })
  detail: string;

  @ApiProperty({
    description: '新闻链接',
    type: 'string',
  })
  link: string;

  @ApiProperty({
    description: '新闻日期',
    type: () => Date,
  })
  date: Date;

  @ApiProperty({
    description: '创建时间',
    type: () => Date,
  })
  createTime: Date;

  @ApiProperty({
    description: '更新时间',
    type: () => Date,
  })
  updateTime: Date;
}

export class ResNewsListDto {
  @ApiProperty({
    description: '总条数',
    type: 'string',
  })
  total: number;
  @ApiProperty({
    description: '列表',
    type: () => [ResShopDto],
  })
  records: ResShopDto[];
}
