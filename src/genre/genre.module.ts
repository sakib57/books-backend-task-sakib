import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreSchema } from './genre.entity';
import { GenreResolver } from './genre.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Genre', schema: GenreSchema }]),
  ],
  providers: [GenreResolver, GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
