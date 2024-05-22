import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserRoles } from 'common/constant';

@InputType()
export class UpdateUserDTO implements Readonly<UpdateUserDTO> {
  @Field({ nullable: true })
  @IsString()
  @ApiProperty()
  firstName: string;

  @Field({ nullable: true })
  @IsString()
  @ApiProperty()
  lastName: string;

  @Field({ nullable: true })
  @IsString()
  @IsEnum(UserRoles)
  @ApiProperty({
    enum: UserRoles,
    default: UserRoles.USER,
  })
  role: string;
}
