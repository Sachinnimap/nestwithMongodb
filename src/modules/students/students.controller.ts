import { Body, Controller, Post } from "@nestjs/common";
import { StudentService } from "./students.service";
import { CreateStudentDTO } from "./dto/createStudentDTO";

@Controller("students")
export class StudentController{

        constructor(private studentService :StudentService){}

        @Post()
        create(@Body() studentBody : CreateStudentDTO){
                return this.studentService.create(studentBody);
        }
}