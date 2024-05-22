import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpStatus,
  HttpException,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';
import { CreateBookDTO } from './dto';
import { IBook } from './Book-interface';
import { BookService } from './book.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRoles } from 'common/constant';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';

/**
 * Book Controller
 */
@ApiTags('Book')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('books')
export class BookController {
  /**
   * Constructor
   * @param {bookService} BookService
   */
  constructor(private readonly bookService: BookService) {}

  /**
   * Create Book
   * @param {CreateBookDTO} cBookDTO
   * @returns {Promise<IBook>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Book Create' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new Book.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Record already exist',
  })
  @Roles(UserRoles.ADMIN, UserRoles.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('add')
  public async create(@Body() cBookDTO: CreateBookDTO): Promise<IBook> {
    try {
      return await this.bookService.create(cBookDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Book List
   * @returns {Promise<IBook[]>}
   */
  @ApiOperation({ summary: 'Book List' })
  @Get()
  public async findAll(): Promise<IBook[]> {
    try {
      return this.bookService.findAll();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Single Book
   * @returns {Promise<IBook>}
   */
  @ApiOperation({ summary: 'Single Book' })
  @Get(':id')
  public async findOne(@Param('id') id): Promise<IBook> {
    try {
      return this.bookService.findOne(id);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
