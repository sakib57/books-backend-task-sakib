import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGqlAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from 'common/constant';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  // Book Creation
  @Roles(UserRoles.ADMIN, UserRoles.EDITOR)
  @UseGuards(JwtGqlAuthGuard, RolesGuard)
  @Mutation(() => Book)
  createBook(@Args('cBookDTO') cBookDTO: CreateBookDTO) {
    return this.bookService.create(cBookDTO);
  }

  // Book List
  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.bookService.findAll();
  }

  // Find Book
  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.bookService.findOne(id);
  }
}
