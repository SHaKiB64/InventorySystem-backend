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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const customer_entity_1 = require("./Entity/customer.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const customerprofile_entity_1 = require("./Entity/customerprofile.entity");
const product_entity_1 = require("./Entity/product.entity");
const cart_entity_1 = require("./Entity/cart.entity");
const order_entity_1 = require("./Entity/order.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const email_dto_1 = require("./dto/email.dto");
let CustomersService = class CustomersService {
    constructor(customerRepository, customerProfileRepository, productRepository, cartRepository, orderRepository, mailerService) {
        this.customerRepository = customerRepository;
        this.customerProfileRepository = customerProfileRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.mailerService = mailerService;
    }
    async signUp(customerInfo) {
        const existingUserByUsername = await this.getCustomerByUserName(customerInfo.username);
        const existingUserByEmail = await this.getUserByEmail(customerInfo.email);
        if (existingUserByUsername || existingUserByEmail) {
            return { "message": "User Name or Email already in use" };
        }
        else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(customerInfo.password, salt);
            customerInfo.password = hashedPassword;
            await this.customerRepository.save(customerInfo);
            const mail = new email_dto_1.EmailDto();
            mail.email = customerInfo.email;
            mail.from = 'whatadrag79@gmail.com';
            mail.subject = 'Welcome to our website';
            mail.text = 'Thank you for signing up with us';
            this.sendEmail(mail);
            return { "message": "SignUp completed" };
        }
    }
    async getCustomerByUserName(username) {
        return await this.customerRepository.findOne({ where: { username } });
    }
    async getUserByEmail(email) {
        return await this.customerRepository.findOne({ where: { email } });
    }
    async createProfile(profileInfo) {
        const newProfile = this.customerProfileRepository.create(profileInfo);
        return this.customerProfileRepository.save(newProfile);
    }
    async getProfilesById(userId) {
        return this.customerProfileRepository
            .createQueryBuilder('customerProfile')
            .where('customerProfile.user = :userId', { userId })
            .getMany();
    }
    async updateProfilePicture(userId, newValue) {
        const user = await this.customerRepository.findOne({ where: { user_id: userId } });
        user.filename = newValue;
        await this.customerRepository.save(user);
    }
    updateProfile(updatedProfile) {
        return this.customerProfileRepository.save(updatedProfile);
    }
    async deleteProfile(profileId) {
        return await this.customerProfileRepository.delete(profileId);
    }
    async getAllProducts() {
        return this.productRepository.find();
    }
    async getProductByKeyWord(keyword) {
        return await this.productRepository.find({ where: { product_name: (0, typeorm_2.Like)(`%${keyword}%`) } });
    }
    async createCart(user_id) {
        const customer = await this.customerRepository.findOne({ where: { user_id } });
        if (!customer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const cart = new cart_entity_1.CartEntity();
        cart.customer = customer;
        return this.cartRepository.save(cart);
    }
    async addToCart(cartId, productId) {
        const cart = await this.cartRepository.findOne({ where: { cart_id: cartId }, relations: ['products'] });
        const product = await this.productRepository.findOne({ where: { product_id: productId }, relations: ['carts'] });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        cart.products.push(product);
        return this.cartRepository.save(cart);
    }
    async getCart(cartId) {
        return this.cartRepository.findOne({ where: { cart_id: cartId }, relations: ['products'] });
    }
    async placeOrder(customer, productId) {
        const product = await this.productRepository.findOne({ where: { product_id: productId } });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        const totalPrice = product.price;
        const order = new order_entity_1.OrderEntity();
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
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(customerprofile_entity_1.CustomerProfileEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(cart_entity_1.CartEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mailer_1.MailerService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map