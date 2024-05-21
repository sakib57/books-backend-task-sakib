import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class AuthDTO implements Readonly<AuthDTO> {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @Field()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(60)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/) //Minimum four characters, at least one letter and one number
  password: string;
}
