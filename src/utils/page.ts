import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PageParamsDto {
  @ApiProperty({ name: 'pageSize', type: String, description: '分页尺寸' })
  @IsNotEmpty({ message: 'page.pageSize.empty' })
  pageSize: number;

  @ApiProperty({ name: 'pageNum', type: String, description: '查询页码' })
  @IsNotEmpty({ message: 'page.pageNum.empty' })
  pageNum: string;
}
