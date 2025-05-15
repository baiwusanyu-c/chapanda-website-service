import { ApiProperty } from '@nestjs/swagger';

export class UploadUrlDto {
  @ApiProperty({
    name: 'uploadUrl',
    type: String,
    description: '临时的文件上传地址',
  })
  uploadUrl: string;
}
