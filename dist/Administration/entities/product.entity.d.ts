import { CategoryEntity } from './category.entity';
import { OrderEntity } from './order.entity';
export declare class ProductEntity {
    id: number;
    name: string;
    purprice: number;
    sellprice: number;
    qty: number;
    ctg: string;
    category: CategoryEntity;
    orders: OrderEntity[];
}
