import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
    exposedHeaders: 'X-Book-KEY,X-BOOK-KEY-EXPIRES',
  };

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Book Api')
      .setDescription('API for store update and get book data.')
      .setVersion('1.0')
      .addTag('book')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  app.use(cookieParser());
  app.enableCors(options);
  await app.listen(PORT);
  Logger.log(`Server running at http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
