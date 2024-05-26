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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDTO = exports.ProductDTO = exports.CategoryUpdateDTO = exports.CategoryDTO = exports.CutomerUpdateDTO = exports.CustomerDTO = exports.AdminUpdateDTO = exports.loginDTO = exports.AdminDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AdminDTO {
}
exports.AdminDTO = AdminDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], AdminDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid Email Format' }),
    __metadata("design:type", String)
], AdminDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], AdminDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^01\d{9}$/, {
        message: 'Phone number must start with 01 and be 11 digits long',
    }),
    __metadata("design:type", String)
], AdminDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AdminDTO.prototype, "isActive", void 0);
class loginDTO {
}
exports.loginDTO = loginDTO;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], loginDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], loginDTO.prototype, "password", void 0);
class AdminUpdateDTO {
}
exports.AdminUpdateDTO = AdminUpdateDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid Email Format' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: 'Password mmust be 4 char long.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^01\d{9}$/, { message: 'Phone number must start with 01 and be 11 digits long' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdminUpdateDTO.prototype, "phone", void 0);
class CustomerDTO {
}
exports.CustomerDTO = CustomerDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], CustomerDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid Email Format' }),
    __metadata("design:type", String)
], CustomerDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], CustomerDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^01\d{9}$/, { message: 'Phone number must start with 01 and be 11 digits long' }),
    __metadata("design:type", String)
], CustomerDTO.prototype, "phone", void 0);
class CutomerUpdateDTO {
}
exports.CutomerUpdateDTO = CutomerUpdateDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CutomerUpdateDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid Email Format' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CutomerUpdateDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4, { message: 'Password mmust be 4 char long.' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CutomerUpdateDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^01\d{9}$/, { message: 'Phone number must start with 01 and be 11 digits long' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CutomerUpdateDTO.prototype, "phone", void 0);
class CategoryDTO {
}
exports.CategoryDTO = CategoryDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name Must Be String' }),
    __metadata("design:type", String)
], CategoryDTO.prototype, "name", void 0);
class CategoryUpdateDTO {
}
exports.CategoryUpdateDTO = CategoryUpdateDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name Must Be String' }),
    __metadata("design:type", String)
], CategoryUpdateDTO.prototype, "name", void 0);
class ProductDTO {
}
exports.ProductDTO = ProductDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Name Must Be String' }),
    __metadata("design:type", String)
], ProductDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductDTO.prototype, "purprice", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductDTO.prototype, "sellprice", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductDTO.prototype, "ctg", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductDTO.prototype, "qty", void 0);
class OrderDTO {
}
exports.OrderDTO = OrderDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderDTO.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProductDTO),
    __metadata("design:type", Array)
], OrderDTO.prototype, "products", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OrderDTO.prototype, "totalAmount", void 0);
class ProductOrderDTO {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductOrderDTO.prototype, "productName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], ProductOrderDTO.prototype, "quantity", void 0);
//# sourceMappingURL=admin.dto.js.map