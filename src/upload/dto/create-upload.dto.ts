import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUploadDto {
  @ApiProperty({ name: 'fileName', type: String, description: '文件名称' })
  @IsNotEmpty({ message: 'upload.fileName.empty' })
  @MaxLength(50, { message: 'upload.fileName.maxLen' })
  fileName: string;

  @ApiProperty({
    name: 'category',
    type: String,
    description: '文件分类',
    enum: ['1', '2', '3', '4', '5', '6'],
    example: '1-公共与通告 | 2-月报表 ｜ 3-通函 ｜ 4-委任代表表格 ｜ 5-业绩报告 ｜ 6-其他 ',
  })
  @IsNotEmpty({ message: 'upload.category.empty' })
  category: string;
}
