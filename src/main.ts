import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  const options = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,traceparent,request-id,request-context,user-agent',
    exposedHeaders: 'X-TEST-KEY,X-TEST-KEY-EXPIRES',
  };

  app.use(cookieParser());
  app.enableCors(options);
  Logger.log(`Server running at http://localhost:${PORT}`, 'Bootstrap');
  await app.listen(PORT);
}
bootstrap();
