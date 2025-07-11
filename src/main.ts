import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_LOGGER_TOKEN } from './logger/logger.module';
import { I18nValidationPipe } from 'nestjs-i18n';
import { UnifiedExceptionFilter } from './unified-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // TODO: 放开跨域 或 app.enableCors()
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_CONFIG.app_port') || 3000;

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

  // i18n 校验验证
  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(new UnifiedExceptionFilter());

  // 将 Nest 默认的日志记录器替换为你指定的日志器
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));

  await app.listen(port);
}
bootstrap();
