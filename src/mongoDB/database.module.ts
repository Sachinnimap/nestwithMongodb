import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { mongooseConfigService } from "./mongoose.config.service";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    // MongooseModule.forRoot("mongodb://localhost:2701/nest_app_db")
    MongooseModule.forRootAsync({
      // imports :[ConfigModule], //if isGlobal true then don't need to write here
      useClass : mongooseConfigService
    })
    ],

  controllers: [],
  providers: [],
})
export class DatabaseModule{}