/*
import { ApiProperty } from '@nestjs/swagger';
import { AObjectDto } from './a-object.dto';

export class ResponseDto {
  @ApiProperty({
    type: AObjectDto, // 指定嵌套对象的类型
    description: '数据主体',
  })
  data: AObjectDto;
}
*/


/*import { Type } from 'class-transformer';
import { StatusCode } from '../../utils';

export class ResponseDto<T = any> {
  @Type(() => Object) // 确保 class-transformer 正确序列化
  data: T;
  @Type(() => Number)
  code: StatusCode;
  constructor(data: T) {
    this.data = data;
  }
}*/
