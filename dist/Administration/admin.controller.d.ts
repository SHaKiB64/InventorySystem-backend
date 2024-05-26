/// <reference types="multer" />
import { AdminService } from './admin.service';
import { AdminEntity } from './admin.entity';
import { AdminUpdateDTO, CustomerDTO, CutomerUpdateDTO, ProductDTO, CategoryDTO, OrderDTO, CategoryUpdateDTO } from './admin.dto';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { CustomerEntity } from './entities/customer.entity';
import { CategoryEntity } from './entities/category.entity';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
export declare class AdminController {
    private readonly adminService;
    private readonly authService;
    private readonly orderRepository;
    constructor(adminService: AdminService, authService: AuthService, orderRepository: Repository<OrderEntity>);
    getAllAdmins(): Promise<AdminEntity[]>;
    getImages(name: string, res: any): void;
    getAdminById(id: number): Promise<AdminEntity>;
    getAdminByEmail(email: string): Promise<AdminEntity>;
    updateAdmin(id: number, adminUpdateDTO: AdminUpdateDTO): Promise<AdminEntity>;
    getimagebyadminid(id: number, res: any): Promise<void>;
    sendEmail(): Promise<void>;
    logout(request: Request): Promise<{
        access_token: string;
    }>;
    createCustomer(customerDTO: CustomerDTO, myfile: Express.Multer.File): Promise<CustomerEntity>;
    updateCustomer(id: number, customerUpdateDTO: CutomerUpdateDTO): Promise<CustomerEntity>;
    geticmagebyid(id: number, res: any): Promise<void>;
    getCImages(name: string, res: any): void;
    getAllCustomers(): Promise<CustomerEntity[]>;
    getCustomerById(id: number): Promise<CustomerEntity>;
    deleteCustomerById(id: number): Promise<string>;
    createCategory(categoryDTO: CategoryDTO): Promise<CategoryEntity>;
    getCategories(): object;
    getCategoriesById(id: number): Promise<CategoryEntity>;
    updateCategory(id: number, categoryUpdateDTO: CategoryUpdateDTO): Promise<CategoryEntity>;
    deleteCategoryById(id: number): Promise<string>;
    createProduct(productDTO: ProductDTO): Promise<{
        message: string;
        product: import("./entities/product.entity").ProductEntity;
    }>;
    getProducts(): object;
    getProductsById(id: number): object;
    updateProduct(id: number, productDTO: ProductDTO): Promise<{
        message: string;
        product: import("./entities/product.entity").ProductEntity;
    }>;
    deleteProductById(id: number): Promise<string>;
    getAccountants(): object;
    getAccountantsById(id: string): object;
    placeOrder(id: number, orderDTO: OrderDTO): Promise<{
        order: OrderEntity;
        customerId: number;
    }>;
    getOrdersById(id: number): object;
    getOrdersByCustomerId(id: number): Promise<OrderEntity[]>;
    deleteOrder(id: number): Promise<void>;
    getOrders(): Promise<any[]>;
}
