import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app_port') || 3000;

  // 集成 swagger，配置 builder
  const config = new DocumentBuilder()
    .setTitle('chapanda-website-service') // 项目名称 title
    .setDescription('chapanda website 后端接口文档') // 项目描述
    .setVersion('0.0.0') // 项目 api 版本
    .addTag('当前环境：' + process.env.APP_ENV!) // 项目 api 标签分类
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // 启动 swagger。 docs 是路由，同时也是 api json 前缀(localhost:8084/docs-json)
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
}
bootstrap();
