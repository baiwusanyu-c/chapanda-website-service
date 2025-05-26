import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'pdf',
})
export class Upload {
  @PrimaryGeneratedColumn('uuid', {
    comment: '主键id',
  })
  id: string;

  @Column({
    length: 5000,
    comment: '预览地址',
  })
  previewUrl: string;

  @Column({
    length: 5000,
    comment: '下载地址',
  })
  downLoadUrl: string;

  @Column({
    length: 500,
    comment: '文件名称',
  })
  fileName: string;

  @Column({
    length: 50,
    comment: '文件描述',
  })
  description: string;

  @Column({
    length: 500,
    comment: '文件英文名称',
  })
  fileNameEn: string;

  @Column({
    length: 200,
    comment: '文件英文描述',
  })
  descriptionEn: string;

  @Column({
    length: 50,
    comment: '文件分类',
  })
  category: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updateTime: Date;
}
