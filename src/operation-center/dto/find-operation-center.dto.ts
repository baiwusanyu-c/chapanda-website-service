import { PageParamsDto } from '../../utils';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class FindOperationCenterDto extends PageParamsDto {
  @ApiProperty({
    name: 'type',
    enum: ['1', '2'],
    example: '1 | 2',
    type: 'string',
    description: '营运中心类别',
    required: false,
    nullable: true,
  })
  @IsOptional()
  type?: 1 | 2 | null;
}
