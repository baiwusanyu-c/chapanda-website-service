import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

const ENV_PATH = path.join(process.cwd(), `./env/.env.${process.env.APP_ENV}`);
console.log(ENV_PATH);

@Module({
  imports: [
    // 配置环境变量
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [ENV_PATH],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
