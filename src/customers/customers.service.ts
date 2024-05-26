import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity } from './Entity/customer.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CustomerProfileEntity } from './Entity/customerprofile.entity';
import { ProductEntity } from './Entity/product.entity';
import { CartEntity } from './Entity/cart.entity';
import { OrderEntity } from './Entity/order.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailDto } from './dto/email.dto';



@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,

    @InjectRepository(CustomerProfileEntity)
    private customerProfileRepository: Repository<CustomerProfileEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,

    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    private mailerService: MailerService

  ) {}

  async signUp(customerInfo) {
    const existingUserByUsername = await this.getCustomerByUserName(customerInfo.username);
    const existingUserByEmail = await this.getUserByEmail(customerInfo.email);
  
    if (existingUserByUsername || existingUserByEmail) {
      return { "message": "User Name or Email already in use" };
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(customerInfo.password, salt);
      customerInfo.password = hashedPassword;
      await this.customerRepository.save(customerInfo);

      const mail = new EmailDto();
      mail.email = customerInfo.email; 
      mail.from = 'whatadrag79@gmail.com';
      mail.subject = 'Welcome to our website';
      mail.text = 'Thank you for signing up with us';
      this.sendEmail(mail);

      return { "message": "SignUp completed" };
    }
  }
    
  async getCustomerByUserName(username: string): Promise<CustomerEntity | undefined>{
    return await this.customerRepository.findOne({where:{username}});
  }
  async getUserByEmail(email: string): Promise<CustomerEntity | undefined>{
    return await this.customerRepository.findOne({where: {email}});

  }

  async createProfile(profileInfo: CustomerProfileEntity): Promise<CustomerProfileEntity> {
    const newProfile = this.customerProfileRepository.create(profileInfo);
    return this.customerProfileRepository.save(newProfile);
  }

  async getProfilesById(userId: number): Promise<any> {
    return this.customerProfileRepository
        .createQueryBuilder('customerProfile')
        .where('customerProfile.user = :userId', { userId })
        .getMany();
  }

  async updateProfilePicture(userId: number, newValue: string): Promise<void> {
    const user = await this.customerRepository.findOne({where:{user_id: userId}});
    user.filename = newValue;
    await this.customerRepository.save(user);
  }
  
  updateProfile(updatedProfile: Partial<CustomerProfileEntity>): Promise<CustomerProfileEntity> {
    return this.customerProfileRepository.save(updatedProfile);
  }

  async deleteProfile(profileId: number): Promise<any> {
      return await this.customerProfileRepository.delete(profileId);
  }

  async getAllProducts(): Promise<any> {
    return this.productRepository.find();
  }

  async getProductByKeyWord(keyword: string): Promise<any> {
    return await this.productRepository.find({ where: { product_name: Like(`%${keyword}%`) } });
  }

  //cart
  async createCart(user_id): Promise<CartEntity> {
    const customer = await this.customerRepository.findOne({where:{user_id}});
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    const cart = new CartEntity();
    cart.customer = customer;
    return this.cartRepository.save(cart);
  }

  async addToCart(cartId: number, productId: number): Promise<CartEntity> {
    const cart = await this.cartRepository.findOne({ where: { cart_id: cartId }, relations: ['products'] });
    const product = await this.productRepository.findOne({where:{product_id: productId}, relations: ['carts']});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    cart.products.push(product);
    return this.cartRepository.save(cart);
  }

  async getCart(cartId: number): Promise<CartEntity> {
    return this.cartRepository.findOne({ where: { cart_id: cartId }, relations: ['products'] });
  }
  
  async placeOrder(customer, productId): Promise<OrderEntity> {
    const product = await this.productRepository.findOne({where:{product_id: productId}});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const totalPrice = product.price;
    const order = new OrderEntity();
    order.customer = customer;
    order.products = [product];
    order.total_price = totalPrice;

    return this.orderRepository.save(order);
  }


  async sendEmail(mydata) {
    return await this.mailerService.sendMail({
      to: mydata.email,
      from: mydata.from,
      subject: mydata.subject,
      text: mydata.text,
    });
  }

}
