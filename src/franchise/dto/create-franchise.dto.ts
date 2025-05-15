import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFranchiseDto {
  @ApiProperty({ name: 'title', type: String, description: '加盟步骤标题' })
  @IsNotEmpty({ message: 'franchise.title.empty' })
  @MaxLength(50, { message: 'franchise.title.maxLen' })
  title: string;

  @ApiProperty({
    name: 'titleEn',
    type: String,
    description: '加盟步骤英文标题',
  })
  @IsNotEmpty({ message: 'franchise.titleEn.empty' })
  @MaxLength(50, { message: 'franchise.titleEn.maxLen' })
  titleEn: string;

  @ApiProperty({ name: 'detail', type: String, description: '加盟步骤详情' })
  @IsNotEmpty({ message: 'franchise.detail.empty' })
  @MaxLength(500, { message: 'franchise.detail.maxLen' })
  detail: string;

  @ApiProperty({
    name: 'detailEn',
    type: String,
    description: '加盟步骤英文详情',
  })
  @IsNotEmpty({ message: 'franchise.detailEn.empty' })
  @MaxLength(500, { message: 'franchise.detailEn.maxLen' })
  detailEn: string;

  @ApiProperty({ name: 'order', type: String, description: '加盟步骤顺序' })
  @IsNotEmpty({ message: 'franchise.order.empty' })
  order: number;
}
