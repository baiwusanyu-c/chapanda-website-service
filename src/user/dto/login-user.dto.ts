import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    name: 'account',
    type: String,
    description: '用户名/邮箱地址',
  })
  @IsNotEmpty({ message: 'user.login.empty' })
  account: string;

  @ApiProperty({ name: 'password', type: String, description: '密码' })
  @IsNotEmpty({ message: 'user.password.empty' })
  @MinLength(6, { message: 'user.password.length' })
  password: string;
}
