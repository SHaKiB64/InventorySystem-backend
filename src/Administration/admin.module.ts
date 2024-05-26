import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminEntity } from './admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { CustomerEntity } from './entities/customer.entity';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import { OrderEntity } from './entities/order.entity';


@Module({
  imports: [ TypeOrmModule.forFeature([AdminEntity, CustomerEntity, CategoryEntity, ProductEntity, OrderEntity ]),
  JwtModule.register({
    global: true,
    secret: "3NP_Backend_Admin",
    signOptions: { expiresIn: '300m' },
  }),MailerModule.forRoot({
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
})
],
  controllers: [AdminController],
  providers: [AdminService, AuthService],
  exports:[AdminService]
})
export class AdminModule {}