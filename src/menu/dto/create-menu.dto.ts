import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ name: '菜单名称', type: String })
  @IsNotEmpty({ message: 'menu.name.empty' })
  @MaxLength(50, { message: 'menu.name.length' })
  name: string;

  @ApiProperty({ name: '菜单图标', type: String })
  @MaxLength(50, { message: 'menu.icon.length' })
  icon?: string;

  @ApiProperty({ name: '菜单路径', type: String })
  @IsNotEmpty({ message: 'user.password.empty' })
  @MaxLength(500, { message: 'user.password.length' })
  path: string;

  @ApiProperty({ name: '父菜单节点Id', type: String })
  parentId?: string;
}
