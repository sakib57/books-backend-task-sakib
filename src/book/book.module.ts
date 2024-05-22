import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookResolver } from './book.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  providers: [BookResolver, BookService],
  controllers: [BookController],
})
export class BookModule {}
