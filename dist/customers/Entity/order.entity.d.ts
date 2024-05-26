import { CustomerEntity } from './customer.entity';
import { ProductEntity } from './product.entity';
export declare class OrderEntity {
    order_id: number;
    customer: CustomerEntity;
    products: ProductEntity[];
    total_price: number;
    order_date: Date;
}
