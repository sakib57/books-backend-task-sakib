import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
