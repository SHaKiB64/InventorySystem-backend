"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const customers_controller_1 = require("./customers.controller");
const customers_service_1 = require("./customers.service");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./Entity/customer.entity");
const customerprofile_entity_1 = require("./Entity/customerprofile.entity");
const product_entity_1 = require("./Entity/product.entity");
const category_entity_1 = require("./Entity/category.entity");
const cart_entity_1 = require("./Entity/cart.entity");
const order_entity_1 = require("./Entity/order.entity");
const mailer_1 = require("@nestjs-modules/mailer");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_entity_1.CustomerEntity, customerprofile_entity_1.CustomerProfileEntity, product_entity_1.ProductEntity, category_entity_1.Category, cart_entity_1.CartEntity, order_entity_1.OrderEntity]),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    ignoreTLS: true,
                    secure: true,
                    auth: {
                        user: 'whatadrag79@gmail.com',
                        pass: 'ifzm uqvs qnjh brgp'
                    },
                }
            }),
        ],
        controllers: [customers_controller_1.CustomersController],
        providers: [customers_service_1.CustomersService],
    })
], CustomersModule);
//# sourceMappingURL=customers.module.js.map