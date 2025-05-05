import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { JobType } from "src/constants";
import { Address, AddressSchema } from "../common/address.schema";
import {Document, Types} from "mongoose";
import { User, UserModelName } from "../user/user.schema";

@Schema({timestamps : true})
export class Job{

    @Prop({type  : Types.ObjectId,ref:UserModelName,  required : true}) //dynamic name of model - userModelName
    userId : string | Types.ObjectId | User

    @Prop({required : true})
    companyName : string

    @Prop({required : true})
    title : string

    @Prop({required : true })
    description : string

    @Prop({required : true})
    experience : number

    @Prop({default  : []})
    tags : string[]

    @Prop()
    salary : string

    @Prop({
        enum :Object.keys(JobType),
        type  : String,
        required : true
    })
    type : JobType

    @Prop({
        type  : AddressSchema,
        required  : true
    })
    location : Address
}

const schema = SchemaFactory.createForClass(Job)

export type JobDocument = Job & Document;
export const jobModelName = Job.name;
export const JobSchema = schema;    