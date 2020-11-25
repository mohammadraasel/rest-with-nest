import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create.movie.dto';
import { UpdateMovieDTO } from './dto/update.movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') releaseYear) {
    return `Your are searching movies that release after ${releaseYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number) {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.create(movieData);
  }

  @Patch('/:id')
  update(@Param('id') movieId: number, @Body() movieData: UpdateMovieDTO) {
    return this.moviesService.updateOne(movieId, movieData);
  }

  @Delete('/:id')
  delete(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }
}
