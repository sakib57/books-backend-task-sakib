import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/user.entity';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: any): Promise<UserDocument | null> {
    return this.userService.findByEmail(payload.email);
  }

  async login(authDTO: AuthDTO) {
    const email = authDTO.email.toLocaleLowerCase();
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Authentication failed. User not found');
    }

    const isPasswordValid = bcrypt.compareSync(authDTO.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { _id: user._id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    return {
      expiresIn: 7 * 24 * 60 * 60 * 1000,
      token: accessToken,
      user: payload,
      status: HttpStatus.OK,
    };
  }
}
