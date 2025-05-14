import { ApiProperty } from '@nestjs/swagger';
import { PageParamsDto } from '../../utils';

export class FindShopDto extends PageParamsDto {
  @ApiProperty({
    name: 'regionEn',
    type: String,
    description: '区域英文名称',
    nullable: true,
  })
  regionEn?: string;
}
