import { DynamicModule, Global, Module } from '@nestjs/common';
import * as Minio from 'minio';

export const MINIO_CLIENT = 'MINIO_CLIENT';
export interface MinioModuleOptions {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
}

@Global()
@Module({})
export class MinioModule {
  static register(options: MinioModuleOptions): DynamicModule {
    return {
      module: MinioModule,
      providers: [
        {
          provide: MINIO_CLIENT,
          useFactory() {
            return new Minio.Client(options);
          },
        },
      ],
      exports: [MINIO_CLIENT],
    };
  }
}
