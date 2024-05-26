import { Category } from './category.entity';
import { CartEntity } from './cart.entity';
import { OrderEntity } from './order.entity';
export declare class ProductEntity {
    product_id: number;
    product_name: string;
    description: string;
    price: number;
    category: Category;
    order: OrderEntity;
    carts: CartEntity[];
}
