import { Test, TestingModule } from '@nestjs/testing';
import { PaginationService } from '../lib';
import { OrderDirection } from '../lib';

interface EntityExample {
  id: string;
  fullname: string;
  email: string;
  phone: string;
}

describe('PaginationService', () => {
  let service: PaginationService<EntityExample>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaginationService],
    }).compile();

    service = module.get<PaginationService<EntityExample>>(PaginationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buildPaginationService', () => {
    it('should returns processed pagination object with repository where type', () => {
      const paginationQuery = service.buildPaginationQuery(
        {
          page: 1,
          search: 'test',
          size: 10,
          order: OrderDirection.DESC,
          sort: 'id',
        },
        ['email', 'fullname'],
        'repository'
      );

      expect(paginationQuery.skip).toEqual(0);
      expect(paginationQuery.take).toEqual(10);
      expect(paginationQuery.where).not.toBeNull();
      expect(paginationQuery.sort).toMatchObject({
        id: OrderDirection.DESC,
      });
    });

    it('should return pagination object with query builder where type', () => {
      const paginationQuery = service.buildPaginationQuery(
        {
          page: 1,
          search: 'test',
          size: 10,
          order: OrderDirection.DESC,
          sort: 'id',
        },
        ['email', 'fullname'],
        'queryBuilder'
      );

      expect(paginationQuery.skip).toEqual(0);
      expect(paginationQuery.take).toEqual(10);
      expect(paginationQuery.sort).toMatchObject({
        id: OrderDirection.DESC,
      });
      expect(paginationQuery.where).toMatchObject([
        {
          searchString: 'email ilike :q',
          searchCriteria: `%${'test'}%`,
        },
        {
          searchString: 'fullname ilike :q',
          searchCriteria: `%${'test'}%`,
        },
      ]);
    });

    it('should return pagination object with null array where', () => {
      const paginationQuery = service.buildPaginationQuery(
        {
          page: 1,
          search: 'test',
          size: 10,
          order: OrderDirection.DESC,
          sort: 'id',
        },
        [],
        'repository'
      );

      expect(paginationQuery.skip).toEqual(0);
      expect(paginationQuery.take).toEqual(10);
      expect(paginationQuery.sort).toMatchObject({
        id: OrderDirection.DESC,
      });
      expect(paginationQuery.where).toMatchObject([]);
    });
  });
});
