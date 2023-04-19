import { Types } from "mongoose";
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";


export enum RequestStatus{
Pending,
Accepted,
Rejected
}

export interface FriendRequestModel extends Base {}
export class FriendRequestModel extends TimeStamps{

  @prop()
  senderId:Types.ObjectId;
  
  @prop()
  recipientId: Types.ObjectId;

  @prop({enum:RequestStatus})
  status:RequestStatus
}