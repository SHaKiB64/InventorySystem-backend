import { CustomerEntity } from './customer.entity';
export declare class CustomerProfileEntity {
    profile_id: number;
    user: CustomerEntity;
    FirstName: string;
    LastName: string;
    HouseNumber: string;
    street: string;
    city: string;
    divition: string;
    postalCode: Number;
    phoneNumber: string;
}
