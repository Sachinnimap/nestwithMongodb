import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { mongooseConfigService } from './mongoDB/mongoose.config.service';
import { DatabaseModule } from './mongoDB/database.module';
import { UserModule } from './modules/users/users.module';
import { JobModule } from './modules/jobs/jobs.module';
import { mongooseModelsModule } from './modules/modelsModule/mongooseModelsModule';

@Module({
  imports: [
      mongooseModelsModule,
    DatabaseModule,UserModule,JobModule
    // ConfigModule.forRoot({isGlobal: true}),
    // // MongooseModule.forRoot("mongodb://localhost:2701/nest_app_db")
    // MongooseModule.forRootAsync({
    //   // imports :[ConfigModule], //if isGlobal true then don't need to write here
    //   useClass : mongooseConfigService
    // })
    ],

  controllers: [],
  providers: [],
})
export class AppModule {}
