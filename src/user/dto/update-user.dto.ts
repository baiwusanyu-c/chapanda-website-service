import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ name: 'id', type: String, description: '用户ID' })
  @IsNotEmpty({ message: 'user.username.emptyId' })
  id: string;
}
