import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from 'common/constant';

@InputType()
export class UserDTO implements Readonly<UserDTO> {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(60)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/) //Minimum four characters, at least one letter and one number
  password: string;

  @Field()
  @IsString()
  @IsEnum(UserRoles)
  role: string;
}
