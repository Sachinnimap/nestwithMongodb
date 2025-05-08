import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()
export class Student{
    @Prop({required :true})
    university :string;

    @Prop({required : true})
    course :string;

    @Prop()
    grade? :string;

    @Prop({default :false})
    isUnderInternship : boolean;
}

export const StudentSchema = SchemaFactory.createForClass(Student)
export type StudentDocument = Student & Document;
export const STUDENT_MODEL_NAME = Student.name; //to get name of Student!   