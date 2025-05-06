import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { StudentDocument } from "src/schemas/student";
import { CreateStudentDTO } from "./dto/createStudent.dto";


@Injectable()
export class StudentService{
    constructor (private studentModel: Model<StudentDocument>){}
   async create(studentBody : CreateStudentDTO){
        const response  = await this.studentModel.create(studentBody)
        return response;
    }
}