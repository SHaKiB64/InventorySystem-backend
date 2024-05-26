import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Session,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CustomerDto } from './dto/customers.dto';
import { CustomersService } from './customers.service';
import * as bcrypt from 'bcrypt';
import { CustomerProfileEntity } from './Entity/customerprofile.entity';
import { SessionGuard } from 'src/customers/session.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { CartEntity } from './Entity/cart.entity';
import { OrderEntity } from './Entity/order.entity';
import { EmailDto } from './dto/email.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Post()
  async login(
    @Body() customerDto: CustomerDto[],
    @Session() session: Record<string, any>,
  ): Promise<object> {
    const user = await this.customersService.getUserByEmail(
      customerDto['email'],
    );
    if (user) {
      const isMatch = await bcrypt.compare(
        customerDto['password'],
        user.password,
      );
      if (isMatch) {
        session.user = user;
        return { message: 'Login successfull', user };
      } else {
        return { message: 'Wrong Password' };
      }
    } else {
      return { message: 'No Customer Found' };
    }
  }

  @Post('signup')
  @UsePipes(new ValidationPipe())
  signUp(@Body() customerDto: CustomerDto): object {
    return this.customersService.signUp(customerDto);
  }

  @UseGuards(SessionGuard)
  @Post('profilepicture')
  @UseInterceptors(
  FileInterceptor('myfile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 30000 },
      storage: diskStorage({
        destination: './resources/profilepictures/',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async uploadProfilePicture(@UploadedFile() myfile: Express.Multer.File, @Session() session: Record<string, any>) {
    if (myfile) {
      this.customersService.updateProfilePicture(session.user.user_id, myfile.filename);
      return { message: 'Profile picture uploaded successfully' };
    } else {
      throw new BadRequestException('Profile picture is required');
    }
  }

  @UseGuards(SessionGuard)
  @Post('profile')
  @UsePipes(new ValidationPipe())
  async createProfile(
    @Body() CustomerProfileEntity: CustomerProfileEntity,
    @Session() session: Record<string, any>,
  ) {
    if (!session.user) {
      throw new UnauthorizedException('User not found. Login first');
    } else {
      CustomerProfileEntity.user = session.user;
      return this.customersService.createProfile(CustomerProfileEntity);
    }
  }

  @UseGuards(SessionGuard)
  @Get('profile')
  profile(@Session() session: Record<string, any>) {
    return this.customersService.getProfilesById(session.user.user_id);
  }

  @UseGuards(SessionGuard)
  @Patch('profile')
  profileUpdate(
    @Body() updatedProfile: Partial<CustomerProfileEntity>
  ) {
    const profileId = updatedProfile.profile_id;
    if (!profileId) {
      throw new BadRequestException('Profile ID is required');
    } else {
      return this.customersService.updateProfile(updatedProfile);
    }
  }



  @UseGuards(SessionGuard)
  @Delete('profile/:profileId')
  async deleteProfile(@Param('profileId',ParseIntPipe) profileId: number): Promise<any> {
     const info = await this.customersService.deleteProfile(profileId);
      if(info.affected){
        return {"message" : "Profile deleted successfully"};
      }else{
        throw new InternalServerErrorException('Failed to delete profile');
      }
  }

  @UseGuards(SessionGuard)
  @Get('viewProduct')
  viewProduct(): any {
    return this.customersService.getAllProducts();
  }

  @UseGuards(SessionGuard)
  @Get('searchProduct')
  async searchProduct(@Query('keyword') keyword: string): Promise<any> {
    if (!keyword) {
      throw new BadRequestException('Keyword is required');
    } else {
      const results = await this.customersService.getProductByKeyWord(keyword);
      if (results.length > 0) {
        return results;
      } else {
        throw new InternalServerErrorException('No product found');
      }
    }
  }

  @UseGuards(SessionGuard)
  @Post('order/:pId')
  async placeOrder(@Param("pId") pId: number,@Session() session: Record<string, any>): Promise<OrderEntity> {
    return this.customersService.placeOrder(session.user, pId);
  }

  @UseGuards(SessionGuard)
  @Post('cart')
  createCart(@Session() session: Record<string, any>): Promise<CartEntity> {
    const customerId = session.user.user_id;
    if (!customerId) {
      throw new UnauthorizedException('Customer not found. Login first');
    }
    return this.customersService.createCart(customerId)
      .then(cart => {
        session.cartId = cart.cart_id;
        return cart;
      });
  }

  @UseGuards(SessionGuard)
  @Post('cart/:productId')
  async addToCart(@Param('productId') productId: number, @Session() session: Record<string, any>): Promise<CartEntity> {
    const cartId = session.cartId;
    if (!cartId) {
      throw new NotFoundException('Cart ID not found in session');
    }
    return this.customersService.addToCart(cartId, productId);
  }

  @UseGuards(SessionGuard)
  @Get('cart')
  viewCart( @Session() session: Record<string, any>) {
    const cartId = session.cartId;
    if (!cartId) {
      throw new NotFoundException('Cart ID not found in session');
    }
    return this.customersService.getCart(cartId);
  }


  @Post('sendEmail')
  sendEmail(@Body() mydata: EmailDto) {
    return this.customersService.sendEmail(mydata);
  }

  
  @Get('signout')
  signout(@Session() session) {
    if (session.destroy()) {
      return { message: 'you are logged out' };
    } else {
      throw new UnauthorizedException('invalid actions');
    }
  }
}
