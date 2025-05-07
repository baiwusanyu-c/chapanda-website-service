import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindRemoveUserDto {
  @ApiProperty({ name: 'id', type: String, description: '用户ID' })
  @IsNotEmpty({ message: 'user.username.emptyId' })
  id: string;
}
