import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUserModel, UserModelName } from "src/schemas/user";
import { CreateUserDTO } from "./dto/createUserDTO";
import { UpdateUserDTO } from "./dto/updateUserDTO";
import { AccountLoginDTO } from "./dto/accountLoginDTO";


@Injectable()
export class UsersService{

    constructor(@InjectModel(UserModelName) private readonly userModel:IUserModel){}

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

      async loginUser(userData : AccountLoginDTO){
            try{        
             const   {email,password } = userData ;
             //with static method which we created in Users-Schema 
              const user =  await this.userModel.findByEmailAndPassword(email,password)
              if(!user) throw new BadRequestException("Invalid Credentials")
                return user

              /* //+password will add password in userData becouse in schema we not giving password in body!
              const isUser =  await this.userModel.findOne({email:email },"+password") 
              if(!isUser) throw new BadRequestException("Invalid credentials!")

                //instead of writing compare method here we created this method in schema
                // const checkPassword = await compare(password , isUser.password)
 
                _________Instance method____________________
                const checkPassword  = await isUser.isValidPassword(password) //working
              if(!checkPassword) throw new BadRequestException("Invalid credentials!")
                return isUser; */
            }catch(error){
                throw new BadRequestException(error.message)
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

      async search(name: string){
        console.log("Name",name)
        // await this.userModel.find({ name: new RegExp(name, "i")})   
                /* instead of above query we can write query method direclty inside schema and can use */
            const getData = this.userModel.find().byName(name)
            // console.log("GetData",getData)
            return getData;
      }
}