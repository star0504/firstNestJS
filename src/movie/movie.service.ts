import { Injectable, NotFoundException } from '@nestjs/common';
import { error } from 'console';
import { Movie } from './entities/movie.entity';
import createMovieDto from './dto/create-movie.dto';
import updateMovieDto from './dto/update-movie.dto';
@Injectable()
export class MovieService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id); // movie => (movie.id === +id)
    if (!movie) throw new NotFoundException(`Movie with ID ${id} not found.`);
    return movie;
  }

  deleteOne(id: number) {
    this.getOne(id); // movie가 존재하는지 확인하기 위함.
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: createMovieDto) {
    this.movies.push({ id: this.movies.length + 1, ...movieData });
  }

  update(id: number, updateData: updateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    // 먼저 movie에 담긴 정보가 복사되고 이후 updateData가 덮어씌어짐.
    this.create({ ...movie, ...updateData });
  }
}
