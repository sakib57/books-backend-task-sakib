import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from 'common/constant';
import { Author } from './author.entity';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './dto';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  //   Genre Creation
  @Roles(UserRoles.ADMIN, UserRoles.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Author)
  createAuthor(@Args('cAuthorDTO') cAuthorDTO: CreateAuthorDTO) {
    return this.authorService.create(cAuthorDTO);
  }

  //   Genre List
  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorService.findAll();
  }
}
