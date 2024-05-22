import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';
import { CreateGenreDTO } from './dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from 'common/constant';

@Resolver(() => Genre)
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  //   Genre Creation
  @Roles(UserRoles.ADMIN, UserRoles.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation(() => Genre)
  createGenre(@Args('cGenreDTO') cGenreDTO: CreateGenreDTO) {
    return this.genreService.create(cGenreDTO);
  }

  //   Genre List
  @Query(() => [Genre], { name: 'genres' })
  findAll() {
    return this.genreService.findAll();
  }
}
