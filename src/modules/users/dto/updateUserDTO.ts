
import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { AddressDTO } from "src/commonDTOs/addressDTO";
import { ACCOUNTSTATUS, ACCOUNTTYPE } from "src/constants";
import {PartialType,OmitType} from "@nestjs/mapped-types"
import { CreateUserDTO } from "./createUserDTO";


//partialType will do all value optional
// omit just delete that value which we given in that
export class UpdateUserDTO extends PartialType(OmitType(CreateUserDTO,["accountType","metadata"])){}

/* this will convert all value as OPTIONAL and then we can use this */
// export class UpdateUserDTO extends PartialType(CreateUserDTO){}

/* We don't need to write this again because we can access this values from CreateUserDTO */
// export class UpdateUserDTO{
//     @IsString()
//     @IsOptional()
//     name? :string;

//     @IsString()
//     @IsOptional()
//     email? : string;

//     @IsString()
//     @IsOptional()
//     password? :string

//     @IsString()
//     @IsOptional()
//     age? : string

//     @IsString()
//     @IsOptional()
//     phone? : string

 
//     @IsString({each:true})
//     @IsOptional()
//     social? : string[]

//     @Type(()=> AddressDTO)
//     @ValidateNested()
//     @IsOptional()
//     address? : AddressDTO

// }