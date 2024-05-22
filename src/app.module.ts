import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { GenreModule } from './genre/genre.module';
import 'dotenv/config';

const DATABASE_URL = process.env.DATABASE_URL;
@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URL),
    UserModule,
    AuthModule,
    AuthorModule,
    BookModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
