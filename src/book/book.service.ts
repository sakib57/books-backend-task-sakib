import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IBook } from './book-interface';
import { BookDTO, CreateBookDTO } from './dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book')
    private readonly bookModel: Model<IBook>,
  ) {}

  /**
   * Create Book
   * @param {CreateBookDTO} cBookDTO
   * @returns {Promise<IBook>}
   */
  async create(cBookDTO: CreateBookDTO): Promise<IBook> {
    try {
      const genereDTO = new BookDTO();
      const setBook = { ...cBookDTO, ...genereDTO };
      const registerDoc = new this.bookModel(setBook);
      return registerDoc.save();
    } catch (err) {
      throw new HttpException(err, err.status || HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Book List
   * @returns {Promise<IBook[]>}
   */
  async findAll(): Promise<IBook[]> {
    return await this.bookModel.find().populate([{ path: 'author' }]);
  }

  /**
   * Single Book
   * @returns {Promise<IBook>}
   */
  async findOne(id: string): Promise<any> {
    if (!Types.ObjectId.isValid(id)) {
      return new BadRequestException('Invalid id');
    }

    const book = await this.bookModel
      .findOne({ _id: id })
      .populate([{ path: 'author' }]);
    if (!book) {
      return Promise.reject(new NotFoundException('Book not found'));
    }
    return book;
  }

  update() {
    // This function will update the Book
  }

  remove() {
    // This function will Delete the Book
  }
}
