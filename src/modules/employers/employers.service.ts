import { Injectable } from "@nestjs/common";
import { CreateEmployerDTO } from "./dto/createEmployerDTO";
import { Employer_MODEL_NAME, EmployerDocument } from "src/schemas/employer";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserModelName } from "src/schemas/user";


@Injectable()
export class EmployerService{
 // student and employer in User Collection - latest method
    private employerModel: Model<EmployerDocument>;
    constructor (@InjectModel(UserModelName) private userModel: Model<UserDocument>){ }
   
    onModuleInit(){
        const discriminator = this.userModel.discriminators?.[Employer_MODEL_NAME];
        if (!discriminator) {
          throw new Error(`Discriminator model ${Employer_MODEL_NAME} not registered`);
        }
        this.employerModel = discriminator as Model<EmployerDocument>;
    }

   async create(employerData : CreateEmployerDTO){
            const response =  await this.employerModel.create(employerData);
            return response;
    }
}