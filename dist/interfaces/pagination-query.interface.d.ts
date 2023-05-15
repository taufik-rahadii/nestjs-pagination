import { WhereUsingQueryBuilder } from '../types/where-query-builder';
import { WhereUsingRepository } from '../types/where-repository';
export interface IPaginationQuery<T> {
    skip: number;
    take: number;
    where: WhereUsingQueryBuilder | WhereUsingRepository<T>;
    sort: any;
}
