import { Prop, raw, Schema,SchemaFactory } from "@nestjs/mongoose";
import {ACCOUNTSTATUS, ACCOUNTTYPE} from '../../constants/index'
import { Address, AddressSchema } from "../common/address.schema";


@Schema({timestamps : true})
export class User{

    @Prop({required:true})
    name:string;

    @Prop({required : true})
    email : string;

    @Prop({required : true,select :false})
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
}

const schema  = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;

export const UserModelName = User.name //only name access
export const UserSchema = schema;