import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsEnum, ValidateIf } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    enum: ['API', 'MENU'],
    enumName: 'type',
    example: 'API | MENU',
    description: '权限类型',
    type: 'string',
  })
  @IsEnum(['API', 'MENU'], { message: 'permission.type.value' })
  @IsNotEmpty({ message: 'permission.type.empty' })
  type: string;

  @ApiProperty({ name: 'name', type: String, description: '权限名称' })
  @IsNotEmpty({ message: 'permission.name.empty' })
  @MaxLength(50, { message: 'permission.name.length' })
  name: string;

  @ApiProperty({
    name: 'path',
    type: String,
    nullable: true,
    required: false,
    description: '接口（仅 type=API 时有效）',
  })
  @ValidateIf((o: CreatePermissionDto) => o.type === 'API', {
    message: 'permission.path.empty',
  })
  @IsNotEmpty({ message: 'permission.path.empty' })
  @MaxLength(100, { message: 'permission.path.length' })
  path?: string | null;

  @ApiProperty({
    name: 'method',
    type: String,
    nullable: true,
    required: false,
    description: 'HTTP方法（仅 type=API 时有效）',
  })
  @ValidateIf((o: CreatePermissionDto) => o.type === 'API')
  @IsNotEmpty({ message: 'permission.method.empty' })
  @MaxLength(10, { message: 'permission.method.length' })
  method?: string | null;

  @ApiProperty({
    name: 'menuId',
    type: String,
    nullable: true,
    required: false,
    description: '关联的menuId（仅 type=MENU 时有效）',
  })
  @ValidateIf((o: CreatePermissionDto) => o.type === 'MENU')
  @IsNotEmpty({ message: 'permission.menuId.empty' })
  @MaxLength(100, { message: 'permission.menuId.length' })
  menuId?: string;
}
