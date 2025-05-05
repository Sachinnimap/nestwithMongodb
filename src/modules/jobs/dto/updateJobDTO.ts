import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateJobDTO } from "./createJobDTO";



export class UpdateJobDTO extends PartialType(OmitType(CreateJobDTO, ["userId"])){

}