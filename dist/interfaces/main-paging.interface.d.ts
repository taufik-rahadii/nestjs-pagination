import { OrderDirection } from '../enums/order-direction.enum';
export interface IMainPaging {
    page: number;
    size: number;
    search: string;
    sort: string;
    order: OrderDirection;
}
