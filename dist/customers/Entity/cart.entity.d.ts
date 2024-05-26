import { ProductEntity } from './product.entity';
import { CustomerEntity } from './customer.entity';
export declare class CartEntity {
    cart_id: number;
    customer: CustomerEntity;
    products: ProductEntity[];
}
