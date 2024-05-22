import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

@InputType()
export class GenreDTO implements Readonly<GenreDTO> {
  @Field()
  @IsString()
  @ApiProperty()
  name: string;
}
