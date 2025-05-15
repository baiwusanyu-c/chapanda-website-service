import { ApiProperty } from '@nestjs/swagger';
export class ResFranchiseDto {
  @ApiProperty({
    description: '主键id',
    type: 'string',
  })
  id: string;

  @ApiProperty({
    type: 'number',
    description: '顺序',
  })
  order: number;

  @ApiProperty({
    description: '加盟步骤标题',
    type: 'string',
  })
  title: string;

  @ApiProperty({
    description: '加盟步骤英文标题',
    type: 'string',
  })
  titleEn: string;

  @ApiProperty({
    description: '加盟步骤详情',
    type: 'string',
  })
  detail: string;

  @ApiProperty({
    description: '加盟步骤英文详情',
    type: 'string',
  })
  date: string;

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

export class ResFranchiseListDto {
  @ApiProperty({
    description: '总条数',
    type: 'string',
  })
  total: number;
  @ApiProperty({
    description: '列表',
    type: () => [ResFranchiseDto],
  })
  records: ResFranchiseDto[];
}
