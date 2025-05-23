import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // app.enableCors({
  //   origin: [
  //     `http://localhost:${process.env.PORT}`,
  //     'https://task-pubsilon-frontend.vercel.app',
  //   ],
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  //   credentials: true,
  // });
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
