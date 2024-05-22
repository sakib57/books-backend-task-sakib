import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGenre } from './genre.interface';
import { CreateGenreDTO, GenreDTO } from './dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectModel('Genre')
    private readonly genreModel: Model<IGenre>,
  ) {}
  /**
   * Create Genre
   * @param {CreateGenreDTO} cGenreDTO
   * @returns {Promise<IGenre>}
   */
  async create(cGenreDTO: CreateGenreDTO): Promise<IGenre> {
    try {
      const genereDTO = new GenreDTO();
      const setGenre = { ...cGenreDTO, ...genereDTO };
      const registerDoc = new this.genreModel(setGenre);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Genere List
   * @returns {Promise<IGenre[]>}
   */
  async findAll(): Promise<IGenre[]> {
    return await this.genreModel.find();
  }

  /**
   * Update state
   * @param {UpdateGenreDTO} uGenreDTO
   * @returns {Promise<IGenre>}
   */
  async update() {
    // This will update
  }
}
