import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class News {
  @PrimaryGeneratedColumn('uuid', {
    comment: '主键id',
  })
  id: string;

  @Column({
    length: 200,
    comment: '新闻标题',
  })
  title: string;

  @Column({
    length: 200,
    comment: '新闻英文标题',
  })
  titleEn: string;

  @Column({
    length: 500,
    comment: '新闻详情',
  })
  detail: string;

  @Column({
    length: 500,
    comment: '新闻英文详情',
  })
  detailEn: string;

  @Column({
    length: 500,
    comment: '新闻链接',
  })
  link: string;

  @CreateDateColumn({
    comment: '新闻日期',
  })
  date: Date;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
