import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { AddressDTO } from "src/commonDTOs/addressDTO";
import { JobType } from "src/constants";

// import { Transform } from "class-transformer";
// import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MinLength, minLength } from "class-validator";
// import { JobType } from "src/constants";

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


// export class LocationDTO{
//     city :string;
//     country:string
// }

// export class CreateJobDTO{
    
//         @IsNotEmpty()
//         @IsString()
//         @Transform(({value}) => value?.trim() )
//         companyName:string;

//         @IsNotEmpty()
//         @IsString()
//         @Transform(({value})=> value?.trim())
//         @Length(1,20)
//         @MinLength(2 , {message: "title length should be only 3"})
//         title :string;

//         @IsNotEmpty()
//         @IsEmail()
//         email :string;


//         type? :JobType;

//         @IsInt() //can be a decimal number!
//         @IsNotEmpty()
//         experience : number;

//         @IsNumber()
//         @IsNotEmpty()
//         salary : number;

//         @IsString({each: true})
//         @IsOptional()
//         @minLength(1)
//         tags? : string[];
//         isActive? : boolean;
//         location :LocationDTO;

// }