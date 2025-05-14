import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { CreateShopDto } from './create-shop.dto';
export class ResShopDto {
  @ApiProperty({
    description: '主键id',
    type: 'string',
  })
  id: string;

  @ApiProperty({
    description: '门店名称',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    description: '门店英文名称',
    type: 'string',
  })
  nameEn: string;

  @ApiProperty({
    description: '区域名称',
    type: 'string',
  })
  region: string;

  @ApiProperty({
    description: '区域英文名称',
    type: 'string',
  })
  regionEn: string;

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

export class ResShopListDto {
  @ApiProperty({
    description: '总条数',
    type: 'string',
  })
  total: number;
  @ApiProperty({
    description: '列表',
    type: () => [CreateShopDto],
  })
  records: ResShopDto[];
}
