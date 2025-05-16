import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';
import { PageParamsDto } from '../../utils';

export class FindPdfsDto extends PageParamsDto {
  @ApiProperty({
    name: 'keyword',
    type: String,
    description: '文件名称或文件描述关键字',
    nullable: true,
    required: false,
  })
  @Optional()
  keyword: string;

  @ApiProperty({
    name: 'category',
    type: String,
    description: '文件分类',
    nullable: true,
    required: false,
  })
  @Optional()
  category: string;

  @ApiProperty({
    name: 'startDate',
    type: Date,
    description: '查询开始时间',
    nullable: true,
    required: false,
  })
  @Optional()
  startDate: string;

  @ApiProperty({
    name: 'endDate',
    type: Date,
    description: '查询结束时间',
    nullable: true,
    required: false,
  })
  @Optional()
  endDate: string;
}
