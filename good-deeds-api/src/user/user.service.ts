import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { genSalt, hash } from 'bcryptjs';
import { Types } from 'mongoose';
import { USER_NOT_FOUND } from 'src/auth/auth.constants';
import { FRIEND_NOT_FOUND } from './user.constants';
import UserViewModel from './view-models/user.viewModel';

@Injectable()
export class UserService {

  constructor(@InjectModel(UserModel) private readonly userModel:ModelType<UserModel>,private readonly configService :ConfigService){}


  async deleteUser(id: Types.ObjectId) : Promise<DocumentType<UserViewModel> | null> {

    return this.userModel.findByIdAndDelete(id).exec();
  }

  async updateUser(id: Types.ObjectId,dto:RegisterUserDto) : Promise<DocumentType<UserModel> | null> {

    const salt = await genSalt(10); 
   
      return this.userModel.findByIdAndUpdate(id, {
        name:dto.name,
        email:dto.email,
        passwordHash: await hash(dto.password, salt),  
      
      }, { new: true }).exec();    
    
  }

async addFriend(senderId:Types.ObjectId, recipientId:Types.ObjectId){
  const sender = await this.userModel.findById(senderId);
  const recipient = await this.userModel.findById(recipientId);
  if(!(sender && recipient))
  {
    throw new NotFoundException(USER_NOT_FOUND);
  }

  sender.friendsIds.push(recipient._id);
  (await sender.save()).isNew=false;

  recipient.friendsIds.push(sender._id);
  (await recipient.save()).isNew=false;
  
  return recipient._id;
}


async getFriends(friendsIds:Types.ObjectId[]){

  const friends :Pick<UserModel,'_id' | 'name'>[]= await this.userModel.find({ _id: { $in: friendsIds } }).select('_id name').exec();

  return friends
}

async deleteFriend(senderId:Types.ObjectId,friendToDeleteId:Types.ObjectId){

  const sender = await this.userModel.findById(senderId).exec();

  if(!sender){
    throw new NotFoundException(USER_NOT_FOUND);
  }

  const friendIndex =sender.friendsIds.findIndex(id => id = friendToDeleteId);

  if(friendIndex==-1){
    throw new NotFoundException(FRIEND_NOT_FOUND);
  }

  sender.friendsIds.slice(friendIndex,1);
  
  (await sender.save()).isNew=false;
}

  async findUserById(_id:Types.ObjectId):Promise<UserViewModel | null>{
    const user = await this.userModel.findById
    (_id).exec();
    if(!user){
      return null;
    }
    const userViewModel = new UserViewModel();
    userViewModel._id = user._id;
    userViewModel.name = user.name;
    userViewModel.email= user.email;
    userViewModel.friendsIds= user.friendsIds;
    
    return userViewModel
  }

  async findUserByEmail(email:string):Promise<UserViewModel | null>{

    const user =await this.userModel.findOne({email}).exec();
    if(!user){
      return null
    }
    
    const userViewModel = new UserViewModel();
    userViewModel._id = user._id;
    userViewModel.name = user.name;
    userViewModel.email= user.email;
    userViewModel.friendsIds= user.friendsIds;


    return userViewModel    
  }

  async findUserByName(name:string):Promise<DocumentType<UserModel> | null>{    
    return this.userModel.findOne({name}).exec();
  }


}
