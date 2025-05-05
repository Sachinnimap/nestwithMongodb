import { Module } from "@nestjs/common";
import { JobController } from "./jobs.controller";
import { MongooseModule } from "@nestjs/mongoose";
import {jobModelName, JobSchema} from   "../../schemas/job"
import { JobService } from "./jobs.service";
import { UserModule } from "../users/users.module";

@Module({
    /* becouse we created mongooseModelsModule thats why we don't need to declare here also
    if we only using here then we can use this way - import and export */

    imports : [
        // MongooseModule.forFeature([{name:jobModelName, schema:JobSchema}])
        UserModule
        ],
    controllers  : [JobController],
    providers : [JobService],
    // exports : [MongooseModule]
})

export class JobModule{}