import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Patch, UseFilters, UseGuards } from '@nestjs/common';
import { USER_NOT_FOUND } from 'src/auth/auth.constants';
import { AccessTokenAuthGuard } from 'src/auth/guards/access-token.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserService } from './user.service';
import { MongoExceptionFilter } from 'src/filters/mongo-exeption.filter';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService:UserService){}

  

  @UseGuards(AccessTokenAuthGuard)
  @Get()
  async getcurrentUser(@UserId() id:string){

    const User = await this.userService.findUserById(id);
  
    if (!User) {      
			throw new NotFoundException(USER_NOT_FOUND);      
		}  

    return User
  }

  @HttpCode(201)
  @UseGuards(AccessTokenAuthGuard)
  @Delete()
  async delete(@UserId() id:string){

    const deletedUser = await this.userService.deleteUser(id);
  
    if (!deletedUser) {      
			throw new NotFoundException(USER_NOT_FOUND);      
		}  
  }

  @HttpCode(201)
  @UseGuards(AccessTokenAuthGuard)
  @UseFilters(MongoExceptionFilter)
  @Patch()
  async update(@UserId() id:string, @Body() dto:RegisterUserDto){

    const updatedUser = await this.userService.updateUser(id,dto);

    return{
      updatedUser
    }

  }
}
