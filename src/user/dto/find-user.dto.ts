import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Permission } from '../../permission/entities/permission.entity';
import { ApiResponseDto } from '../../utils';

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

  @ApiProperty({
    name: 'permissions',
    type: 'array',
    items: { $ref: getSchemaPath(Permission) },
    description: '用户权限, 元素类型为 Permission 实体',
  })
  permissions: Permission[] | null;
}
