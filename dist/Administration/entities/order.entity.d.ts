import { CustomerEntity } from './customer.entity';
import { ProductEntity } from './product.entity';
export declare class OrderEntity {
    id: number;
    customer: CustomerEntity;
    products: ProductEntity[];
    totalAmount: number;
    productList: {
        productName: string;
        quantity: number;
    }[];
}
