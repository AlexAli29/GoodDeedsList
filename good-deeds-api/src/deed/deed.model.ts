import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from "mongoose";

export enum DeedStatus{
  Started,
  Done,
  Cancelled
}

export interface DeedModel extends Base {}
export class DeedModel extends TimeStamps {

  @prop({type:()=> Types.ObjectId})
  userId : Types.ObjectId

  
  @prop()
  title:string;
  @prop()
  description:string;

  @prop({enum: DeedStatus})
  status:DeedStatus;
}