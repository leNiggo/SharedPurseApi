import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createOpenApi } from './openApi';
import { ValidationPipe } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { readFileSync } from 'fs';

const httpsOptions: HttpsOptions = {
  key: process.env.PRIVATE_KEY_PATH
    ? readFileSync(process.env.PRIVATE_KEY_PATH)
    : null,
  cert: process.env.PUBLIC_CERT_PATH
    ? readFileSync(process.env.PUBLIC_CERT_PATH)
    : null,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions:
      process.env.PRIVATE_KEY_PATH && process.env.PUBLIC_CERT_PATH
        ? httpsOptions
        : undefined,
  });

  createOpenApi(app);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
