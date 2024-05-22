import {
  Controller,
  Post,
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
import { GenreService } from './genre.service';
import { CreateGenreDTO } from './dto';
import { IGenre } from './genre.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

/**
 * Genre Controller
 */
@ApiTags('Genre')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('genre')
export class GenreController {
  /**
   * Constructor
   * @param {GenreService} genreService
   */
  constructor(private readonly genreService: GenreService) {}

  /**
   * Create Genre
   * @param {CreateGenreDTO} cGenreDTO
   * @returns {Promise<IGenre>}
   */
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer Token',
  })
  @ApiOperation({ summary: 'Genre Create' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new genre.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Record already exist',
  })
  @UseGuards(JwtAuthGuard)
  @Post('add')
  public async create(@Body() cGenreDTO: CreateGenreDTO): Promise<IGenre> {
    try {
      return await this.genreService.create(cGenreDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
