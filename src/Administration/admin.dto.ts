import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsEmail, Matches, IsOptional, MinLength, IsNotEmpty, IsNumber, IsPositive, IsArray, ValidateNested, IsEmpty } from 'class-validator';

export class AdminDTO {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid Email Format' })
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  @Matches(/^01\d{9}$/, {
    message: 'Phone number must start with 01 and be 11 digits long',
  })
  phone: string;

  filename: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}

export class loginDTO {
  @IsEmail() 
  email: string;
  @IsNotEmpty() 
  password: string; 
}

export class AdminUpdateDTO {
  @IsString()
  @MinLength(4)
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid Email Format' })
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(4, {message:'Password mmust be 4 char long.'})
  @IsOptional()
  password?: string;

  @IsString()
  @Matches(/^01\d{9}$/, { message: 'Phone number must start with 01 and be 11 digits long' })
  @IsOptional()
  phone?: string;
}


export class CustomerDTO{
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid Email Format' })
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  @Matches(/^01\d{9}$/, { message: 'Phone number must start with 01 and be 11 digits long' })
  phone: string;

  filename: string;
}
export class CutomerUpdateDTO {
  @IsString()
  @MinLength(4)
  @IsOptional()
  name?: string;

  @IsString()
  @IsEmail({}, { message: 'Invalid Email Format' })
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(4, {message:'Password mmust be 4 char long.'})
  @IsOptional()
  password?: string;

  @IsString()
  @Matches(/^01\d{9}$/, { message: 'Phone number must start with 01 and be 11 digits long' })
  @IsOptional()
  phone?: string;

} 

export class CategoryDTO {
  @IsString({message: 'Name Must Be String'})
  name: string;
}
export class CategoryUpdateDTO {
  @IsString({ message: 'Name Must Be String' })
  name: string;
}

export class ProductDTO {
  @IsString({message: 'Name Must Be String'})
  name: string;

  @IsNotEmpty()
  purprice: number;
  
  @IsNotEmpty()
  sellprice: number;

  @IsString()
  @IsNotEmpty()
  ctg: string;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  filename: string;

}

export class OrderDTO {
  @IsNumber()
  customerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDTO)
  products: ProductDTO[];

  @IsNumber()
  totalAmount: number;

}
class ProductOrderDTO {
  @IsNotEmpty()
  productName: string; // Assuming product name is a string

  @IsNumber()
  @IsPositive()
  quantity: number;
}
