import { Injectable } from "@nestjs/common";
import { STUDENT_MODEL_NAME,StudentDocument } from "src/schemas/student";
import { CreateStudentDTO } from "./dto/createStudentDTO";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument, UserModelName } from "src/schemas/user";


@Injectable()
export class StudentService{
    // student and employer in User Collection - latest method
    private studentModel: Model<StudentDocument>;
    constructor (@InjectModel(UserModelName) private userModel: Model<UserDocument>){
       
    }
    onModuleInit(){
        const discriminator = this.userModel.discriminators?.[STUDENT_MODEL_NAME];
        if (!discriminator) {
          throw new Error(`Discriminator model ${STUDENT_MODEL_NAME} not registered`);
        }
        this.studentModel = discriminator as Model<StudentDocument>;
    }
   async create(studentBody : CreateStudentDTO){
        const response  = await this.studentModel.create(studentBody)
        return response;
    }
}