import { MainPagingDTO } from './dto/main-paging.dto';
import { IPaginationQuery } from './interfaces/pagination-query.interface';
export declare class PaginationService<T = {}> {
    buildPaginationQuery(queryParams: MainPagingDTO, allowedSearch?: (keyof T)[], whereType?: 'repository' | 'queryBuilder'): IPaginationQuery<T>;
    buildPaginationResponse(dto: MainPagingDTO, total: number): {
        page: number;
        size: number;
        total: number;
    };
    private whereUsingRepository;
    private whereUsingQueryBuilder;
    private parseSortAndOrder;
}
