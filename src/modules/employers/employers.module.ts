import { Module } from "@nestjs/common";
import { EmployerController } from "./employers.controller";
import { EmployerService } from "./employers.service";

@Module({
    imports : [],
    controllers :[EmployerController],
    providers :[EmployerService],
    exports :[EmployerService]
})
export class EmployerModule{

}