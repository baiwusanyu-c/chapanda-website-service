import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto {
  @ApiProperty({ name: 'name', type: String, description: '门店名称' })
  @IsNotEmpty({ message: 'shop.name.empty' })
  @MaxLength(50, { message: 'shop.name.maxLen' })
  name: string;

  @ApiProperty({ name: 'nameEn', type: String, description: '门店英文名称' })
  @IsNotEmpty({ message: 'shop.nameEn.empty' })
  @MaxLength(200, { message: 'shop.nameEn.maxLen' })
  nameEn: string;

  @ApiProperty({ name: 'region', type: String, description: '区域名称' })
  @IsNotEmpty({ message: 'shop.region.empty' })
  @MaxLength(50, { message: 'shop.region.maxLen' })
  region: string;

  @ApiProperty({ name: 'regionEn', type: String, description: '区域英文名称' })
  @IsNotEmpty({ message: 'shop.regionEn.empty' })
  @MaxLength(50, { message: 'shop.regionEn.maxLen' })
  regionEn: string;
}
