import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Proyect Salud API')
    .setDescription('Proyect Salud API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    }
  });




  await app.listen(process.env.PORT);
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
  console.log(`📚 Api Doc http://localhost:${process.env.PORT}/api/docs`);
}
bootstrap();
