import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'test movie',
        year: 2020,
        genres: ['test'],
      });
      const result = service.getOne(1);
      expect(result).toBeDefined();
      expect(result.title).toEqual('test movie');
    });
    it('should throw not found exception.', () => {
      try {
        service.getOne(1000);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('should remove a movie', () => {
      service.create({
        title: 'test movie',
        year: 2020,
        genres: ['test'],
      });
      service.deleteOne(1);
      expect(service.getAll().length).toEqual(0);
    });
    it('should throw not found exception.', () => {
      try {
        service.deleteOne(1000);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
