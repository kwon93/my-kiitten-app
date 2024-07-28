import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MyKiittenExceptionFilter } from './exception/my-kiitten-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new MyKiittenExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
