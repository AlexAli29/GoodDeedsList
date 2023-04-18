import {prop} from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';


export class RefreshToken{
  @prop()
  token:string;
  @prop({default: ()=>Date.now()})
  tokenCreated:Date;
  @prop({default: ()=>new Date().setDate(new Date().getDate()+15)})
  tokenExpires:Date;
}

export interface UserModel extends Base{}
export class UserModel extends TimeStamps {

  @prop({unique:true})
  name:string;

  @prop({unique:true})
  email:string;

  @prop()
  passwordHash:string;

  @prop({ type: () => [Types.ObjectId] })
  friendsIds: Types.ObjectId[] ;

  @prop({type:()=>RefreshToken, _id: false })
  refreshToken:RefreshToken;

}