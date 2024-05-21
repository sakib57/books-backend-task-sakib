import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserDTO implements Readonly<CreateUserDTO> {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(60)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/) //Minimum four characters, at least one letter and one number
  password: string;
}
