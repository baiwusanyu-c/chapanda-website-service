import { ApiProperty } from '@nestjs/swagger';

export class ResUserMenuPermissionDto {
  @ApiProperty({
    name: 'hasPermission',
    type: Boolean,
    description: '该用户是否有此路径菜单权限',
  })
  hasPermission: boolean;
}
