import { IsNotEmpty, IsOptional, IsString, isString } from "class-validator";


export class AddressDTO{

    @IsNotEmpty()
    @IsString()
    address1 : string;

    @IsOptional()
    @IsString()
    address2 : string;

    @IsOptional()
    @IsString()
    city : string;

    @IsNotEmpty()
    @IsString()
    country  : string;

    @IsOptional()
    @IsString()
    state  : string;

    @IsOptional()
    @IsString()
    zipCode: string;

}
