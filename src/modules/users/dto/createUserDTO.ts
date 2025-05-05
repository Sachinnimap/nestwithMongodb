import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { AddressDTO } from "src/commonDTOs/addressDTO";
import { ACCOUNTSTATUS, ACCOUNTTYPE } from "src/constants";


export class CreateUserDTO{
    @IsString()
    @IsNotEmpty()
    name :string;

    @IsString()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    password :string

    @IsString()
    @IsOptional()
    age : string

    @IsString()
    @IsOptional()
    phone : string

    @IsEnum(ACCOUNTSTATUS)
    @IsOptional()
    status : ACCOUNTSTATUS;

    @IsEnum(ACCOUNTTYPE)
    @IsNotEmpty()
    accountType : ACCOUNTTYPE;

    @IsString({each:true})
    @IsOptional()
    social : string[]

    @IsBoolean()
    @IsOptional()
    isEmailVerified : boolean

    @Type(()=> AddressDTO)
    @ValidateNested()
    @IsNotEmpty()
    address : AddressDTO

    @IsOptional()
    metadata : Record<string,any>
}