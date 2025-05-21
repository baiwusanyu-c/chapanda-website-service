import { ApiProperty } from '@nestjs/swagger';

export class LoginUserResDto {
  @ApiProperty({ name: 'token', type: String, description: '登录token' })
  token: string;
  @ApiProperty({ name: 'id', type: String, description: '用户id' })
  id: string;
}
