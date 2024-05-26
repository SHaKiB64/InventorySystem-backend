import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './Entity/customer.entity';
import { CustomerProfileEntity } from './Entity/customerprofile.entity';
import { ProductEntity } from './Entity/product.entity';
import { Category } from './Entity/category.entity';
import { CartEntity } from './Entity/cart.entity';
import { OrderEntity } from './Entity/order.entity';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, CustomerProfileEntity,ProductEntity,Category,CartEntity,OrderEntity]),
  MailerModule.forRoot({
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
  controllers: [CustomersController],
  providers: [CustomersService],

})
export class CustomersModule {}
