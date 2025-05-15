import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateOperationCenterDto {
  @ApiProperty({ name: 'name', type: String, description: '营运中心名称' })
  @IsNotEmpty({ message: 'operation.name.empty' })
  @MaxLength(50, { message: 'operation.name.maxLen' })
  name: string;

  @ApiProperty({ name: 'address', type: String, description: '营运中心地址' })
  @IsNotEmpty({ message: 'operation.address.empty' })
  @MaxLength(200, { message: 'operation.address.maxLen' })
  address: string;

  @ApiProperty({
    name: 'type',
    enum: ['1', '2'],
    example: '1 | 2',
    type: 'string',
    description: '营运中心类别',
  })
  @MaxLength(50, { message: 'operation.type.maxLen' })
  @IsNotEmpty({ message: 'operation.type.empty' })
  type: 1 | 2;

  @ApiProperty({
    name: 'website',
    type: 'string',
    description: '营运中心网站',
    nullable: true,
    required: false,
  })
  @IsOptional()
  website?: string | null;

  @ApiProperty({
    name: 'supervisionPhone',
    type: 'string',
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
}
