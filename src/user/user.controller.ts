import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto';
import { IUser } from './user.interface';

/**
 * User Controller
 */
@ApiTags('User')
@ApiResponse({
  status: HttpStatus.METHOD_NOT_ALLOWED,
  description: 'Method not allowed',
})
@ApiResponse({
  status: HttpStatus.INTERNAL_SERVER_ERROR,
  description: 'Server Error!',
})
@Controller('users')
export class UserController {
  /**
   * Constructor
   * @param {UsersService} usersService
   */
  constructor(private readonly usersService: UserService) {}

  /**
   * Create a user
   * @Body {CreateUserDTO} createUserDTO
   * @returns {Promise<IUser>} created user data
   */
  @ApiOperation({ summary: 'User registration: create new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Return new user.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_ACCEPTABLE,
    description: 'Record already exist',
  })
  @Post('register')
  public async register(@Body() createUserDTO: CreateUserDTO): Promise<IUser> {
    try {
      return await this.usersService.create(createUserDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
