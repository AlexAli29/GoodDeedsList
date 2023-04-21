import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { FriendRequestModel, RequestStatus } from './request.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { ALREADY_FRIEND } from './request.constants';

@Injectable()
export class RequestService {
  constructor(@InjectModel(FriendRequestModel) private readonly requestModel:ModelType<FriendRequestModel>,private readonly userService: UserService ,private readonly configService :ConfigService){}

  async createRequest (senderId:Types.ObjectId,recipientName:string):Promise<DocumentType<FriendRequestModel> | null>{

    const sender = await this.userService.findUserById(senderId);
    
   const recipient = await this.userService.findUserByName(recipientName);
   

   if(sender.friendsIds.includes(recipient._id)){
    throw new ConflictException(ALREADY_FRIEND);
   }

   if(recipient.friendsIds.includes(sender._id)){
    throw new ConflictException(ALREADY_FRIEND);
   }

   const newRequest= new this.requestModel({
    senderId:senderId,
    senderName:sender.name,
    recipientId:(await recipient)._id,
    status:RequestStatus.Pending
   })

   const request = await newRequest.save();

   return request;
  } 
  
  async getRequestsByRecipientId (recipientId:Types.ObjectId):Promise<DocumentType<FriendRequestModel>[] | null>{

    return await this.requestModel.find({recipientId});
  }

  async deleteRequest (_id:Types.ObjectId):Promise<DocumentType<FriendRequestModel> | null>{
    return await this.requestModel.findByIdAndDelete(_id).exec();
  }
}
