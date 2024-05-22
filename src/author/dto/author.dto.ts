import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class AuthorDTO implements Readonly<AuthorDTO> {
  @Field()
  @IsString()
  @ApiProperty()
  name: string;

  @Field()
  @IsString()
  @ApiProperty()
  bio: string;
}
