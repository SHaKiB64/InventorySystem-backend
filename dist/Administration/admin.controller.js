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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const admin_dto_1 = require("./admin.dto");
const auth_gaurd_1 = require("./auth/auth.gaurd");
const auth_service_1 = require("./auth/auth.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const order_entity_1 = require("./entities/order.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AdminController = class AdminController {
    constructor(adminService, authService, orderRepository) {
        this.adminService = adminService;
        this.authService = authService;
        this.orderRepository = orderRepository;
    }
    async getAllAdmins() {
        return await this.adminService.getAllAdmins();
    }
    getImages(name, res) {
        res.sendFile(name, { root: './upload' });
    }
    async getAdminById(id) {
        return await this.adminService.getAdminById(id);
    }
    async getAdminByEmail(email) {
        const admin = await this.adminService.getAdminByEmail(email);
        if (!admin) {
            throw new common_1.HttpException('Admin not found', common_1.HttpStatus.NOT_FOUND);
        }
        return admin;
    }
    async updateAdmin(id, adminUpdateDTO) {
        const updatedAdmin = await this.adminService.updateAdmin(id, adminUpdateDTO);
        return updatedAdmin;
    }
    async getimagebyadminid(id, res) {
        try {
            const filename = await this.adminService.getimagebyadminid(id);
            if (!filename) {
                throw new Error('Image not found');
            }
            res.sendFile(filename, { root: './upload' });
        }
        catch (error) {
            console.error('Error sending file:', error);
            res.status(404).send('File not found');
        }
    }
    async sendEmail() {
        await this.adminService.sendEmail();
    }
    async logout(request) {
        const token = request.headers.authorization.split(' ')[1];
        return await this.authService.logout(token);
    }
    async createCustomer(customerDTO, myfile) {
        customerDTO.filename = myfile.filename;
        return await this.adminService.createCustomer(customerDTO);
    }
    async updateCustomer(id, customerUpdateDTO) {
        const updateCustomer = await this.adminService.updateCustomer(id, customerUpdateDTO);
        return updateCustomer;
    }
    async geticmagebyid(id, res) {
        const filename = await this.adminService.getimagebycustomerid(id);
        res.sendFile(filename, { root: './upload' });
    }
    getCImages(name, res) {
        res.sendFile(name, { root: './upload' });
    }
    async getAllCustomers() {
        return await this.adminService.getAllCustomers();
    }
    async getCustomerById(id) {
        return await this.adminService.getCustomerById(id);
    }
    async deleteCustomerById(id) {
        try {
            return await this.adminService.deleteCustomerById(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async createCategory(categoryDTO) {
        return await this.adminService.createCategory(categoryDTO);
    }
    getCategories() {
        return this.adminService.getCategories();
    }
    async getCategoriesById(id) {
        return await this.adminService.getCategoriesById(id);
    }
    async updateCategory(id, categoryUpdateDTO) {
        const updateCategory = await this.adminService.updateCategory(id, categoryUpdateDTO);
        return updateCategory;
    }
    async deleteCategoryById(id) {
        try {
            return await this.adminService.deleteCategoryById(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    async createProduct(productDTO) {
        try {
            const product = await this.adminService.createProduct(productDTO);
            return {
                message: 'Product created successfully',
                product,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getProducts() {
        return this.adminService.getProducts();
    }
    getProductsById(id) {
        return this.adminService.getProductsById(id);
    }
    async updateProduct(id, productDTO) {
        try {
            const product = await this.adminService.updateProduct(id, productDTO);
            return {
                message: 'Product updated successfully',
                product,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteProductById(id) {
        try {
            return await this.adminService.deleteProductById(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            throw error;
        }
    }
    getAccountants() {
        return this.adminService.getAccountants();
    }
    getAccountantsById(id) {
        return this.adminService.getAccountantsById(id);
    }
    async placeOrder(id, orderDTO) {
        try {
            const result = await this.adminService.placeOrder(id, orderDTO);
            return result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.BadRequestException) {
                throw error;
            }
            else {
                throw new Error('Internal server error');
            }
        }
    }
    getOrdersById(id) {
        return this.adminService.getOrdersById(id);
    }
    async getOrdersByCustomerId(id) {
        try {
            const orders = await this.adminService.getOrdersByCustomerId(id);
            return orders;
            this.adminService;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            else {
                throw new common_1.InternalServerErrorException('An error occurred while fetching orders');
            }
        }
    }
    async deleteOrder(id) {
        try {
            await this.adminService.deleteOrder(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            else {
                throw new common_1.InternalServerErrorException('An error occurred while deleting the order');
            }
        }
    }
    async getOrders() {
        const orders = await this.orderRepository.find({ relations: ['customer'] });
        const ordersWithCustomerId = orders.map((order) => ({
            ...order,
            customerId: order.customer.id,
            customerName: order.customer.name,
        }));
        return ordersWithCustomerId;
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('alladmins'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllAdmins", null);
__decorate([
    (0, common_1.Get)('/getimage/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getImages", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminById", null);
__decorate([
    (0, common_1.Get)('getadmin/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAdminByEmail", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.AdminUpdateDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Get)('image/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getimagebyadminid", null);
__decorate([
    (0, common_1.Post)('send'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('addcustomer'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 2000000 },
        storage: (0, multer_1.diskStorage)({
            destination: './upload',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CustomerDTO, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Patch)('updatecustomer/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.CutomerUpdateDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateCustomer", null);
__decorate([
    (0, common_1.Get)('cimage/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "geticmagebyid", null);
__decorate([
    (0, common_1.Get)('/cimage/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getCImages", null);
__decorate([
    (0, common_1.Get)('allcustomers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllCustomers", null);
__decorate([
    (0, common_1.Get)('customer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getCustomerById", null);
__decorate([
    (0, common_1.Delete)('deletecustomer/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteCustomerById", null);
__decorate([
    (0, common_1.Post)('addcategory'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CategoryDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Get)('allcategory'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('getcategory/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getCategoriesById", null);
__decorate([
    (0, common_1.Patch)('updatecategory/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.CategoryUpdateDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteCategoryById", null);
__decorate([
    (0, common_1.Post)('addproduct'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.ProductDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)('allproducts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getProductsById", null);
__decorate([
    (0, common_1.Patch)('updateproduct/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.ProductDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('deleteproduct/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteProductById", null);
__decorate([
    (0, common_1.Get)('allaccountants'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAccountants", null);
__decorate([
    (0, common_1.Get)('accountant/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getAccountantsById", null);
__decorate([
    (0, common_1.Post)('customer/:id/addorder'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.OrderDTO]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "placeOrder", null);
__decorate([
    (0, common_1.Get)('order/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AdminController.prototype, "getOrdersById", null);
__decorate([
    (0, common_1.Get)('customer/:id/orders'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOrdersByCustomerId", null);
__decorate([
    (0, common_1.Delete)('deleteorder/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteOrder", null);
__decorate([
    (0, common_1.Get)('allorders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getOrders", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(auth_gaurd_1.AuthGuard),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        auth_service_1.AuthService,
        typeorm_2.Repository])
], AdminController);
//# sourceMappingURL=admin.controller.js.map