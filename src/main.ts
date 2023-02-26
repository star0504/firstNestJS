import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ValidationPipe : 유효성 검사
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // decorator가 없으면 제거함
      forbidNonWhitelisted: true, // whiterlist에 없으면 error
      transform: true, // 타입을 받아서 우리가 원하는 타입으로 변경해줌.
      // 예를 들어 req로 들어오는 값은 string인데 우리가 type을 number로 지정하면 알아서 number로 변환해줌.
    }),
  );
  await app.listen(3000);
}
bootstrap();
