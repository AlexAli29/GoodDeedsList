import { Types } from "mongoose";
import { prop } from '@typegoose/typegoose';


export enum RequestStatus{
Pending,
Accepted,
Rejected
}

export class FriendRequestModel{

  @prop()
  senderId:Types.ObjectId;
  
  @prop()
  recipientId: Types.ObjectId;

  @prop()
  status:RequestStatus
}