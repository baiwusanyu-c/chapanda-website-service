import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';
import { Optional } from '@nestjs/common';

export class CreateUploadDto {
  @ApiProperty({ name: 'fileName', type: String, description: '文件名称' })
  @IsNotEmpty({ message: 'upload.fileName.empty' })
  @MaxLength(50, { message: 'upload.fileName.maxLen' })
  fileName: string;

  @ApiProperty({
    name: 'description',
    type: String,
    description: '文件描述',
    required: false,
    nullable: true,
  })
  @Optional()
  description: string;

  @ApiProperty({
    name: 'fileNameEn',
    type: String,
    description: '文件英文名称',
  })
  @IsNotEmpty({ message: 'upload.fileNameEn.empty' })
  @MaxLength(200, { message: 'upload.fileNameEn.maxLen' })
  fileNameEn: string;

  @ApiProperty({
    name: 'descriptionEn',
    type: String,
    description: '文件英文描述',
    required: false,
    nullable: true,
  })
  @Optional()
  descriptionEn: string;

  @ApiProperty({
    name: 'category',
    type: String,
    description: '文件分类',
    enum: ['1', '2', '3', '4', '5', '6'],
    example:
      '1-公共与通告 | 2-月报表 ｜ 3-通函 ｜ 4-委任代表表格 ｜ 5-业绩报告 ｜ 6-其他 ',
  })
  @IsNotEmpty({ message: 'upload.category.empty' })
  category: string;
}
