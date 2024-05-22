import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreSchema } from './genre.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Genre', schema: GenreSchema }]),
  ],
  providers: [GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
