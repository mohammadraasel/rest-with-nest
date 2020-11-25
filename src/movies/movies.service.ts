import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create.movie.dto';
import { UpdateMovieDTO } from './dto/update.movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`Movie does not exist with ID ${id}.`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }

  updateOne(id: number, movieData: UpdateMovieDTO) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...movieData });
    return { ...movie, ...movieData };
  }

  create(movieData: CreateMovieDTO) {
    const id = this.movies.length + 1;
    this.movies.push({ id, ...movieData });
    return { id, ...movieData };
  }
}
