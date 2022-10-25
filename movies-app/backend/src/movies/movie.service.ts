import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { randomUUID } from 'crypto';
import movies from 'mock/movies';
import {
  IComment,
  IMovieEntity,
  IMovieEntityResponse,
} from './entities/movie.entity';

@Injectable()
export class MovieService implements OnModuleInit {
  constructor(private movieSeederService: InMemoryDBService<IMovieEntity>) {}

  transformToResponseEntity(movieEntity: IMovieEntity): IMovieEntityResponse {
    const { ratings, ...restMovieEntity } = movieEntity;
    return {
      ...restMovieEntity,
      rating: ratings.reduce((p, c) => p + c, 0) / ratings.length || 0,
    };
  }

  onModuleInit() {
    this.movieSeederService.createMany(movies);
  }

  getAll(): IMovieEntityResponse[] {
    return this.movieSeederService.getAll().map(this.transformToResponseEntity);
  }

  getById(movieId: string): IMovieEntityResponse | null {
    const movie = this.movieSeederService.get(movieId);
    if (!movie) {
      return null;
    }
    return this.transformToResponseEntity(movie);
  }

  createMovie(
    newMovie: Omit<IMovieEntity, 'id' | 'comments' | 'ratings'>,
  ): IMovieEntityResponse {
    return this.transformToResponseEntity(
      this.movieSeederService.create({
        id: randomUUID(),
        comments: [],
        ratings: [],
        ...newMovie,
      }),
    );
  }

  editMovie(
    movieId: string,
    updatedMovie: Omit<IMovieEntity, 'id' | 'ratings' | 'comments'>,
  ): IMovieEntityResponse {
    const movie = this.movieSeederService.get(movieId);

    this.movieSeederService.update({ ...movie, ...updatedMovie });

    return this.transformToResponseEntity(this.movieSeederService.get(movieId));
  }

  deleteMovie(movieId: string): void {
    return this.movieSeederService.delete(movieId);
  }

  rateMovie(
    movieId: string,
    rating: IMovieEntity['ratings'][0],
  ): number | null {
    const movie = this.movieSeederService.get(movieId);

    if (!movie) {
      return null;
    }

    this.movieSeederService.update({
      ...movie,
      ratings: movie.ratings.concat(rating),
    });

    return this.transformToResponseEntity(this.movieSeederService.get(movieId))
      .rating;
  }

  commentMovie(
    movieId: string,
    commentBody: Pick<IComment, 'author' | 'content'>,
  ): IComment | null {
    const movie = this.movieSeederService.get(movieId);

    if (!movie) {
      return null;
    }

    const comment: IComment = {
      ...commentBody,
      id: randomUUID(),
      date: new Date().toISOString(),
    };

    this.movieSeederService.update({
      ...movie,
      comments: movie.comments.concat(comment),
    });

    return comment;
  }
}
