import {
  Tree,
  PrimaryGeneratedColumn,
  Column,
  TreeParent,
  OneToMany,
  TreeChildren,
  Entity,
} from 'typeorm';
import { Permission } from '../../user/entities/permission.entity';

@Entity()
@Tree('closure-table', {
  closureTableName: 'menu', // 指定闭包表名
})
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
  parentId?: string;

  // 关联父级菜单
  @TreeParent()
  parent?: Menu;
  // 关联子级菜单
  @TreeChildren()
  children?: Menu[];

  @OneToMany(() => Permission, (permission) => permission.menu)
  permissions: Permission[];

  @Column({ type: 'int', default: 0, comment: '排序权重' })
  order: number;

  @Column({ type: 'int', default: 0, comment: '层级' })
  level: number;
}
