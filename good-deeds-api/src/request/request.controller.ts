import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { Types } from 'mongoose';
import { NO_REQUESTS } from './request.constants';
import { AccessTokenAuthGuard } from '../auth/guards/access-token.guard';


@Controller('request')
export class RequestController {

  constructor(private readonly requestService: RequestService){}

  @UseGuards(AccessTokenAuthGuard)
  @Get()
  async get(@UserId() recipientId:Types.ObjectId){
    const usersRequests = await this.requestService.getRequestsByRecipientId(recipientId);

    if (!usersRequests){
      throw new HttpException(NO_REQUESTS,HttpStatus.NOT_FOUND)
    }

    return usersRequests;
  }

  @UseGuards(AccessTokenAuthGuard)
  @Post()
  async create(@UserId() senderId:Types.ObjectId,@Body('recipientName') recipientName:string){
   
    const request = await this.requestService.createRequest(senderId,recipientName);

    return request;
  }

  @UseGuards(AccessTokenAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id:Types.ObjectId){
    
    const deletedRequest = await this.requestService.deleteRequest(id);

    return deletedRequest;
  }
}
