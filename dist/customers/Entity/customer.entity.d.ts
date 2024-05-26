import { CustomerProfileEntity } from './customerprofile.entity';
import { CartEntity } from './cart.entity';
export declare class CustomerEntity {
    user_id: number;
    username: string;
    email: string;
    password: string;
    filename: string;
    account_creation_date: Date;
    profiles: CustomerProfileEntity[];
    carts: CartEntity[];
}
