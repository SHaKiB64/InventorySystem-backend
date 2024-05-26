"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const admin_entity_1 = require("./admin.entity");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
const customer_entity_1 = require("./entities/customer.entity");
const category_entity_1 = require("./entities/category.entity");
const product_entity_1 = require("./entities/product.entity");
const order_entity_1 = require("./entities/order.entity");
let AdminService = class AdminService {
    findOne(logindata) {
        throw new Error('Method not implemented.');
    }
    constructor(adminRepository, customerRepository, categoryRepository, productRepository, orderRepository, mailerService, jwtService) {
        this.adminRepository = adminRepository;
        this.customerRepository = customerRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.mailerService = mailerService;
        this.jwtService = jwtService;
    }
    async getAllAdmins() {
        return await this.adminRepository.find();
    }
    async getAdminById(id) {
        const admin = await this.adminRepository.findOneBy({ id });
        if (!admin) {
            throw new common_1.NotFoundException('Admin not found');
        }
        return admin;
    }
    async getAdminByEmail(email) {
        return await this.adminRepository.findOneBy({ email });
    }
    async getimagebyadminid(id) {
        const mydata = await this.adminRepository.findOneBy({
            id: id,
        });
        console.log(mydata);
        return mydata.filename;
    }
    async createAdmin(adminDTO) {
        const admin = new admin_entity_1.AdminEntity();
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
    async updateAdmin(id, adminUpdateDTO) {
        const admin = await this.adminRepository.findOneBy({ id });
        if (!admin) {
            throw new common_1.NotFoundException('Admin Not Found !!!');
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
    async sendEmail() {
        await this.mailerService.sendMail({
            to: 'mhmurad19@gmail.com',
            subject: 'Test Email',
            text: 'Yes, Mailer is Working.',
            html: '<h1>Hello, SHaKiB</h1>',
        });
    }
    async findOneBy(logindata) {
        return await this.adminRepository.findOneBy({ email: logindata.email });
    }
    async createCustomer(customerDTO) {
        const customer = new customer_entity_1.CustomerEntity();
        customer.name = customerDTO.name;
        customer.phone = customerDTO.phone;
        customer.email = customerDTO.email;
        customer.filename = customerDTO.filename;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(customerDTO.password, salt);
        customer.password = hashedPassword;
        return await this.customerRepository.save(customer);
    }
    async updateCustomer(id, customerUpdateDTO) {
        const customer = await this.customerRepository.findOneBy({ id });
        if (!customer) {
            throw new common_1.NotFoundException('Admin not found');
        }
        if (customerUpdateDTO.name) {
            customer.name = customerUpdateDTO.name;
        }
        if (customerUpdateDTO.email) {
            customer.email = customerUpdateDTO.email;
        }
        if (customerUpdateDTO.password) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(customerUpdateDTO.password, salt);
            customer.password = hashedPassword;
        }
        if (customerUpdateDTO.phone) {
            customer.phone = customerUpdateDTO.phone;
        }
        return await this.customerRepository.save(customer);
    }
    async getAllCustomers() {
        return await this.customerRepository.find();
    }
    async getimagebycustomerid(cid) {
        const mydata = await this.customerRepository.findOneBy({
            id: cid,
        });
        console.log(mydata);
        return mydata.filename;
    }
    async getCustomerById(id) {
        const customer = await this.customerRepository.findOneBy({ id });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return customer;
    }
    async deleteCustomerById(id) {
        try {
            const conditions = {
                where: { customer: { id } },
            };
            const ordersToDelete = await this.orderRepository.find(conditions);
            await this.orderRepository.remove(ordersToDelete);
            const customer = await this.customerRepository.findOneBy({ id });
            if (!customer) {
                throw new common_1.NotFoundException('Customer not found');
            }
            await this.customerRepository.remove(customer);
            return 'Customer ' + id + ' Deleted Successfully';
        }
        catch (error) {
            console.error('Error deleting customer:', error);
            throw error;
        }
    }
    async createCategory(categoryDTO) {
        const categories = new customer_entity_1.CustomerEntity();
        categories.name = categoryDTO.name;
        return await this.categoryRepository.save(categories);
    }
    async getCategories() {
        return await this.categoryRepository.find();
    }
    async getCategoriesById(id) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return category;
    }
    async updateCategory(id, categoryUpdateDTO) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new Error('Category not found');
        }
        category.name = categoryUpdateDTO.name;
        const updatedCategory = await this.categoryRepository.save(category);
        return updatedCategory;
    }
    async deleteCategoryById(id) {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        await this.categoryRepository.remove(category);
        return 'Category ' + id + ' Deleted Successfully';
    }
    async createProduct(productDTO) {
        const product = new product_entity_1.ProductEntity();
        product.name = productDTO.name;
        product.purprice = productDTO.purprice;
        product.sellprice = productDTO.sellprice;
        product.qty = productDTO.qty;
        const category = await this.categoryRepository.findOneBy({
            name: productDTO.ctg,
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        product.ctg = productDTO.ctg;
        product.category = category;
        return await this.productRepository.save(product);
    }
    async getProducts() {
        return await this.productRepository.find();
    }
    async getProductsById(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return product;
    }
    async updateProduct(id, productDTO) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        product.name = productDTO.name;
        product.purprice = productDTO.purprice;
        product.sellprice = productDTO.sellprice;
        product.qty = productDTO.qty;
        const category = await this.categoryRepository.findOneBy({
            name: productDTO.ctg,
        });
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        product.ctg = productDTO.ctg;
        product.category = category;
        return await this.productRepository.save(product);
    }
    async deleteProductById(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        await this.productRepository.remove(product);
        return `Product ${id} deleted successfully`;
    }
    getAccountants() {
        return { message: 'List Of All Accountants' };
    }
    getAccountantsById(id) {
        return { message: 'Your AccountantID is ' + id };
    }
    async placeOrder(id, orderDTO) {
        const customer = await this.customerRepository.findOneBy({ id });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        let totalAmount = 0;
        const products = [];
        const productList = [];
        for (const productDTO of orderDTO.products) {
            const product = await this.productRepository.findOne({
                where: { name: productDTO.name },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product ${productDTO.name} not found`);
            }
            if (product.qty < productDTO.qty) {
                throw new common_1.BadRequestException(`Insufficient quantity for product ${productDTO.name}`);
            }
            totalAmount += product.sellprice * productDTO.qty;
            product.qty -= productDTO.qty;
            products.push(product);
            productList.push({ productName: product.name, quantity: productDTO.qty });
        }
        const order = new order_entity_1.OrderEntity();
        order.customer = customer;
        order.products = products;
        order.totalAmount = totalAmount;
        order.productList = productList;
        const savedOrder = await this.orderRepository.save(order);
        await Promise.all(products.map((product) => this.productRepository.save(product)));
        return { order: savedOrder, customerId: customer.id };
    }
    async getOrdersById(id) {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async getOrders() {
        return await this.orderRepository.find();
    }
    async getOrdersByCustomerId(customerId) {
        const orders = await this.orderRepository.find({
            where: { customer: { id: customerId } },
            relations: ['customer', 'products'],
        });
        if (!orders || orders.length === 0) {
            throw new common_1.NotFoundException('No orders found for the customer');
        }
        return orders;
    }
    async deleteOrder(id) {
        const order = await this.orderRepository.findOneBy({ id });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        await this.orderRepository.remove(order);
        return `Order with ID ${id} has been deleted successfully`;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admin_entity_1.AdminEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.CategoryEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService,
        jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map