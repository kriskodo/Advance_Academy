import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [InMemoryDBModule.forFeature('movie')],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
