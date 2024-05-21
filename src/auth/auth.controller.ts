import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

/**
 * Auth Controller
 */
@Controller('users')
export class AuthController {
  /**
   * Constructor
   * @param {AuthService} authService
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * User login with jwtToken
   * @Res res
   * @Body {AuthDTO} loginDto
   * @returns {Promise<any>}
   */
  @ApiTags('User')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'Return user information.',
  })
  @ApiResponse({
    status: HttpStatus.METHOD_NOT_ALLOWED,
    description: 'Method not allowed',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  @Post('login')
  public async login(@Res() res: any, @Body() loginDto: AuthDTO): Promise<any> {
    const authRes = await this.authService.login(loginDto);
    await res.cookie('token', authRes.token);
    return res
      .status(authRes.status)
      .set({
        'X-BOOK-KEY': authRes.token,
        'X-BOOK-KEY-EXPIRES': authRes.expiresIn,
      })
      .json(authRes);
  }
}
