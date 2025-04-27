import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ name: '用户ID', type: String })
  @IsNotEmpty({ message: 'user.username.emptyId' })
  id: string;
}
