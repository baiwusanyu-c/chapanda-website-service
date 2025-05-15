import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class ResOperationCenter {
  @ApiProperty({
    description: '主键id',
    type: 'string',
  })
  id: string;

  @ApiProperty({ name: 'name', type: String, description: '营运中心名称' })
  name: string;

  @ApiProperty({ name: 'address', type: String, description: '营运中心地址' })
  address: string;

  @ApiProperty({
    name: 'type',
    enum: ['1', '2'],
    example: '1 | 2',
    type: 'string',
    description: '营运中心类别',
  })
  type: 1 | 2;

  @ApiProperty({
    name: 'website',
    type: Date,
    description: '营运中心网站',
    nullable: true,
    required: false,
  })
  @IsOptional()
  website?: string | null;

  @ApiProperty({
    name: 'supervisionPhone',
    type: Date,
    description: '监督电话',
    nullable: true,
    required: false,
  })
  @IsOptional()
  supervisionPhone?: string | null;

  @ApiProperty({
    name: 'email',
    type: 'string',
    description: '营运中心邮箱',
    nullable: true,
    required: false,
  })
  @IsOptional()
  email: string | null;

  @ApiProperty({
    name: 'networkSecurity',
    type: 'string',
    description: '营运中心技术支持',
    nullable: true,
    required: false,
  })
  @IsOptional()
  networkSecurity?: string | null;

  @ApiProperty({
    name: 'franchiseHotline',
    type: 'string',
    description: '招商热线',
    nullable: true,
    required: false,
  })
  @IsOptional()
  franchiseHotline?: string | null;

  @ApiProperty({
    name: 'customerServiceHotline',
    type: 'string',
    description: '客户服务热线',
    nullable: true,
    required: false,
  })
  @IsOptional()
  customerServiceHotline?: string | null;

  @ApiProperty({
    name: 'reportingMobile',
    type: 'string',
    description: '举报电话',
    nullable: true,
    required: false,
  })
  @IsOptional()
  reportingMobile?: string | null;

  @ApiProperty({
    name: 'weChat',
    type: 'string',
    description: '微信',
    nullable: true,
    required: false,
  })
  @IsOptional()
  weChat?: string | null;

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

export class ResOperationCenterListDto {
  @ApiProperty({
    description: '总条数',
    type: 'string',
  })
  total: number;
  @ApiProperty({
    description: '列表',
    type: () => [ResOperationCenter],
  })
  records: ResOperationCenter[];
}
