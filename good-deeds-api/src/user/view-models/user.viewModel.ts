import { Types } from "mongoose";

export default class UserViewModel 
{
  _id:Types.ObjectId;

  name:string;
  
  email:string;
  
  friendsIds: Types.ObjectId[];  
  
}