import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ name: '用户名', type: String })
  @IsNotEmpty({ message: 'user.password.empty' })
  username: string;

  @ApiProperty({ name: '密码', type: String })
  @IsNotEmpty({ message: 'user.password.empty' })
  @MinLength(6, { message: 'user.password.length' })
  password: string;

  @ApiProperty({ name: '邮箱', type: String })
  @IsNotEmpty({ message: 'user.email.empty' })
  email: string;
}
