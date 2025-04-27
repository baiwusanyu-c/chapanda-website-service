import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Menu } from '../../menu/entities/menu.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid', {
    comment: '主键',
  })
  id: string;

  @Column({
    type: 'enum',
    enum: ['API', 'MENU'],
    default: 'API',
    comment: '权限类型',
  })
  type: 'API' | 'MENU';

  @Column({
    length: 50,
    comment: '权限名称',
  })
  name: string;

  @Column({
    length: 100,
    nullable: true,
    comment: 'API 路径（仅 type=API 时有效）',
  })
  path: string;

  @Column({
    length: 10,
    nullable: true,
    comment: 'HTTP 方法（仅 type=API 时有效）',
  })
  method: string;
  // 与菜单表关联,  关联的 menu_id
  @ManyToOne(() => Menu, (menu) => menu.permissions, { nullable: true })
  menu: Menu;
  // 与用户表关联
  @ManyToMany(() => User, (user) => user.permissions)
  users: User[];
}
