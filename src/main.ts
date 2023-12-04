import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createOpenApi } from './openApi';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  createOpenApi(app);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
