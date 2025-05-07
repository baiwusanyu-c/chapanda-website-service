import { ApiProperty } from '@nestjs/swagger';
export class FindUserDto {
  @ApiProperty({ name: 'id', type: String, description: '主键id' })
  id: string;

  @ApiProperty({ name: 'username', type: String, description: '用户名' })
  username: string;

  @ApiProperty({ name: 'email', type: String, description: '邮箱' })
  email: string;

  @ApiProperty({ name: 'createTime', type: Date, description: '创建时间' })
  createTime: Date;

  @ApiProperty({ name: 'updateTime', type: Date, description: '更新时间' })
  updateTime: Date;
}
