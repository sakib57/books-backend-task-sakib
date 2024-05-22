import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@ObjectType()
@Schema()
export class Author {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  bio: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

AuthorSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author',
});
