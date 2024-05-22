import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBookDTO implements Readonly<CreateBookDTO> {
  @Field()
  @IsString()
  @ApiProperty()
  title: string;

  @Field()
  @IsString()
  @IsMongoId()
  @ApiProperty()
  author: string;

  @Field()
  @IsArray()
  @ApiProperty()
  genres: [string];

  @Field()
  @ApiProperty()
  @IsNumber()
  publishedDate: number;

  @Field()
  @IsString()
  @ApiProperty()
  summary: string;
}
