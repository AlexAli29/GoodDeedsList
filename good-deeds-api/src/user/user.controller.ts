import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, UseFilters, UseGuards } from '@nestjs/common';
import { USER_NOT_FOUND } from 'src/auth/auth.constants';
import { AccessTokenAuthGuard } from 'src/auth/guards/access-token.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserService } from './user.service';
import { MongoExceptionFilter } from 'src/filters/mongo-exeption.filter';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { Types } from 'mongoose';
import UserViewModel from './view-models/user.viewModel';

@Controller('user')
export class UserController {

  constructor(private readonly userService:UserService){}  

  @UseGuards(AccessTokenAuthGuard)
  @Get()
  async getcurrentUser(@UserId() id:Types.ObjectId){

    const User = await this.userService.findUserById(id);

    if (!User) {      
			throw new NotFoundException(USER_NOT_FOUND);      
		}  

    return User
  }

  @HttpCode(201)
  @UseGuards(AccessTokenAuthGuard)
  @Delete()
  async delete(@UserId() id:Types.ObjectId){

    const deletedUser = await this.userService.deleteUser(id);
  
    if (!deletedUser) {      
			throw new HttpException(USER_NOT_FOUND,HttpStatus.NOT_FOUND)     
		}  
  }

  @HttpCode(201)
  @UseGuards(AccessTokenAuthGuard)
  @UseFilters(MongoExceptionFilter)
  @Patch()
  async update(@UserId() id:Types.ObjectId, @Body() dto:RegisterUserDto){

    const updatedUser = await this.userService.updateUser(id,dto);

    if(!updatedUser){
      throw new HttpException(USER_NOT_FOUND,HttpStatus.NOT_FOUND)
    }

    return{
      updatedUser
    }

  }

  @UseGuards(AccessTokenAuthGuard)
  @Get('friends')
  async getFriends(@UserId() id:Types.ObjectId){
    const friends = await this.userService.getFriends(id);

    return friends;
  }

  @UseGuards(AccessTokenAuthGuard)
  @Post('friends/:recipientId')
  async addFriend(@UserId() senderId:Types.ObjectId,@Param('recipientId') recipientId:Types.ObjectId){
    const friends = await this.userService.addFriend(senderId,recipientId);

    return friends;
  }

  @UseGuards(AccessTokenAuthGuard)
  @Delete('friends/:friendToDeleteId')
  async deleteFriend(@UserId() senderId:Types.ObjectId,@Param('friendToDeleteId') friendToDeleteId:Types.ObjectId){
    const friends = await this.userService.deleteFriend(senderId,friendToDeleteId);
    
    return friends;
  }

}
