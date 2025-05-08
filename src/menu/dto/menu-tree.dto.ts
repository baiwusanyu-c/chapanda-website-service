import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class MenuTreeDto {
  @ApiProperty({ name: 'name', type: String, description: '菜单名称' })
  name: string;

  @ApiProperty({
    name: 'nameEn',
    type: String,
    description: '菜单名称(英文)',
  })
  nameEn: string;

  @ApiProperty({
    name: 'icon',
    type: String,
    description: '菜单图标',
    required: false,
    nullable: true,
  })
  icon?: string;

  @ApiProperty({ name: 'path', type: String, description: '菜单路径' })
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
