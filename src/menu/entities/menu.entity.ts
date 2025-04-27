import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Permission } from '../../user/entities/permission.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid', {
    comment: '主键',
  })
  id: string;

  @Column({ length: 50, comment: '菜单名称' })
  name: string;

  @Column({ length: 50, nullable: true, comment: '菜单图标' })
  icon: string;

  @Column({ length: 100, comment: '菜单路径' })
  path: string;

  @Column({ nullable: true, comment: '父级菜单id' })
  parentId: string;

  // 表自关联，关联父级菜单
  @ManyToOne(() => Menu, (menu) => menu.children)
  parent: Menu;
  // 表自关联，关联子级菜单
  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[];

  @OneToMany(() => Permission, (permission) => permission.menu)
  permissions: Permission[];

  @Column({ type: 'int', default: 0, comment: '排序权重' })
  order: number;
}
