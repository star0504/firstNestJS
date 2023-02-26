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
import { Movie } from './entities/movie.entity';
import { MovieService } from './movie.service';
import createMovieDto from './dto/create-movie.dto';
import updateMovieDto from './dto/update-movie.dto';

@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  @Get('/search')
  search(@Query('Year') searchingYear: string) {
    return `search movie made after : ${searchingYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Movie {
    return this.movieService.getOne(id);
  }

  @Post()
  create(@Body() movieData: createMovieDto) {
    console.log(movieData);
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  delete(@Param('id') movieId: number) {
    return this.movieService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: updateMovieDto) {
    this.movieService.update(movieId, updateData);
  }
}
