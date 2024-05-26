/// <reference types="multer" />
import { CustomerDto } from './dto/customers.dto';
import { CustomersService } from './customers.service';
import { CustomerProfileEntity } from './Entity/customerprofile.entity';
import { CartEntity } from './Entity/cart.entity';
import { OrderEntity } from './Entity/order.entity';
import { EmailDto } from './dto/email.dto';
export declare class CustomersController {
    private customersService;
    constructor(customersService: CustomersService);
    login(customerDto: CustomerDto[], session: Record<string, any>): Promise<object>;
    signUp(customerDto: CustomerDto): object;
    uploadProfilePicture(myfile: Express.Multer.File, session: Record<string, any>): Promise<{
        message: string;
    }>;
    createProfile(CustomerProfileEntity: CustomerProfileEntity, session: Record<string, any>): Promise<CustomerProfileEntity>;
    profile(session: Record<string, any>): Promise<any>;
    profileUpdate(updatedProfile: Partial<CustomerProfileEntity>): Promise<CustomerProfileEntity>;
    deleteProfile(profileId: number): Promise<any>;
    viewProduct(): any;
    searchProduct(keyword: string): Promise<any>;
    placeOrder(pId: number, session: Record<string, any>): Promise<OrderEntity>;
    createCart(session: Record<string, any>): Promise<CartEntity>;
    addToCart(productId: number, session: Record<string, any>): Promise<CartEntity>;
    viewCart(session: Record<string, any>): Promise<CartEntity>;
    sendEmail(mydata: EmailDto): Promise<SentMessageInfo>;
    signout(session: any): {
        message: string;
    };
}
