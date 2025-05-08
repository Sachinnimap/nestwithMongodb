import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateUserDTO } from "src/modules/users/dto/createUserDTO";


export class CreateStudentDTO extends CreateUserDTO{

    @IsNotEmpty()
    @IsString()
    university: string;

    @IsNotEmpty()
    @IsString()
    course : string;

    @IsOptional()
    @IsString()
    grade : string;

    @IsBoolean()
    @IsOptional()
    isUnderIntership?:boolean;
}