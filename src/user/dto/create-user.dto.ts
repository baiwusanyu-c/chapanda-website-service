import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ name: 'username', type: String, description: '用户名' })
  @IsNotEmpty({ message: 'user.username.empty' })
  username: string;

  @ApiProperty({ name: 'password', type: String, description: '密码' })
  @IsNotEmpty({ message: 'user.password.empty' })
  @MinLength(6, { message: 'user.password.length' })
  password: string;

  @ApiProperty({ name: 'email', type: String, description: '邮箱' })
  @IsNotEmpty({ message: 'user.email.empty' })
  email: string;
}
