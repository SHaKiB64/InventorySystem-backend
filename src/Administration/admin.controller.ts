import { Controller, Get, Param, Patch, Body, Delete, Post, ValidationPipe, UsePipes, NotFoundException, UseGuards, Req, UnauthorizedException, HttpException, HttpStatus, UseInterceptors, UploadedFile, BadRequestException, InternalServerErrorException, ParseIntPipe, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminEntity } from './admin.entity';
import { AdminDTO, AdminUpdateDTO, CustomerDTO, CutomerUpdateDTO, ProductDTO, CategoryDTO, OrderDTO, CategoryUpdateDTO, } from './admin.dto';
import { AuthGuard } from './auth/auth.gaurd';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { CustomerEntity } from './entities/customer.entity';
import { CategoryEntity } from './entities/category.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { OrderEntity } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  //? Admin

  @Get('alladmins')
  async getAllAdmins(): Promise<AdminEntity[]> {
    return await this.adminService.getAllAdmins();
  }
  @Get('/getimage/:name')
  getImages(@Param('name') name: string, @Res() res) {
    res.sendFile(name, { root: './upload' });
  }

  @Get('get/:id')
  async getAdminById(@Param('id') id: number): Promise<AdminEntity> {
    return await this.adminService.getAdminById(id);
  }

  @Get('getadmin/:email')
  async getAdminByEmail(@Param('email') email: string): Promise<AdminEntity> {
    const admin = await this.adminService.getAdminByEmail(email);
    if (!admin) {
      throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
    }
    return admin;
  }

  @Patch('update/:id')
  @UsePipes(new ValidationPipe())
  async updateAdmin(
    @Param('id') id: number,
    @Body() adminUpdateDTO: AdminUpdateDTO,
  ): Promise<AdminEntity> {
    const updatedAdmin = await this.adminService.updateAdmin(
      id,
      adminUpdateDTO,
    );
    return updatedAdmin;
  }

  @Get('image/:id')
  async getimagebyadminid(@Param('id', ParseIntPipe) id: number, @Res() res) {
    try {
      const filename = await this.adminService.getimagebyadminid(id);
      if (!filename) {
        throw new Error('Image not found');
      }
      res.sendFile(filename, { root: './upload' }); // Adjust the root path as needed

    } catch (error) {
      console.error('Error sending file:', error);
      res.status(404).send('File not found');
    }
  }

  @Post('send')
  async sendEmail(): Promise<void> {
    await this.adminService.sendEmail();
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() request: Request): Promise<{ access_token: string }> {
    const token = request.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
    return await this.authService.logout(token); // Call the logout method from the AuthService and return the new token
  }

  //? Customers
  @Post('addcustomer')
  @UseInterceptors(
    FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 2000000 },
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @UsePipes(new ValidationPipe())
  async createCustomer(
    @Body() customerDTO: CustomerDTO,
    @UploadedFile() myfile: Express.Multer.File,
  ): Promise<CustomerEntity> {
    customerDTO.filename = myfile.filename;
    return await this.adminService.createCustomer(customerDTO);
  }

  @Patch('updatecustomer/:id')
  @UsePipes(new ValidationPipe())
  async updateCustomer(
    @Param('id') id: number,
    @Body() customerUpdateDTO: CutomerUpdateDTO,
  ): Promise<CustomerEntity> {
    const updateCustomer = await this.adminService.updateCustomer(
      id,
      customerUpdateDTO,
    );
    return updateCustomer;
  }

  @Get('cimage/:id')
  async geticmagebyid(@Param('id', ParseIntPipe) id: number, @Res() res) {
    const filename = await this.adminService.getimagebycustomerid(id);
    res.sendFile(filename, { root: './upload' });
  }

  @Get('/cimage/:name')
  getCImages(@Param('name') name: string, @Res() res) {
    res.sendFile(name, { root: './upload' });
  }

  @Get('allcustomers')
  async getAllCustomers(): Promise<CustomerEntity[]> {
    return await this.adminService.getAllCustomers();
  }

  @Get('customer/:id')
  async getCustomerById(@Param('id') id: number): Promise<CustomerEntity> {
    return await this.adminService.getCustomerById(id);
  }

  @Delete('deletecustomer/:id')
  async deleteCustomerById(@Param('id') id: number): Promise<string> {
    try {
      return await this.adminService.deleteCustomerById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  

  //? Categories

  @Post('addcategory')
  @UsePipes(new ValidationPipe())
  async createCategory(
    @Body() categoryDTO: CategoryDTO,
  ): Promise<CategoryEntity> {
    return await this.adminService.createCategory(categoryDTO);
  }

  @Get('allcategory')
  getCategories(): object {
    return this.adminService.getCategories();
  }

  @Get('getcategory/:id')
  async getCategoriesById(@Param('id') id: number): Promise<CategoryEntity> {
    return await this.adminService.getCategoriesById(id);
  }

  @Patch('updatecategory/:id')
  @UsePipes(new ValidationPipe())
  async updateCategory(
    @Param('id') id: number,
    @Body() categoryUpdateDTO: CategoryUpdateDTO,
  ): Promise<CategoryEntity> {
    const updateCategory = await this.adminService.updateCategory(
      id,
      categoryUpdateDTO,
    );
    return updateCategory;
  }

  @Delete('category/:id')
  async deleteCategoryById(@Param('id') id: number): Promise<string> {
    try {
      return await this.adminService.deleteCategoryById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  //? Products

  @Post('addproduct')
  async createProduct(@Body() productDTO: ProductDTO) {
    try {
      const product = await this.adminService.createProduct(productDTO);
      return {
        message: 'Product created successfully',
        product,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('allproducts')
  getProducts(): object {
    return this.adminService.getProducts();
  }

  @Get('product/:id')
  getProductsById(@Param('id') id: number): object {
    return this.adminService.getProductsById(id);
  }

  @Patch('updateproduct/:id')
  async updateProduct(@Param('id') id: number, @Body() productDTO: ProductDTO) {
    try {
      const product = await this.adminService.updateProduct(id, productDTO);
      return {
        message: 'Product updated successfully',
        product,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('deleteproduct/:id')
  async deleteProductById(@Param('id') id: number): Promise<string> {
    try {
      return await this.adminService.deleteProductById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  //! Accountants
  @Get('allaccountants')
  getAccountants(): object {
    return this.adminService.getAccountants();
  }
  @Get('accountant/:id')
  getAccountantsById(@Param('id') id: string): object {
    return this.adminService.getAccountantsById(id);
  }

  //? Orders

  @Post('customer/:id/addorder')
  async placeOrder(
    @Param('id') id: number,
    @Body() orderDTO: OrderDTO,
  ): Promise<{ order: OrderEntity; customerId: number }> {
    try {
      const result = await this.adminService.placeOrder(id, orderDTO);
      return result;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new Error('Internal server error');
      }
    }
  }

  @Get('order/:id')
  getOrdersById(@Param('id') id: number): object {
    return this.adminService.getOrdersById(id);
  }

  @Get('customer/:id/orders')
  async getOrdersByCustomerId(@Param('id') id: number): Promise<OrderEntity[]> {
    try {
      const orders = await this.adminService.getOrdersByCustomerId(id);
      return orders;
      this.adminService;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException(
          'An error occurred while fetching orders',
        );
      }
    }
  }

  @Delete('deleteorder/:id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    try {
      await this.adminService.deleteOrder(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException(
          'An error occurred while deleting the order',
        );
      }
    }
  }

  @Get('allorders')
  async getOrders(): Promise<any[]> {
    const orders = await this.orderRepository.find({ relations: ['customer'] });

    // Map the orders to include customerId
    const ordersWithCustomerId = orders.map((order) => ({
      ...order,
      customerId: order.customer.id,
      customerName: order.customer.name, // Assuming there's a `customer` relationship in OrderEntity
    }));

    return ordersWithCustomerId;
  }
}



