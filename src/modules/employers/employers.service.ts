import { Injectable } from "@nestjs/common";
import { CreateEmployerDTO } from "./dto/createEmployer.dto";
import { EmployerDocument } from "src/schemas/employer";
import { Model } from "mongoose";


@Injectable()
export class EmployerService{

        constructor(private employerModel : Model<EmployerDocument>){}

   async create(employerData : CreateEmployerDTO){
            const response =  await this.employerModel.create(employerData);
            return response;
    }
}