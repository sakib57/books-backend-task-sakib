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

  @Field({ nullable: true })
  @Prop()
  firstName: string;

  @Field({ nullable: true })
  @Prop()
  lastName: string;

  @Field()
  @Prop()
  password: string;

  @Field({ nullable: true })
  @Prop({ default: UserRoles.USER })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
