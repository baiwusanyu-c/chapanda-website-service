import { ApiProperty } from '@nestjs/swagger';
export class SetUserPermissionDto {
  @ApiProperty({ name: 'id', type: String, description: '用户id' })
  id: string;
  @ApiProperty({ name: 'permissionId', type: String, description: '权限id' })
  permissionId: string;
}
