import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be 4', () => {
    expect(2 + 2).toEqual(4);
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      //result가 배열인지 확인
      expect(result).toBeInstanceOf(Array);
    });

    describe('getOne', () => {
      it('should return a movie', () => {
        service.create({
          title: 'Test Movie',
          year: 2000,
          genres: ['test'],
        });
        const movie = service.getOne(1);
        expect(movie).toBeDefined();
        expect(movie.id).toEqual(1);
      });
      it('should throw 404 error', () => {
        try {
          service.getOne(999);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect(e.message).toEqual('Movie with ID 999 not found.');
        }
      });
    });
  });
});
