import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  const port = config.get('PORT') || 3000;
  await app.listen(port, () => {
    console.info(`server partito nella ${port}`);
  });
}

bootstrap();
