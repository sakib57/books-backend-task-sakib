import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNumber, IsString } from 'class-validator';

@InputType()
export class BookDTO implements Readonly<BookDTO> {
  @Field()
  @IsString()
  @ApiProperty()
  title: string;

  @Field()
  @IsString()
  @IsMongoId()
  @ApiProperty()
  author: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @ApiProperty()
  genres: [string];

  @Field()
  @ApiProperty()
  @IsNumber()
  publishedDate: number;

  @Field({ nullable: true })
  @IsString()
  @ApiProperty()
  summary: string;
}
