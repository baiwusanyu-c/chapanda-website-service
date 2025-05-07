import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

export const StatusCode = {
  OK: 200,
  UnknownError: 500,
  BadRequest: 400,
};

export type StatusCodeType = (typeof StatusCode)[keyof typeof StatusCode];

export interface ChapandaResponse<T> {
  code: StatusCodeType;
  data: T | null;
  message?: string;
}

export function genResponse<T>(
  code: StatusCodeType,
  response: T,
  message: string,
) {
  return {
    code,
    data: response,
    message,
  } as ChapandaResponse<T>;
}

export function genResContent<T>(dto: T, isArray: boolean = false) {
  let schema = dto
    ? {
        nullable: true,
        $ref: getSchemaPath(dto as any),
      }
    : {
        nullable: true,
        type: 'null',
      };
  if (isArray) {
    schema = {
      type: 'array',
      // @ts-expect-error ignore items
      items: {
        $ref: getSchemaPath(dto as any),
      },
    };
  }
  return {
    'application/json': {
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseDto) },
          {
            properties: {
              data: schema,
            },
          },
        ],
      },
    },
  };
}

export class ApiResponseDto {
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
  message: string;
}
