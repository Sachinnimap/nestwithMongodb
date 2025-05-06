import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { JobType } from "src/constants";
import { Address, AddressSchema } from "../common/address.schema";
import {Document, Types} from "mongoose";
import { User, UserModelName } from "../user/user.schema";

 function populateFunc(next: Function){
    this.populate({path:"employer",select:{"name":1}}) //only give name and _id
    next()
 }
@Schema({timestamps : true})
export class Job{

    @Prop({type  : Types.ObjectId,ref:UserModelName,  required : true}) //dynamic name of model - userModelName
    employer : string | Types.ObjectId | User

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

//instead of passing  function here we created common funtion to handle populate and given reference below
// schema.pre("find",function (next:Function){
//         this.populate({path :"employer", select:{"name":1}})
//         next()
// })

//after doing this we dont need to write populate in query this will do populate for all find and findOne
schema.pre("find",populateFunc)
schema.pre("findOne",populateFunc) //also handle findById 

export type JobDocument = Job & Document;
export const jobModelName = Job.name;
export const JobSchema = schema;    