import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserMenuPermissionDto {
  @ApiProperty({ name: 'id', type: String, description: '用户id' })
  @IsNotEmpty({ message: 'permission.menu.emptyId' })
  id: string;

  @ApiProperty({ name: 'menuPath', type: String, description: '菜单路径' })
  @IsNotEmpty({ message: 'permission.menu.emptyPath' })
  menuPath: string;
}
