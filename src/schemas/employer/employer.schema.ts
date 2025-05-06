import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Employer{

    @Prop({required: true})
    company : string;

    @Prop()
    size? : string

    @Prop({default : []})
    workArea?  :string[]

    @Prop()
    website? : string;

}


export const EmployerSchema = SchemaFactory.createForClass(Employer);
export type EmployerDocument = Employer & Document;
export const Employer_MODEL_NAME = Employer.name;