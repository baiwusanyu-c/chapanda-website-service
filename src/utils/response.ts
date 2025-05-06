import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export const StatusCode = {
  OK: 200,
  UnknownError: 500,
};

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

export function genResContent<T>(dto?: T) {
  return {
    'application/json': {
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
              data: { $ref: getSchemaPath(dto as Function) },
            },
          },
        ],
      },
    },
  };
}

export class ApiResponseDto<T> {
  @ApiProperty({
    description: '响应数据',
    nullable: true,
  })
  data?: T;
  @ApiProperty({
    enum: StatusCode,
    enumName: 'Code',
    example: StatusCode.OK,
    description: '响应状态码',
    type: 'number', // 明确指定类型
  })
  code: number;
  @ApiProperty({
    description: '响应描述',
    nullable: true,
    type: 'string',
  })
  message?: string;
}
