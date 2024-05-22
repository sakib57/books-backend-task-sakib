import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRoles } from 'common/constant';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field()
  @Prop()
  firstName: string;

  @Field()
  @Prop()
  lastName: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field()
  @Prop({ default: UserRoles.USER })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
