import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  email: string;

  @Field({ nullable: true })
  @IsString()
  @ApiProperty()
  firstName: string;

  @Field({ nullable: true })
  @IsString()
  @ApiProperty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(60)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/) //Minimum four characters, at least one letter and one number
  password: string;

  @Field({ nullable: true })
  @IsString()
  @IsEnum(UserRoles)
  @ApiProperty({
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: string;
}
