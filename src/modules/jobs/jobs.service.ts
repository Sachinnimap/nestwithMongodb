import { BadRequestException, ForbiddenException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JobDocument, jobModelName } from "src/schemas/job";
import { CreateJobDTO } from "./dto/createJobDTO";
import { UpdateJobDTO } from "./dto/updateJobDTO";
import { UsersService } from "../users/users.service";
import { ACCOUNTTYPE } from "src/constants";


@Injectable()
export class JobService{

    constructor(@InjectModel(jobModelName) private jobModel:Model<JobDocument> , private userService: UsersService){}


    async getAllJobs(){
        try{
        const response = await this.jobModel.find()
            return response;
        }catch(error){
            throw new BadRequestException(error.message)
        }
    }
    async getJob(id:string){
        try{
        const response  = await this.jobModel.findById(id)
            return response;
        }catch(error){
                if(error.name === 'NotFoundException'){
                    throw new NotFoundException("Job not found!")
                }
                throw new ServiceUnavailableException()
        }
    }
    async createJob(body:CreateJobDTO){
        try{
            //   const isValidUser =  await this.userService.getUser(body.userId)
            // if(!isValidUser) throw new BadRequestException("Employer not found")
            // if(isValidUser.accountType != ACCOUNTTYPE.EMPLOYER) throw new ForbiddenException("Only employer can create job")
            const response = await this.jobModel.create(body)
            return response; 
        }catch(error){
            if(error.name === "ValidationError")
            throw new BadRequestException(error.messase)
        throw new ServiceUnavailableException(error.message)
        }
    }
    async updateJob(id:string, body:UpdateJobDTO){
        try{
        const response = await this.jobModel.findByIdAndUpdate(id,body,{new:true})
        return response;
        }catch(error){
                if(error.name === "ValidationError"){
                    throw new BadRequestException(error.message)
                }
                throw new ServiceUnavailableException(error.message)
        }
    }
    async deleteJob(id:string){
        try {
            const response = await this.jobModel.findByIdAndDelete(id)
            return {
                _id : id
            }
        } catch (error) {
                    if(error.name  === 'NotFoundException')
                    throw new  NotFoundException(error.message)
                throw new ServiceUnavailableException(error.message)
        }
    }
}