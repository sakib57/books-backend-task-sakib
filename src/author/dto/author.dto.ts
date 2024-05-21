import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class UserDTO implements Readonly<UserDTO> {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  bio: string;
}
