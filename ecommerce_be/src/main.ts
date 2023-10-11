import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configure app settings
  app.enableCors({ origin: [/http:\/\/localhost:\d+/], credentials: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  const publicPath = configService.get('PUBLIC_PATH');
  app.useStaticAssets(publicPath);
  const port = configService.get('PORT');
  await app.listen(port);
}
bootstrap();
