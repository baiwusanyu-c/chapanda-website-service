import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto {
  @ApiProperty({ name: 'name', type: String, description: '门店名称' })
  @IsNotEmpty({ message: 'user.username.empty' })
  @MaxLength(50, { message: 'user.username.empty' })
  name: string;

  @ApiProperty({ name: 'nameEn', type: String, description: '门店英文名称' })
  @IsNotEmpty({ message: 'user.username.empty' })
  @MaxLength(200, { message: 'user.username.empty' })
  nameEn: string;

  @ApiProperty({ name: 'region', type: String, description: '区域名称' })
  @IsNotEmpty({ message: 'user.username.empty' })
  @MaxLength(50, { message: 'user.username.empty' })
  region: string;

  @ApiProperty({ name: 'regionEn', type: String, description: '区域英文名称' })
  @IsNotEmpty({ message: 'user.username.empty' })
  @MaxLength(50, { message: 'user.username.empty' })
  regionEn: string;
}
