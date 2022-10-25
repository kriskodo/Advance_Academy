import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export type IRating = 1 | 2 | 3 | 4 | 5;

export interface IComment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface IMovieEntity extends InMemoryDBEntity {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  youtubeId: string;
  ratings: IRating[];
  comments: IComment[];
}

export interface IMovieEntityResponse extends Omit<IMovieEntity, 'ratings'> {
  rating: number;
}
