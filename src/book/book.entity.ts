import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Author } from 'src/author/author.entity';

@ObjectType()
@Schema()
export class Book extends Document {
  @Field()
  @Prop({ required: true })
  title: string;

  @Field(() => Author)
  @Prop({ type: Types.ObjectId, ref: 'Author', required: true })
  author: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  genres: string[];

  @Field()
  @Prop()
  publishedDate: number;

  @Field({ nullable: true })
  @Prop()
  summary: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
