"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationService = void 0;
var typeorm_1 = require("typeorm");
var PaginationService = /** @class */ (function () {
    function PaginationService() {
    }
    PaginationService.prototype.buildPaginationQuery = function (queryParams, allowedSearch, whereType) {
        var page = queryParams.page, size = queryParams.size, search = queryParams.search;
        var skip = page > 1 ? page * size - size : 0;
        var take = size && size > 1 ? size : 10;
        var sort = this.parseSortAndOrder(queryParams);
        var where = whereType === 'repository'
            ? this.whereUsingRepository(search, allowedSearch)
            : this.whereUsingQueryBuilder(search, allowedSearch);
        return {
            skip: skip,
            sort: sort,
            take: take,
            where: where,
        };
    };
    PaginationService.prototype.buildPaginationResponse = function (dto, total) {
        return {
            page: Number(dto.page),
            size: Number(dto.size),
            total: total,
        };
    };
    PaginationService.prototype.whereUsingRepository = function (search, allowedSearch) {
        var where = [];
        if (search.length > 0)
            where.push.apply(where, allowedSearch.map(function (column) {
                var _a;
                var obj = (_a = {},
                    _a[column] = (0, typeorm_1.ILike)("%".concat(search, "%")),
                    _a);
                return obj;
            }));
        return where;
    };
    PaginationService.prototype.whereUsingQueryBuilder = function (search, columns) {
        if (!search || search.length < 1)
            return [];
        var whereQuery = columns.map(function (column) {
            var searchString = "".concat(column, " ilike :q");
            var searchCriteria = "%".concat(search, "%");
            return { searchString: searchString, searchCriteria: searchCriteria };
        });
        return whereQuery;
    };
    PaginationService.prototype.parseSortAndOrder = function (_a) {
        var _b;
        var sort = _a.sort, order = _a.order;
        return _b = {},
            _b[sort] = order,
            _b;
    };
    return PaginationService;
}());
exports.PaginationService = PaginationService;
