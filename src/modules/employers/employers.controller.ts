import { Body, Controller, Post } from "@nestjs/common";
import { CreateEmployerDTO } from "./dto/createEmployer.dto";
import { EmployerService } from "./employers.service";


@Controller("employers")
export class EmployerController{

    constructor(private employeeService :EmployerService){}

    @Post()
    create(@Body() employeeData : CreateEmployerDTO){
      return  this.employeeService.create(employeeData);
    }
}