import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { AddressDTO } from "src/commonDTOs/addressDTO";
import { JobType } from "src/constants";

export class CreateJobDTO{

    @IsNotEmpty()
    @IsString()
    userId :string;

    @IsNotEmpty()
    @IsString()
    companyName : string

    @IsNotEmpty()
    @IsString()
    title : string;

    @IsNotEmpty()
    @IsString()
    description  :string;

    @IsNotEmpty()
    @IsNumber()
    experience :number;

    @IsOptional()
    @IsString({each : true})
    tags: string[]

    @IsOptional()
    @IsString()
    salary : string;

    @IsNotEmpty()
    @IsEnum(JobType)
    type : JobType

    @Type(()=> AddressDTO)
    @ValidateNested()
    @IsNotEmpty()
    location  :AddressDTO

}