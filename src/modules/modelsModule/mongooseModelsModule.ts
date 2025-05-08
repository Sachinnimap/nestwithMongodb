import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Employer_MODEL_NAME, EmployerSchema } from "src/schemas/employer";
import { jobModelName, JobSchema } from "src/schemas/job";
import { STUDENT_MODEL_NAME, StudentSchema } from "src/schemas/student";
import { UserModelName, UserSchema } from "src/schemas/user";

const allModels = [
    {name : UserModelName , schema: UserSchema ,descriminators:[
        {name : Employer_MODEL_NAME, schema : EmployerSchema},
        {name : STUDENT_MODEL_NAME, schema : StudentSchema}
    ]},
    {name: jobModelName , schema : JobSchema}
]

//need global we can use this mongooseModule anywhere in our code
//also need to import this module in app module then only will considered as global!
@Global()
@Module({
    imports : [MongooseModule.forFeature(allModels , "APP")], //all the collection will store in "APP" database! 
    controllers :[],
    providers : [],
    exports : [MongooseModule]
})
export class mongooseModelsModule{

}