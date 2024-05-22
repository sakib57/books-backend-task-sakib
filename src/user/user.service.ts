import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './user.entity';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './dto';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  // User Creation
  async create(cUserDTO: CreateUserDTO): Promise<IUser> {
    try {
      const userDTO = new UserDTO();
      userDTO.email = cUserDTO.email.toLocaleLowerCase();
      const isUserExist = await this.findByEmail(userDTO.email);
      if (isUserExist) {
        return Promise.reject(
          new NotAcceptableException(
            `User already exist with the ${userDTO.email}`,
          ),
        );
      }
      userDTO.password = bcrypt.hashSync(cUserDTO.password, 8);
      const registerModel = new this.userModel(userDTO);
      const newUser = await registerModel.save();

      return {
        email: newUser?.email,
      };
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  // Find all
  async findAll() {
    return await this.userModel.find();
  }

  // Find user by email
  async findByEmail(email: string) {
    return await this.userModel.findOne({
      email: email,
    });
  }

  // Find User
  async findOne(id: string) {
    return await this.userModel.findOne({
      _id: id,
    });
  }

  // User Updation
  async update(id: string, uUserDTO: UpdateUserDTO) {
    try {
      const user = await this.findOne(id);
      if (!user) {
        return Promise.reject(new NotFoundException('User not found'));
      }
      const userDTO = new UserDTO();
      userDTO.firstName = uUserDTO.firstName;
      userDTO.lastName = uUserDTO.lastName;
      userDTO.role = JSON.stringify(uUserDTO.role);
      const setUser = { ...uUserDTO, ...userDTO };
      return await user.set(setUser).save();
    } catch (error) {
      throw new HttpException(error, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number) {
    return `This action removes a #${id} user`;
  }
}
