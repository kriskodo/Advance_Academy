import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  IComment,
  IRating,
  IMovieEntity,
  IMovieEntityResponse,
} from './entities/movie.entity';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getAllMovies(): IMovieEntityResponse[] {
    return this.movieService.getAll();
  }

  @Get('/:movieId')
  getMovieById(@Param('movieId') movieId: string): IMovieEntityResponse {
    const movie = this.movieService.getById(movieId);

    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
    return movie;
  }

  @Post()
  createMovie(
    @Body() movie: Omit<IMovieEntity, 'id' | 'comments' | 'ratings'>,
  ) {
    if (
      !movie.description ||
      !movie.posterUrl ||
      !movie.title ||
      !movie.youtubeId
    ) {
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST);
    }

    return this.movieService.createMovie(movie);
  }

  @Put('/:movieId')
  editMovie(
    @Param('movieId') movieId: string,
    @Body() movie: Omit<IMovieEntity, 'id' | 'ratings' | 'comments'>,
  ): IMovieEntityResponse {
    if (
      !movie.description ||
      !movie.posterUrl ||
      !movie.title ||
      !movie.youtubeId
    ) {
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST);
    }
    const { title, description, posterUrl, youtubeId } = movie;

    return this.movieService.editMovie(movieId, {
      title,
      description,
      posterUrl,
      youtubeId,
    });
  }

  @Delete('/:movieId')
  deleteMovie(@Param('movieId') movieId: string): void {
    return this.movieService.deleteMovie(movieId);
  }

  @Post('/:movieId/rate')
  rateMovie(
    @Param('movieId') movieId: string,
    @Body() ratingBody: Record<'rating', IRating>,
  ): number {
    if (ratingBody.rating < 1 || ratingBody.rating > 5) {
      throw new HttpException(
        'Rating must be between 1 and 5',
        HttpStatus.BAD_REQUEST,
      );
    }

    const rating = this.movieService.rateMovie(movieId, ratingBody.rating);

    if (!rating) {
      throw new HttpException('Movie not found', HttpStatus.BAD_REQUEST);
    }

    return rating;
  }

  @Post('/:movieId/comment')
  commentMovie(
    @Param('movieId') movieId: string,
    @Body() commentBody: Pick<IComment, 'author' | 'content'>,
  ): IComment {
    if (!commentBody.author || !commentBody.content) {
      throw new HttpException('Invalid body', HttpStatus.BAD_REQUEST);
    }

    const comment = this.movieService.commentMovie(movieId, commentBody);

    if (!comment) {
      throw new HttpException('Movie not found', HttpStatus.BAD_REQUEST);
    }

    return comment;
  }
}
