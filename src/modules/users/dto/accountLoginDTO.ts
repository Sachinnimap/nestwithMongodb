import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class AccountLoginDTO{

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email :string;

    @IsNotEmpty()
    @IsString()
    password : string
}