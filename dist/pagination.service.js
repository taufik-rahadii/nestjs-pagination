"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = void 0;
const typeorm_1 = require("typeorm");
class PaginationService {
    buildPaginationQuery(queryParams, allowedSearch, whereType) {
        const { page, size, search } = queryParams;
        const skip = page > 1 ? page * size - size : 0;
        const take = size && size > 1 ? size : 10;
        const sort = this.parseSortAndOrder(queryParams);
        const where = whereType === 'repository'
            ? this.whereUsingRepository(search, allowedSearch)
            : this.whereUsingQueryBuilder(search, allowedSearch);
        return {
            skip,
            sort,
            take,
            where,
        };
    }
    buildPaginationResponse(dto, total) {
        return {
            page: Number(dto.page),
            size: Number(dto.size),
            total,
        };
    }
    whereUsingRepository(search, allowedSearch) {
        const where = [];
        if (search.length > 0)
            where.push(...allowedSearch.map((column) => {
                const obj = {
                    [column]: (0, typeorm_1.ILike)(`%${search}%`),
                };
                return obj;
            }));
        return where;
    }
    whereUsingQueryBuilder(search, columns) {
        if (search.length < 1)
            return [];
        const whereQuery = columns.map((column) => {
            const searchString = `${column} ilike :q`;
            const searchCriteria = `%${search}%`;
            return { searchString, searchCriteria };
        });
        return whereQuery;
    }
    parseSortAndOrder({ sort, order }) {
        return {
            [sort]: order,
        };
    }
}
exports.PaginationService = PaginationService;
