import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function createOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Geteilte Geldbörse')
    .setDescription('API für die Geteilte Geldbörse')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT Token',
      in: 'Header',
    })
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
}
