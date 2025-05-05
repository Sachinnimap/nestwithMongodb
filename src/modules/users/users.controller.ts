import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDTO } from "./dto/createUserDTO";
import { UpdateUserDTO } from "./dto/updateUserDTO";


@Controller("users")
export class UsersController{

        constructor(private readonly userService: UsersService){}

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

    @Put(":id")
    updateUser(@Param("id") userId:string,  @Body() body: UpdateUserDTO ){
        return this.userService.updateUser(userId, body)
    }

    @Delete(":id")
    deleteUser(@Param("id") userId:string){
        return this.userService.deleteUser(userId)
    }

}