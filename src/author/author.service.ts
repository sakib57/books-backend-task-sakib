import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IAuthor } from './author-interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthorDTO, CreateAuthorDTO } from './dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel('Author')
    private readonly authorModel: Model<IAuthor>,
  ) {}

  /**
   * Create Author
   * @param {CreateAuthorDTO} cAuthorDTO
   * @returns {Promise<IAuthor>}
   */
  async create(cAuthorDTO: CreateAuthorDTO): Promise<IAuthor> {
    try {
      const genereDTO = new AuthorDTO();
      const setAuthor = { ...cAuthorDTO, ...genereDTO };
      const registerDoc = new this.authorModel(setAuthor);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update state
   * @param {UpdateAuthorDTO} uAuthorDTO
   * @returns {Promise<IAuthor>}
   */
  async update() {
    // This will update
  }
}
