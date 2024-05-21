import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenreDocument = Genre & Document;

@ObjectType()
@Schema()
export class Genre {
  @Field()
  @Prop({ required: true })
  name: string;
}

export const GenrerSchema = SchemaFactory.createForClass(Genre);
