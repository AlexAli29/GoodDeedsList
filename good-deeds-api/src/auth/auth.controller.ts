import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { EMAIL_ALREADY_TAKEN, NAME_ALREADY_TAKEN, USER_NOT_FOUND } from './auth.constants';
import { Response} from 'express';
import { UserId } from 'src/decorators/user-id.decorator';
import { RefreshTokenAuthGuard } from './guards/refresh-token.guard';
import { Types } from 'mongoose';

import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

constructor(private readonly authService : AuthService, private readonly userService:UserService){}

  @UsePipes(new ValidationPipe)
  @Post('register')
  async register (@Body() dto :RegisterUserDto, @Res({ passthrough: true }) res:Response){

    const userByEmail = await this.userService.findUserByEmail(dto.email);
    if(userByEmail){
      throw new HttpException(EMAIL_ALREADY_TAKEN,HttpStatus.CONFLICT)
    }
    const userByName = await this.userService.findUserByName(dto.name);
    if(userByName){
      throw new HttpException(NAME_ALREADY_TAKEN,HttpStatus.CONFLICT)
    }
    const {refresh_token,access_token} = await this.authService.register(dto);

    res.cookie('refresh_token',refresh_token, {httpOnly: true})

    return {
      access_token:access_token
    }
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto :LoginUserDto, @Res({ passthrough: true }) res:Response){
    const user = await this.authService.validateUser(dto);

    const {refresh_token,access_token} = await this.authService.login(user);

    res.cookie('refresh_token',refresh_token, {httpOnly: true})

    return {
      access_token:access_token
    }
    
  }

  @UseGuards(RefreshTokenAuthGuard)
  @Get('refresh')
  async refresh (@UserId() _id:Types.ObjectId,@Res({ passthrough: true }) res:Response){

    const {refresh_token,access_token} = await this.authService.refresh(_id);

    res.cookie('refresh_token',refresh_token, {httpOnly: true})

    return {
      access_token:access_token
    }
  }

}
