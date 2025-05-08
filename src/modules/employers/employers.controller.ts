import { Body, Controller, Post } from "@nestjs/common";
import { CreateEmployerDTO } from "./dto/createEmployerDTO";
import { EmployerService } from "./employers.service";


@Controller("employers")
export class EmployerController{

    constructor(private readonly employeeService :EmployerService){}

    @Post()
    create(@Body() employeeData : CreateEmployerDTO){
      return  this.employeeService.create(employeeData);
    }
}