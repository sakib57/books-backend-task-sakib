import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

const DATABASE_URL = process.env.DATABASE_URL;
@Module({
  imports: [MongooseModule.forRoot(DATABASE_URL), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
