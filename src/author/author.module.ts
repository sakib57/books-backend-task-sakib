import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from './author.entity';
import { AuthorResolver } from './author.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  providers: [AuthorResolver, AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
