import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { JobService } from "./jobs.service";
import { CreateJobDTO } from "./dto/createJobDTO";
import { UpdateJobDTO } from "./dto/updateJobDTO";


@Controller("jobs")
export class JobController{

    constructor(private jobService:JobService){}

    @Get()
    getJobs(){
      return  this.jobService.getAllJobs()
    }

    @Get(":id")
    getJob(@Param("id") jobId:string){
        return this.jobService.getJob(jobId)
    }

    @Post()
    postJob(@Body() jobData:CreateJobDTO){
        
        return this.jobService.createJob(jobData)
    }

    @Put(":id")
    updateJob(@Param("id") jobId:string, @Body() jobData : UpdateJobDTO){
        return this.updateJob(jobId, jobData)
    }

    @Delete(":id")
    deleteJob(@Param("id") jobId:string){
        return this.deleteJob(jobId)
    }
}