import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';
import { AuthorService } from './author.service';
import { CreateAuthorDTO } from './dto';
import { IAuthor } from './author-interface';
import { UserRoles } from 'common/constant';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';

/**
 * Author Controller
 */
@ApiTags('Author')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('author')
export class AuthorController {
  /**
   * Constructor
   * @param {AuthorService} authorService
   */
  constructor(private readonly authorService: AuthorService) {}

  /**
   * Create Author
   * @param {CreateAuthorDTO} cAuthorDTO
   * @returns {Promise<IAuthor>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Author Create' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new Author.',
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
  public async create(@Body() cAuthorDTO: CreateAuthorDTO): Promise<IAuthor> {
    try {
      return await this.authorService.create(cAuthorDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Author List
   * @returns {Promise<IGenre[]>}
   */
  @ApiOperation({ summary: 'Author List' })
  @Get()
  public async findAll(): Promise<IAuthor[]> {
    try {
      return this.authorService.findAll();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
