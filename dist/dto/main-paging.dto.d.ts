import { OrderDirection } from '../enums/order-direction.enum';
import { IMainPaging } from '../interfaces/main-paging.interface';
export declare class MainPagingDTO implements IMainPaging {
    page: number;
    size: number;
    search: string;
    sort: string;
    order: OrderDirection;
}
