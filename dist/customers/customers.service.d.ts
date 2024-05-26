import { CustomerEntity } from './Entity/customer.entity';
import { Repository } from 'typeorm';
import { CustomerProfileEntity } from './Entity/customerprofile.entity';
import { ProductEntity } from './Entity/product.entity';
import { CartEntity } from './Entity/cart.entity';
import { OrderEntity } from './Entity/order.entity';
import { MailerService } from '@nestjs-modules/mailer';
export declare class CustomersService {
    private customerRepository;
    private customerProfileRepository;
    private productRepository;
    private readonly cartRepository;
    private readonly orderRepository;
    private mailerService;
    constructor(customerRepository: Repository<CustomerEntity>, customerProfileRepository: Repository<CustomerProfileEntity>, productRepository: Repository<ProductEntity>, cartRepository: Repository<CartEntity>, orderRepository: Repository<OrderEntity>, mailerService: MailerService);
    signUp(customerInfo: any): Promise<{
        message: string;
    }>;
    getCustomerByUserName(username: string): Promise<CustomerEntity | undefined>;
    getUserByEmail(email: string): Promise<CustomerEntity | undefined>;
    createProfile(profileInfo: CustomerProfileEntity): Promise<CustomerProfileEntity>;
    getProfilesById(userId: number): Promise<any>;
    updateProfilePicture(userId: number, newValue: string): Promise<void>;
    updateProfile(updatedProfile: Partial<CustomerProfileEntity>): Promise<CustomerProfileEntity>;
    deleteProfile(profileId: number): Promise<any>;
    getAllProducts(): Promise<any>;
    getProductByKeyWord(keyword: string): Promise<any>;
    createCart(user_id: any): Promise<CartEntity>;
    addToCart(cartId: number, productId: number): Promise<CartEntity>;
    getCart(cartId: number): Promise<CartEntity>;
    placeOrder(customer: any, productId: any): Promise<OrderEntity>;
    sendEmail(mydata: any): Promise<SentMessageInfo>;
}
