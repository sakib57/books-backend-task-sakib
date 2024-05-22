import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGqlAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from 'common/constant';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO, UpdateUserDTO } from 'src/user/dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // Book Creation
  @Roles(UserRoles.ADMIN, UserRoles.EDITOR)
  @UseGuards(JwtGqlAuthGuard, RolesGuard)
  @Mutation(() => User)
  register(@Args('createUserDTO') createUserDTO: CreateUserDTO) {
    return this.userService.create(createUserDTO);
  }

  // User List
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtGqlAuthGuard, RolesGuard)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  // User Update
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtGqlAuthGuard, RolesGuard)
  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('uUserDTO') uUserDTO: UpdateUserDTO,
  ) {
    return this.userService.update(id, uUserDTO);
  }
}
