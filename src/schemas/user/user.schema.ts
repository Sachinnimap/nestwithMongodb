import { Prop, raw, Schema,SchemaFactory } from "@nestjs/mongoose";
import {ACCOUNTSTATUS, ACCOUNTTYPE} from '../../constants/index'
import { Address, AddressSchema } from "../common/address.schema";
import { compare, hash } from "bcrypt";
import { AccountLoginDTO } from "src/modules/users/dto/accountLoginDTO";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";
import { Model, Query } from "mongoose";


@Schema({ 
    timestamps : true,
    discriminatorKey : 'userKind'
    
    // methods  : { async function (this : UserDocument,candidatePassword:string){
    //     const checkPassword = await compare(candidatePassword , this.password)
    //     return checkPassword;
    //   }
    // }
    // statics: write static method here
//     query: {
//         async byName(this:UserModelQuery, name:string){
//         return await this.find({
//             name : new RegExp(name, 'i')
//         })
//     }
// }
})
export class User{

    @Prop({required:true})
    name:string;

    @Prop({required : true})
    email : string;

    @Prop({required : true,select :false}) //select :false - then this will not return in password - need specificaly call this
    password : string
    
    @Prop()
    age? :string

    @Prop()
    phone? : string

    @Prop({
        type : String, // this is for database Only
        enum : Object.keys(ACCOUNTSTATUS),
        default : ACCOUNTSTATUS.ACTIVE
    })
    status? : ACCOUNTSTATUS  //this type is just for suggestion for Us__ for database we need to give type above

    @Prop({
        type : String,
        enum : Object.keys(ACCOUNTTYPE), //convert to array
        immutable : true,
        required :true
    })
    accountType? : ACCOUNTTYPE;

    @Prop({
        default : []
    })
    social?:string[]

    @Prop({
        default :false
    })
    isEmailVerified? : boolean

    @Prop({
       type : AddressSchema,
       required : true
    })
    address : Address;


    @Prop(
        raw({
            reference : {type: String},
            beta : {type : Boolean}
        })
    )
    metadata  : Record<string,any> | any;
    isValidPassword : (candidatePassword: string) => Promise<boolean>
}

const schema  = SchemaFactory.createForClass(User);

//password field hashing - also create this function anywhere and call here 
schema.pre("save", async function (next:Function){
     const hassPassword = await hash(this.password,10) 
     this.password = hassPassword; //hasspassword will save now
    next()
})



// ______________________________________________________
//Instance Methods - below 3 are do same thing just different styles - !

/*Instance METHOD 1 */ //also enter this method in schema so we can use
// schema.method("isValidPassword", async function (candidatePassword:string){
//   const checkPassword = await compare(candidatePassword , this.password)
//   return checkPassword;
// })

/*Instance METHOD 2 */ 
//after creating this method need to add in schema also!
schema.methods.isValidPassword = async function (candidatePassword:string){
    const checkPassword = await compare(candidatePassword , this.password)
    return checkPassword;
  }

// Instance METHOD 3 - declaring in top inside schema but that method is not working still need Research! 


// __________________________________________________________________________

// Model Static method - using this we adding new method like find , findOne
/* method 1 */
// schema.static("findByEmailAndPassword", async function( email : string, password:string){
//         const isUser = this.findOne<UserDocument>({email},"+password")
//         if(!isUser) return;
           
//         // used instance
//         const isPwdMatch = await isUser.isValidPassword(password)

//         if(!isPwdMatch) return;
//         return isUser;
// })

//method 2 - need Model to extend - did below
schema.statics.findByEmailAndPassword = async function(email : string, password:string){
    const isUser = await this.findOne<UserDocument>({email},"+password")
    if(!isUser) return;
       
    // used instance    
    const isPwdMatch = await isUser.isValidPassword(password)

    if(!isPwdMatch) return;
    return isUser;
}

// method 3 - use static method in @Schema decorator above! - not did
// _____________________________________________________________________________________
/* Query Helper methods */

// only for query need to check again it not workig!
// schema.query.byName = function ( name: string) {
//     return this.find({ name: new RegExp(name, 'i') });
//   };

export type UserModelQuery = Query<any, UserDocument,IUserQueryHelpers> & IUserQueryHelpers;
export interface IUserQueryHelpers {
    byName(name: string): UserModelQuery;
  }

// ____________________________________
// also need to add static and query here
export interface IUserModel extends  Model<UserDocument,IUserQueryHelpers>{
 
    findByEmailAndPassword: (email:string, password : string) =>  Promise<UserDocument |undefined>

}

//can discriminator create like this or directly inside @schema decoratore
// schema.set("discriminatorKey", 'userKind') 

export type UserDocument = User & Document;

export const UserModelName = User.name //only name access
export const UserSchema = schema;

