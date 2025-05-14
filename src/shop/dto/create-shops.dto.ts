import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateShopDto } from './create-shop.dto';

export class CreateShopsDto {
  @ApiProperty({
    name: 'data',
    type: () => [CreateShopDto],
    description: '门店数据',
  })
  @IsNotEmpty({ message: 'user.username.empty' })
  data: CreateShopDto[];
}
