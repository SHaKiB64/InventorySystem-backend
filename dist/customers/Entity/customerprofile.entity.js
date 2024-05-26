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
exports.CustomerProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const customer_entity_1 = require("./customer.entity");
let CustomerProfileEntity = class CustomerProfileEntity {
};
exports.CustomerProfileEntity = CustomerProfileEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CustomerProfileEntity.prototype, "profile_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.CustomerEntity, customer => customer.profiles),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", customer_entity_1.CustomerEntity)
], CustomerProfileEntity.prototype, "user", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[a-zA-Z]+$/),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomerProfileEntity.prototype, "FirstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.Matches)(/^[a-zA-Z]+$/),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomerProfileEntity.prototype, "LastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomerProfileEntity.prototype, "HouseNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomerProfileEntity.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomerProfileEntity.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(20),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomerProfileEntity.prototype, "divition", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CustomerProfileEntity.prototype, "postalCode", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CustomerProfileEntity.prototype, "phoneNumber", void 0);
exports.CustomerProfileEntity = CustomerProfileEntity = __decorate([
    (0, typeorm_1.Entity)("Customer Profile")
], CustomerProfileEntity);
//# sourceMappingURL=customerprofile.entity.js.map