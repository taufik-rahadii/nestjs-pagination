import { ILike } from 'typeorm';
import { MainPagingDTO } from './dto/main-paging.dto';
import { IPaginationQuery } from './interfaces/pagination-query.interface';
import { WhereUsingQueryBuilder } from './types/where-query-builder';
import { WhereUsingRepository } from './types/where-repository';

export class PaginationService<T = {}> {
  public buildPaginationQuery(
    queryParams: MainPagingDTO,
    allowedSearch?: (keyof T)[],
    whereType?: 'repository' | 'queryBuilder'
  ): IPaginationQuery<T> {
    const { page, size, search } = queryParams;

    const skip = page > 1 ? page * size - size : 0;
    const take = size && size > 1 ? size : 10;
    const sort = this.parseSortAndOrder(queryParams);
    const where: WhereUsingQueryBuilder | WhereUsingRepository<T> =
      whereType === 'repository'
        ? this.whereUsingRepository(search, allowedSearch)
        : this.whereUsingQueryBuilder(search, allowedSearch);

    return {
      skip,
      sort,
      take,
      where,
    };
  }

  public buildPaginationResponse(dto: MainPagingDTO, total: number) {
    return {
      page: Number(dto.page),
      size: Number(dto.size),
      total,
    };
  }

  private whereUsingRepository(
    search: string,
    allowedSearch?: (keyof T)[]
  ): WhereUsingRepository<T> {
    const where = [];

    if (search.length > 0)
      where.push(
        ...allowedSearch.map((column) => {
          const obj = {
            [column]: ILike(`%${search}%`),
          };

          return obj;
        })
      );

    return where;
  }

  private whereUsingQueryBuilder(
    search: string,
    columns: (keyof T)[]
  ): WhereUsingQueryBuilder {
    if (search.length < 1) return [];
    const whereQuery = columns.map((column) => {
      const searchString = `${column as string} ilike :q`;
      const searchCriteria = `%${search}%`;

      return { searchString, searchCriteria };
    });

    return whereQuery;
  }

  private parseSortAndOrder({ sort, order }: MainPagingDTO) {
    return {
      [sort]: order,
    };
  }
}
