import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'shop',
})
export class Shop {
  @PrimaryGeneratedColumn('uuid', {
    comment: '主键id',
  })
  id: string;

  @Column({
    length: 50,
    comment: '门店名称',
  })
  name: string;

  @Column({
    length: 200,
    comment: '门店英文名称',
  })
  nameEn: string;

  @Column({
    length: 50,
    comment: '区域名称',
  })
  region: string;

  @Column({
    length: 50,
    comment: '区域英文名称',
  })
  regionEn: string;
  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
