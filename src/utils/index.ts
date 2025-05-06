import * as crypto from 'crypto';
import { getSchemaPath } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export function md5(str: string) {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

export const StatusCode = {
  OK: 200,
  UnknownError: 500,
}

export type StatusCodeType = (typeof StatusCode)[keyof typeof StatusCode];

export interface ChapandaResponse<T> {
  code: StatusCodeType;
  data: T;
}

export function genResponse<T>(code: StatusCodeType, response: T) {
  return {
    code,
    data: response,
  } as ChapandaResponse<T>;
}

export class ResponseDto<T = any> {
  @Type(() => Object) // 确保 class-transformer 正确序列化
  data: T;
  constructor(data: T) {
    this.data = data;
  }
}

export function genSchema(
  dto: any,
  code: StatusCodeType
) {
  return {
    allOf: [
      {
        properties: {
          data: { $ref: getSchemaPath(dto) },
          code: { $ref: getSchemaPath('200') },
        },
      },
    ],
  };
}
