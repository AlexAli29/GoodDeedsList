import { Injectable } from '@nestjs/common';
import { UserModel } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { genSalt, hash } from 'bcryptjs';

@Injectable()
export class UserService {

  constructor(@InjectModel(UserModel) private readonly userModel:ModelType<UserModel>,private readonly configService :ConfigService){}


  async deleteUser(id: string) : Promise<DocumentType<UserModel> | null> {

    return this.userModel.findByIdAndDelete(id).exec();
  }

  async updateUser(id: string,dto:RegisterUserDto) : Promise<DocumentType<UserModel> | null> {

    const salt = await genSalt(10); 
   
      return this.userModel.findByIdAndUpdate(id, {
        name:dto.name,
        email:dto.email,
        passwordHash: await hash(dto.password, salt),  
      
      }, { new: true }).exec();    
    
  }

  async findUserById(_id:string):Promise<DocumentType<UserModel> | null>{
    return this.userModel.findById(_id).exec();
  }

  async findUserByEmail(email:string):Promise<DocumentType<UserModel> | null>{
    return this.userModel.findOne({email}).exec();
  }

  async findUserByName(name:string):Promise<DocumentType<UserModel> | null>{
    return this.userModel.findOne({name}).exec();
  }


}
