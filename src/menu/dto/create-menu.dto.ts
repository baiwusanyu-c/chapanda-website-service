import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ name: 'name', type: String, description: '菜单名称' })
  @IsNotEmpty({ message: 'menu.name.empty' })
  @MaxLength(50, { message: 'menu.name.length' })
  name: string;

  @ApiProperty({
    name: 'nameEn',
    type: String,
    description: '菜单名称(英文)',
  })
  @IsNotEmpty({ message: 'menu.name.empty' })
  @MaxLength(50, { message: 'menu.name.length' })
  nameEn: string;

  @ApiProperty({
    name: 'show',
    type: Boolean,
    description: '是否展示',
  })
  @IsNotEmpty({ message: 'menu.show.empty' })
  show: boolean;

  @ApiProperty({
    name: 'icon',
    type: String,
    description: '菜单图标',
    required: false,
    nullable: true,
  })
  @MaxLength(50, { message: 'menu.icon.length' })
  icon?: string;

  @ApiProperty({ name: 'path', type: String, description: '菜单路径' })
  @IsNotEmpty({ message: 'menu.path.empty' })
  @MaxLength(500, { message: 'menu.path.length' })
  path: string;

  @ApiProperty({
    name: 'parentId',
    type: String,
    description: '父菜单节点Id',
    required: false,
    nullable: true,
  })
  parentId?: string;
}
