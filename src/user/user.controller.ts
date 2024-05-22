import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { IUser } from './user.interface';
import { UserRoles } from 'common/constant';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';

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

  /**
   * Update a user
   * @Body {UpdateUserDTO} updateUserDTO
   * @returns {Promise<IUser>} updated user data
   */
  @ApiOperation({ summary: 'User updation: update a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return Updated user.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @Roles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  public async update(
    @Param('id') id: any,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<IUser> {
    try {
      return await this.usersService.update(id, updateUserDTO);
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }
}
