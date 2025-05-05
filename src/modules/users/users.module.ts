import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import {UserModelName, UserSchema} from "../../schemas/user"
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    /*  we created mongooseModelsModule that why i commented MongooseModule.forFeature method! */
    // imports : [MongooseModule.forFeature([{name: UserModelName, schema : UserSchema}])],
    controllers : [UsersController],
    providers : [UsersService],
    exports  :[
        // MongooseModule
        UsersService
    ]
})
export class UserModule{

}