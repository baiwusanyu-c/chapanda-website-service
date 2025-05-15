import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Franchise {
  @PrimaryGeneratedColumn('uuid', {
    comment: '主键id',
  })
  id: string;

  @Column({
    type: 'int',
    comment: '顺序',
  })
  order: number;

  @Column({
    length: 50,
    comment: '加盟步骤标题',
  })
  title: string;

  @Column({
    length: 50,
    comment: '加盟步骤英文标题',
  })
  titleEn: string;

  @Column({
    length: 500,
    comment: '加盟步骤详情',
  })
  detail: string;

  @Column({
    length: 500,
    comment: '加盟步骤英文详情',
  })
  detailEn: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
