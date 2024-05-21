import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { userType } from 'common/constant';

@InputType()
export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName: string;

  @Field()
  @IsString()
  @IsEnum(userType)
  role: string;
}
