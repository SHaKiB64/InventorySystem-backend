import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { AdminDTO, AdminUpdateDTO, CategoryDTO, CategoryUpdateDTO, CustomerDTO, CutomerUpdateDTO, OrderDTO, ProductDTO, loginDTO } from './admin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { CustomerEntity } from './entities/customer.entity';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import { OrderEntity } from './entities/order.entity';
import { FindManyOptions } from 'typeorm';

@Injectable()
export class AdminService {
  findOne(logindata: loginDTO) {
    throw new Error('Method not implemented.');
  }
  // save(customerDTO: CustomerDTO): CustomerEntity | PromiseLike<CustomerEntity> {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectRepository(AdminEntity)
    private adminRepository: Repository<AdminEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,

    private mailerService: MailerService,
    private jwtService: JwtService,
  ) {}

  //? Admin
  async getAllAdmins(): Promise<AdminEntity[]> {
    return await this.adminRepository.find();
  }

  async getAdminById(id: number): Promise<AdminEntity> {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }
  async getAdminByEmail(email: string): Promise<AdminEntity> {
    return await this.adminRepository.findOneBy({ email });
  }

  async getimagebyadminid(id: number): Promise<string> {
    const mydata: AdminDTO = await this.adminRepository.findOneBy({
      id: id,
    });
    console.log(mydata);
    return mydata.filename;
  }

  async createAdmin(adminDTO: AdminDTO): Promise<AdminEntity> {
    const admin = new AdminEntity();
    admin.name = adminDTO.name;
    admin.phone = adminDTO.phone;
    admin.isActive = adminDTO.isActive;
    admin.email = adminDTO.email;
    admin.filename = adminDTO.filename;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(adminDTO.password, salt);
    admin.password = hashedPassword;
    return await this.adminRepository.save(admin);
  }

  async updateAdmin(
    id: number,
    adminUpdateDTO: AdminUpdateDTO,
  ): Promise<AdminEntity> {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException('Admin Not Found !!!');
    }

    if (adminUpdateDTO.name) {
      admin.name = adminUpdateDTO.name;
    }

    if (adminUpdateDTO.email) {
      admin.email = adminUpdateDTO.email;
    }

    if (adminUpdateDTO.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(adminUpdateDTO.password, salt);
      admin.password = hashedPassword;
    }

    if (adminUpdateDTO.phone) {
      admin.phone = adminUpdateDTO.phone;
    }

    return await this.adminRepository.save(admin);
  }

  async sendEmail(): Promise<void> {
    await this.mailerService.sendMail({
      to: 'mhmurad19@gmail.com',
      subject: 'Test Email',
      text: 'Yes, Mailer is Working.',
      html: '<h1>Hello, SHaKiB</h1>',
    });
  }

  async findOneBy(logindata: loginDTO): Promise<any> {
    return await this.adminRepository.findOneBy({ email: logindata.email });
  }

  //? Customers

  async createCustomer(customerDTO: CustomerDTO): Promise<CustomerEntity> {
    const customer = new CustomerEntity();
    customer.name = customerDTO.name;
    customer.phone = customerDTO.phone;
    customer.email = customerDTO.email;
    customer.filename = customerDTO.filename;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(customerDTO.password, salt);
    customer.password = hashedPassword;

    return await this.customerRepository.save(customer);
  }

  async updateCustomer(
    id: number,
    customerUpdateDTO: CutomerUpdateDTO,
  ): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Admin not found');
    }

    if (customerUpdateDTO.name) {
      customer.name = customerUpdateDTO.name;
    }

    if (customerUpdateDTO.email) {
      customer.email = customerUpdateDTO.email;
    }

    if (customerUpdateDTO.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(
        customerUpdateDTO.password,
        salt,
      );
      customer.password = hashedPassword;
    }

    if (customerUpdateDTO.phone) {
      customer.phone = customerUpdateDTO.phone;
    }

    return await this.customerRepository.save(customer);
  }

  async getAllCustomers(): Promise<CustomerEntity[]> {
    return await this.customerRepository.find();
  }

  async getimagebycustomerid(cid: number): Promise<string> {
    const mydata: CustomerDTO = await this.customerRepository.findOneBy({
      id: cid,
    });
    console.log(mydata);
    return mydata.filename;
  }

  async getCustomerById(id: number): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async deleteCustomerById(id: number): Promise<string> {
    try {
      // Delete associated orders first
      const conditions: FindManyOptions<OrderEntity> = {
        where: { customer: { id } },
      };
      const ordersToDelete = await this.orderRepository.find(conditions);
      await this.orderRepository.remove(ordersToDelete);

      // Then delete the customer
      const customer = await this.customerRepository.findOneBy({id});
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      await this.customerRepository.remove(customer);
      return 'Customer ' + id + ' Deleted Successfully';
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }

  //? Categories

  async createCategory(categoryDTO: CategoryDTO): Promise<CategoryEntity> {
    const categories = new CustomerEntity();
    categories.name = categoryDTO.name;
    return await this.categoryRepository.save(categories);
  }
  async getCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async getCategoriesById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(
    id: number,
    categoryUpdateDTO: CategoryUpdateDTO,
  ): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new Error('Category not found');
    }
    category.name = categoryUpdateDTO.name;
    const updatedCategory = await this.categoryRepository.save(category);
    return updatedCategory;
  }

  async deleteCategoryById(id: number): Promise<string> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    await this.categoryRepository.remove(category);
    return 'Category ' + id + ' Deleted Successfully';
  }

  //? Products

  async createProduct(productDTO: ProductDTO): Promise<ProductEntity> {
    const product = new ProductEntity();
    product.name = productDTO.name;
    product.purprice = productDTO.purprice;
    product.sellprice = productDTO.sellprice;
    product.qty = productDTO.qty; // Set the quantity property
    const category = await this.categoryRepository.findOneBy({
      name: productDTO.ctg,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    product.ctg = productDTO.ctg;
    product.category = category;

    return await this.productRepository.save(product);
  }

  async getProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getProductsById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateProduct(
    id: number,
    productDTO: ProductDTO,
  ): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.name = productDTO.name;
    product.purprice = productDTO.purprice;
    product.sellprice = productDTO.sellprice;
    product.qty = productDTO.qty;

    const category = await this.categoryRepository.findOneBy({
      name: productDTO.ctg,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    product.ctg = productDTO.ctg;
    product.category = category;

    return await this.productRepository.save(product);
  }

  async deleteProductById(id: number): Promise<string> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(product);
    return `Product ${id} deleted successfully`;
  }

  //? Accountants
  getAccountants(): object {
    return { message: 'List Of All Accountants' };
  }
  getAccountantsById(id: string): object {
    return { message: 'Your AccountantID is ' + id };
  }

  //? Orders
  async placeOrder(
    id: number,
    orderDTO: OrderDTO,
  ): Promise<{ order: OrderEntity; customerId: number }> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    let totalAmount = 0;
    const products: ProductEntity[] = [];
    const productList: { productName: string; quantity: number }[] = [];
    for (const productDTO of orderDTO.products) {
      const product = await this.productRepository.findOne({
        where: { name: productDTO.name },
      });
      if (!product) {
        throw new NotFoundException(`Product ${productDTO.name} not found`);
      }
      if (product.qty < productDTO.qty) {
        throw new BadRequestException(
          `Insufficient quantity for product ${productDTO.name}`,
        );
      }
      totalAmount += product.sellprice * productDTO.qty;
      product.qty -= productDTO.qty;
      products.push(product);
      productList.push({ productName: product.name, quantity: productDTO.qty });
    }
    const order = new OrderEntity();
    order.customer = customer;
    order.products = products;
    order.totalAmount = totalAmount;
    order.productList = productList;
    const savedOrder = await this.orderRepository.save(order);
    await Promise.all(
      products.map((product) => this.productRepository.save(product)),
    );
    return { order: savedOrder, customerId: customer.id };
  }

  async getOrdersById(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async getOrders(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }

  async getOrdersByCustomerId(customerId: number): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      where: { customer: { id: customerId } },
      relations: ['customer', 'products'], // Include related entities if needed
    });

    if (!orders || orders.length === 0) {
      throw new NotFoundException('No orders found for the customer');
    }
    return orders;
  }

  async deleteOrder(id: number): Promise<string> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.orderRepository.remove(order);
    return `Order with ID ${id} has been deleted successfully`;
  }
}
