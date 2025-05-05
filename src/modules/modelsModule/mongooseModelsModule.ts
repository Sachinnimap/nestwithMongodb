import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { jobModelName, JobSchema } from "src/schemas/job";
import { UserModelName, UserSchema } from "src/schemas/user";

const allModels = [
    {name : UserModelName , schema: UserSchema},
    {name: jobModelName , schema : JobSchema}
]

//need global we can use this mongooseModule anywhere in our code
//also need to import this module in app module then only will considered as global!
@Global()
@Module({
    imports : [MongooseModule.forFeature(allModels)],
    controllers :[],
    providers : [],
    exports : [MongooseModule]
})
export class mongooseModelsModule{

}