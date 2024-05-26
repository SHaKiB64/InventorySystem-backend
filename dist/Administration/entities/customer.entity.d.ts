import { OrderEntity } from './order.entity';
export declare class CustomerEntity {
    id: number;
    name: string;
    email: string;
    filename: string;
    password: string;
    phone: string;
    orders: OrderEntity[];
}
