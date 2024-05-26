import { IsEmail, IsNotEmpty } from "class-validator";
import { from } from "rxjs";

export class EmailDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsEmail()
    from: string;
    subject: string;
    text: string;
}