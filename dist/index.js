"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDirection = exports.MainPagingDTO = exports.PaginationService = void 0;
var pagination_service_1 = require("./pagination.service");
Object.defineProperty(exports, "PaginationService", { enumerable: true, get: function () { return pagination_service_1.PaginationService; } });
var main_paging_dto_1 = require("./dto/main-paging.dto");
Object.defineProperty(exports, "MainPagingDTO", { enumerable: true, get: function () { return main_paging_dto_1.MainPagingDTO; } });
var order_direction_enum_1 = require("./enums/order-direction.enum");
Object.defineProperty(exports, "OrderDirection", { enumerable: true, get: function () { return order_direction_enum_1.OrderDirection; } });
