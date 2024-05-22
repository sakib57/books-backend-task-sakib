import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // User Login
  @Mutation(() => User)
  login(@Args('authDTO') authDTO: AuthDTO) {
    return this.authService.login(authDTO);
  }

  // User List
  @Query(() => [User], { name: 'no_users' })
  findAll() {
    return [];
  }
}
