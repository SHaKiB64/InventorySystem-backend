import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";


export class CustomerProfileDto {
    UserId: number;
    
    @IsNotEmpty()
    @IsString()
    FirstName: string;

    @IsString()
    LastName: string;

    @IsString()
    HouseNumber: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    divition: string;

    @IsNumber()
    @IsNotEmpty()
    postalCode: Number;

    @IsPhoneNumber()
    phoneNumber: string;

}