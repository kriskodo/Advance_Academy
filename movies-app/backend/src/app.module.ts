import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { MovieModule } from './movies/movie.module';

@Module({
  imports: [
    InMemoryDBModule.forRoot(),
    ConfigModule.forRoot({ load: [configuration] }),
    MovieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
