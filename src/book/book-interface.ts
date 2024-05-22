import { IAuthor } from 'src/author/author-interface';

export interface IBook {
  readonly _id?: string;
  readonly title: string;
  readonly author: IAuthor;
  readonly genres: [string];
  readonly publishedDate: number;
  readonly summary: string;
}
