import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, UseFilters, UseGuards } from '@nestjs/common';
import { DeedDto } from './dto/deed.dto';
import { DeedModel } from './deed.model';
import { DeedService } from './deed.service';
import { AccessTokenAuthGuard } from 'src/auth/guards/access-token.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import {DEED_NOT_FOUND, DESCRIPTION_ALREADY_EXISTS, TITLE_ALREADY_EXISTS} from './deed.costants'
import { Types } from 'mongoose';
import { MongoExceptionFilter } from 'src/filters/mongo-exeption.filter';

@Controller('deed')
export class DeedController {

  constructor(private readonly deedService : DeedService){}


@UseGuards(AccessTokenAuthGuard)
@Post()  
async create(@Body() dto:DeedDto,@UserId() userId){

  const deedByTitle = await this.deedService.findUserDeedByTitle(userId,dto.title);
  if(deedByTitle){
    throw new HttpException(TITLE_ALREADY_EXISTS,HttpStatus.CONFLICT)
  }

  const deedByDescription = await this.deedService.findUserDeedByDescription(userId,dto.title);
  if(deedByDescription){
    throw new HttpException(DESCRIPTION_ALREADY_EXISTS,HttpStatus.CONFLICT)
  }

  return await this.deedService.add(userId,dto);
}

@UseGuards(AccessTokenAuthGuard)
@Get()
async get(@UserId() userId){
  
  return await this.deedService.getUsersDeeds(userId);
}

@UseGuards(AccessTokenAuthGuard)
@Delete(':id')
async delete(@Param('id') id:Types.ObjectId){

  const deletedDeed = await this.deedService.delete(id)
  if(!deletedDeed){
    throw new HttpException(DEED_NOT_FOUND,HttpStatus.NOT_FOUND)
  }

  return deletedDeed;
}

@UseGuards(AccessTokenAuthGuard)
@UseFilters(MongoExceptionFilter)
@Patch()
async patch(@Body() dto:DeedModel){

  const updatedDeed = await this.deedService.update(dto)
  if(!updatedDeed){
    throw new HttpException(DEED_NOT_FOUND,HttpStatus.NOT_FOUND)
  }

  return updatedDeed;

}


}
