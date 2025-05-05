import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, UserModelName } from "src/schemas/user";
import { CreateUserDTO } from "./dto/createUserDTO";
import { UpdateUserDTO } from "./dto/updateUserDTO";


@Injectable()
export class UsersService{

    constructor(@InjectModel(UserModelName) private readonly userModel:Model<UserDocument>){}

    async getAllUsers(){
            try{
              const usersData =  await this.userModel.find();
              return usersData
            }catch(error){
                    if(error.name === "ValidationError"){
                        throw new BadRequestException(error.errors)
                    }
                    
                    throw new ServiceUnavailableException();
                         
            }
      }

      async getUser(id:string){
            try{
                const userData = await this.userModel.findById(id);
                if(!userData) throw new NotFoundException("User not found")
                return userData
            }catch(error){
                // console.log("error.name",error.name)
                if(error.name === "NotFoundException")
                throw new NotFoundException(error.message)
            throw new BadRequestException()
            }
      }

      async addNewUser(data:CreateUserDTO){
        try{
        const userData = await this.userModel.create(data)
        // console.log("userData",userData)
        return userData; 
        }catch(error){
            // console.log(error)
            if(error.name === "ValidationError"){
                throw new BadRequestException(error.message)
            }
            throw new ServiceUnavailableException();
        }
      }

      async updateUser(id:string, data:UpdateUserDTO){
            try{
                console.log("Data",data)
                const updatedData = await this.userModel.findByIdAndUpdate(id,data,{new:true})

                if(!updatedData){
                    throw new NotFoundException("User not found!")
                }
                return updatedData;

            }catch(error){
                if(error.name ===  "ValidationError"){
                    throw new BadRequestException()
                }
                throw new ServiceUnavailableException()
            }
      }

      async deleteUser(id:string){
        try{
           const response =  await this.userModel.findByIdAndDelete({id})
           if(!response) throw new NotFoundException("User not found!")
           return response;
        }catch(error){
            if(error.name === "ValidationError"){
                throw new BadRequestException()
            }
            throw new ServiceUnavailableException()
        }
      }
}