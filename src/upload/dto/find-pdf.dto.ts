import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class FindPdfDto {
  @ApiProperty({
    name: 'fileName',
    type: String,
    description: '文件名称',
    nullable: true,
    required: false,
  })
  @Optional()
  fileName: string;

  @ApiProperty({
    name: 'id',
    type: String,
    description: '文件id',
    nullable: true,
    required: false,
  })
  @Optional()
  id: string;
}
