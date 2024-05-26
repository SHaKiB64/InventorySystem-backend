import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './Administration/admin.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './Administration/auth/auth.module';
import { MailerModule } from "@nestjs-modules/mailer";


@Module({
  imports: [AdminModule,CustomersModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'inventory_managment',
    autoLoadEntities: true,
    synchronize: true,
  }),AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
