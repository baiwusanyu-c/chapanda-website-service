import {
  Tree,
  PrimaryGeneratedColumn,
  Column,
  TreeParent,
  OneToMany,
  TreeChildren,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';

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

  @Column({ length: 50, comment: '菜单名称(英文)' })
  nameEn: string;

  @Column({ length: 50, nullable: true, comment: '菜单图标' })
  icon: string;

  @Column({ length: 100, comment: '菜单路径' })
  path: string;

  @Column({ comment: '是否展示' })
  show: boolean;

  @Column({ nullable: true, comment: '父级菜单id' })
  parentId?: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;

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
