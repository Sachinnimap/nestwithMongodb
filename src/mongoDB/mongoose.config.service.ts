import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {  MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";



@Injectable()
export class mongooseConfigService implements MongooseOptionsFactory{
    constructor(private config:ConfigService){} 

    createMongooseOptions(): Promise<MongooseModuleOptions> | MongooseModuleOptions {
        const username  = this.config.get<string>("DATABASE_USER")
        const password  = this.config.get<string>("DATABASE_PASSWORD")
        const dbhost  = this.config.get<string>("DATABASE_HOST")
        const dbName = this.config.get<string>("DATABASE_NAME") || "test"; // 'test' if not provided

    return {
      uri: `mongodb://localhost:27017/${dbName}`,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    };
  }
}