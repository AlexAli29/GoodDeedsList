import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from 'nestjs-typegoose';
import { DeedModel, DeedStatus } from './deed.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { Types } from 'mongoose';
import { DeedDto } from './dto/deed.dto';

@Injectable()
export class DeedService {

  constructor(@InjectModel(DeedModel) private readonly deedModel:ModelType<DeedModel>,private readonly configService :ConfigService){}

  async add(userId :Types.ObjectId, dto: DeedDto ):Promise<DocumentType<DeedModel> | null>{
    const newDeed = new this.deedModel({     
  userId : userId,

  title:dto.title,

  description:dto.description,

  status:DeedStatus.Started,

    })

    const deed = await newDeed.save();

    return deed;
  }


  async update (newDeed: DeedModel ):Promise<DocumentType<DeedModel> | null>{

    return this.deedModel.findByIdAndUpdate(newDeed._id,{ 
      title:newDeed.title,
      description:newDeed.description,
      status:newDeed.status
    },
      { new: true });
  }


  async delete (id:Types.ObjectId ):Promise<DocumentType<DeedModel> | null>{

    return this.deedModel.findByIdAndDelete(id).exec();
}

async getUsersDeeds(userId:Types.ObjectId){

  return this.deedModel.find({userId}).exec();

}

async findUserDeedByDescription(userId:Types.ObjectId,description:string):Promise<DocumentType<DeedModel> | null>{
  return this.deedModel.findOne({userId,description}).exec();
}

async findUserDeedByTitle(userId:Types.ObjectId,title:string):Promise<DocumentType<DeedModel> | null>{
  return this.deedModel.findOne({userId,title}).exec();
}

}