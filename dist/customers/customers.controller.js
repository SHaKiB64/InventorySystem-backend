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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const customers_dto_1 = require("./dto/customers.dto");
const customers_service_1 = require("./customers.service");
const bcrypt = require("bcrypt");
const customerprofile_entity_1 = require("./Entity/customerprofile.entity");
const session_guard_1 = require("./session.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const email_dto_1 = require("./dto/email.dto");
let CustomersController = class CustomersController {
    constructor(customersService) {
        this.customersService = customersService;
    }
    async login(customerDto, session) {
        const user = await this.customersService.getUserByEmail(customerDto['email']);
        if (user) {
            const isMatch = await bcrypt.compare(customerDto['password'], user.password);
            if (isMatch) {
                session.user = user;
                return { message: 'Login successfull', user };
            }
            else {
                return { message: 'Wrong Password' };
            }
        }
        else {
            return { message: 'No Customer Found' };
        }
    }
    signUp(customerDto) {
        return this.customersService.signUp(customerDto);
    }
    async uploadProfilePicture(myfile, session) {
        if (myfile) {
            this.customersService.updateProfilePicture(session.user.user_id, myfile.filename);
            return { message: 'Profile picture uploaded successfully' };
        }
        else {
            throw new common_1.BadRequestException('Profile picture is required');
        }
    }
    async createProfile(CustomerProfileEntity, session) {
        if (!session.user) {
            throw new common_1.UnauthorizedException('User not found. Login first');
        }
        else {
            CustomerProfileEntity.user = session.user;
            return this.customersService.createProfile(CustomerProfileEntity);
        }
    }
    profile(session) {
        return this.customersService.getProfilesById(session.user.user_id);
    }
    profileUpdate(updatedProfile) {
        const profileId = updatedProfile.profile_id;
        if (!profileId) {
            throw new common_1.BadRequestException('Profile ID is required');
        }
        else {
            return this.customersService.updateProfile(updatedProfile);
        }
    }
    async deleteProfile(profileId) {
        const info = await this.customersService.deleteProfile(profileId);
        if (info.affected) {
            return { "message": "Profile deleted successfully" };
        }
        else {
            throw new common_1.InternalServerErrorException('Failed to delete profile');
        }
    }
    viewProduct() {
        return this.customersService.getAllProducts();
    }
    async searchProduct(keyword) {
        if (!keyword) {
            throw new common_1.BadRequestException('Keyword is required');
        }
        else {
            const results = await this.customersService.getProductByKeyWord(keyword);
            if (results.length > 0) {
                return results;
            }
            else {
                throw new common_1.InternalServerErrorException('No product found');
            }
        }
    }
    async placeOrder(pId, session) {
        return this.customersService.placeOrder(session.user, pId);
    }
    createCart(session) {
        const customerId = session.user.user_id;
        if (!customerId) {
            throw new common_1.UnauthorizedException('Customer not found. Login first');
        }
        return this.customersService.createCart(customerId)
            .then(cart => {
            session.cartId = cart.cart_id;
            return cart;
        });
    }
    async addToCart(productId, session) {
        const cartId = session.cartId;
        if (!cartId) {
            throw new common_1.NotFoundException('Cart ID not found in session');
        }
        return this.customersService.addToCart(cartId, productId);
    }
    viewCart(session) {
        const cartId = session.cartId;
        if (!cartId) {
            throw new common_1.NotFoundException('Cart ID not found in session');
        }
        return this.customersService.getCart(cartId);
    }
    sendEmail(mydata) {
        return this.customersService.sendEmail(mydata);
    }
    signout(session) {
        if (session.destroy()) {
            return { message: 'you are logged out' };
        }
        else {
            throw new common_1.UnauthorizedException('invalid actions');
        }
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customers_dto_1.CustomerDto]),
    __metadata("design:returntype", Object)
], CustomersController.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Post)('profilepicture'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('myfile', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 30000 },
        storage: (0, multer_1.diskStorage)({
            destination: './resources/profilepictures/',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "uploadProfilePicture", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Post)('profile'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [customerprofile_entity_1.CustomerProfileEntity, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "createProfile", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "profile", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "profileUpdate", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Delete)('profile/:profileId'),
    __param(0, (0, common_1.Param)('profileId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "deleteProfile", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Get)('viewProduct'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], CustomersController.prototype, "viewProduct", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Get)('searchProduct'),
    __param(0, (0, common_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "searchProduct", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Post)('order/:pId'),
    __param(0, (0, common_1.Param)("pId")),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "placeOrder", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Post)('cart'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "createCart", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Post)('cart/:productId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "addToCart", null);
__decorate([
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.Get)('cart'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "viewCart", null);
__decorate([
    (0, common_1.Post)('sendEmail'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [email_dto_1.EmailDto]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Get)('signout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "signout", null);
exports.CustomersController = CustomersController = __decorate([
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map