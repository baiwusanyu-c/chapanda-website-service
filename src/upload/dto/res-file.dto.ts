import { ApiProperty } from '@nestjs/swagger';

export class ResFileDto {
  @ApiProperty({ name: 'fileName', type: String, description: '文件名称'})
  fileName: string;

  @ApiProperty({ name: 'id', type: String, description: '文件id'  })
  id: string;

  @ApiProperty({ name: 'previewUrl', type: String, description: '预览地址'  })
  previewUrl: string;

  @ApiProperty({ name: 'downLoadUrl', type: String, description: '下载地址'  })
  downLoadUrl: string;

  @ApiProperty({ name: 'category', type: String, description: '文件分类'  })
  category: string;

  @ApiProperty({ name: 'createTime', type: String, description: '创建时间'  })
  createTime: string;

  @ApiProperty({ name: 'updateTime', type: String, description: '更新时间'  })
  updateTime: string;
}

export class ResFileListDto {
  @ApiProperty({
    description: '总条数',
    type: 'string',
  })
  total: number;
  @ApiProperty({
    description: '列表',
    type: () => [ResFileDto],
  })
  records: ResFileDto[];
}
