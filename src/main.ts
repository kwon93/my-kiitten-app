import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MyKiittenExceptionFilter } from './exception/my-kiitten-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new MyKiittenExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http:localhost:3030'],
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();
