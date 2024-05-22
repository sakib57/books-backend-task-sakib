import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { UserRoles } from 'common/constant';

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
  @IsEnum(UserRoles)
  role: string;
}
