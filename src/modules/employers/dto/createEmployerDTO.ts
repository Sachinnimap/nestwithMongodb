import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateUserDTO } from "src/modules/users/dto/createUserDTO";


export class CreateEmployerDTO extends CreateUserDTO{
    @IsNotEmpty()
    @IsString()
    company: string;

    @IsOptional()
    @IsString()
    size : string;

    @IsString({each : true})
    @IsOptional()
    workArea : string[] = []

    @IsString()
    @IsOptional()
    website : string;
}

