import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// TODO: 英文
@Entity()
export class OperationCenter {
  @PrimaryGeneratedColumn('uuid', {
    comment: '主键id',
  })
  id: string;

  @Column({
    length: 50,
    comment: '营运中心名称',
  })
  name: string;

  @Column({
    length: 200,
    comment: '营运中心地址',
  })
  address: string;

  @Column({
    length: 50,
    comment: '营运中心类别',
  })
  type: string;

  @Column({
    length: 50,
    comment: '营运中心网站',
    nullable: true,
  })
  website: string;

  @Column({
    length: 50,
    comment: '监督电话',
    nullable: true,
  })
  supervisionPhone: string;

  @Column({
    length: 50,
    comment: '营运中心邮箱',
    nullable: true,
  })
  email: string;

  @Column({
    length: 50,
    comment: '营运中心技术支持',
    nullable: true,
  })
  networkSecurity: string;

  @Column({
    length: 50,
    comment: '招商热线',
    nullable: true,
  })
  franchiseHotline: string;

  @Column({
    length: 50,
    comment: '客户服务热线',
    nullable: true,
  })
  customerServiceHotline: string;

  @Column({
    length: 50,
    comment: '举报电话',
    nullable: true,
  })
  reportingMobile: string;

  @Column({
    length: 50,
    comment: '微信',
    nullable: true,
  })
  weChat: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
