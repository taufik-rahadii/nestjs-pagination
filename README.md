# NestJS Pagination Service

![coverage-badge-statements](./coverage/badge-statements.svg)
![coverage-badge-functions](./coverage/badge-functions.svg)
![coverage-badge-functions](./coverage/badge-lines.svg)

<br />
This package contains a pagination utils for nestjs, you can inject PaginationService to use this package functionalities. 
<br />

## Prerequisities

    NestJS: v9.x.x
    typeorm: ^0.3.x

## How To Use

1. Inject PaginationService as a provider inside your IOC module.

   ```typescript
   // example.module.ts
   imports: [...],
   providers: [PaginationService],
   controllers: []
   ```

2. Then, use it as a dependency in your service or controller.

   ```typescript
   constructor(private readonly paginationService: PaginationService<Entity>) {}
   ```

3. Build your pagination properties from request query params using `buildPaginationQuery` method. Make sure your using MainPagingDTO as a types for your query params. Use second argument(allowedSearch) if you want to search from your request, and third argument with value `repository` or `queryBuilder` based on your service using an entity repository or a query builder.

   ```typescript
   @Get()
    public listProducts(@Query() queryParams: MainPagingDTO) {
      const paginationQuery: IPaginationQuery<Entity> = this.paginationService.buildPaginationQuery(
        queryParams,
        ['fullname,' 'email'], // keyof T
        'repository' // repository | queryBuilder
      )
    }
   ```

4. If you want to extend this MainPagingDTO, you can create your own DTO, but make sure your custom DTO is implementing IMainPaging interface.

5. Then, return pagination response using `buildPaginationResponse` method.
   ```typescript
   const paginationResponse = this.paginationService.buildPaginationResponse(
     queryParams,
     yourTableCount
   );
   ```
