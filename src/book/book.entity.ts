import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema()
export class Book extends Document {
  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ type: Types.ObjectId, ref: 'Author', required: true })
  author: string;

  @Field()
  @Prop({ type: [String], default: [] })
  genres: string[];

  @Field()
  @Prop()
  publishedDate: Date;

  @Field()
  @Prop()
  summary: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
