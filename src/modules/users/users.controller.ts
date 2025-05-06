import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/createUserDTO";
import { UpdateUserDTO } from "./dto/updateUserDTO";
import { AccountLoginDTO } from "./dto/accountLoginDTO";


@Controller("users")
export class UsersController{

        constructor(private readonly userService: UsersService){}

        @Get("search")
        findByName(@Query("name") name : string){
            
            return this.userService.search(name);
        }
    @Get()
    findAll(){ 
        return this.userService.getAllUsers()
    }

    @Get(":id")
    findOne(@Param("id") userId: string){
        return this.userService.getUser(userId)
    }

    @Post()
    createUser(@Body() body:CreateUserDTO){
        return this.userService.addNewUser(body)
    }

    @Post("login")
    @HttpCode(200)
    loginUser(@Body() userData: AccountLoginDTO){
           return this.userService.loginUser(userData)
    }

    @Put(":id")
    updateUser(@Param("id") userId:string,  @Body() body: UpdateUserDTO ){
        return this.userService.updateUser(userId, body)
    }

    @Delete(":id")
    deleteUser(@Param("id") userId:string){
        return this.userService.deleteUser(userId)
    }

  

}