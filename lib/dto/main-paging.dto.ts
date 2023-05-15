import { OrderDirection } from "../enums/order-direction.enum";

export class MainPagingDTO {
  page: number;
  size: number;
  search: string;
  sort: string;
  order: OrderDirection;
}
