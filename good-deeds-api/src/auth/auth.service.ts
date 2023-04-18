import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from '../user/user.model';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {compare, genSalt, hash} from 'bcryptjs'
import { USER_NOT_FOUND_LOGIN } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(@InjectModel(UserModel) private readonly userModel:ModelType<UserModel>,private readonly jwtService: JwtService, private readonly configService :ConfigService, private readonly userService:UserService){}

  async register(dto: RegisterUserDto ){

    const salt = await genSalt(10);   

    const newUser = new this.userModel({
      name:dto.name,
      email:dto.email,
      passwordHash: await hash(dto.password, salt),
      refreshToken:null
    
    });

    const user = await newUser.save();
    const payload = {_id: user._id}
    const refreshToken = await this.generateRefreshToken(payload);

    user.updateOne({
      refreshToken:{
        token : refreshToken,
        tokenCreated:new Date(),
        tokenExpires:new Date().setDate(new Date().getDate()+15)
      }
      
    }).exec()

    return {
      refresh_token: refreshToken,
			access_token: await this.jwtService.signAsync(payload)
		};
  } 

  async validateUser(dto: LoginUserDto) {
    const user = await this.userService.findUserByName(dto.name);
    if(!user){
      throw new UnauthorizedException(USER_NOT_FOUND_LOGIN);
    }

    const isCorrectPassword = await compare(dto.password,user.passwordHash)
    if(!isCorrectPassword){
      throw new UnauthorizedException(USER_NOT_FOUND_LOGIN);
    }

    return user;
  }

  async login(user:DocumentType<UserModel>){

    const currentDate = new Date();
    const payload = {_id: user._id}  
    if(user.refreshToken.tokenExpires<currentDate)
    {
      return {
        refresh_token: user.refreshToken.token,
        access_token: await this.jwtService.signAsync(payload)
      };
    }

    const refreshToken = await this.generateRefreshToken(payload);
    user.updateOne({
      refreshToken:{
        token : refreshToken,
      }}).exec()

      return {
        refresh_token: refreshToken,
        access_token: await this.jwtService.signAsync(payload)
      };

  }


  async refresh (_id:Types.ObjectId){    
    const payload = {_id}  

    const refresh_token = await this.generateRefreshToken(payload);
    
    this.userModel.findByIdAndUpdate({
      refreshToken:{
        token : refresh_token,
        tokenCreated:new Date(),
        tokenExpires:new Date().setDate(new Date().getDate()+15)
      }
      
    })

    return {
      refresh_token: refresh_token,
      access_token: await this.jwtService.signAsync(payload)
    };
  }


  async generateRefreshToken(payload:{_id:Types.ObjectId}){
    const refreshToken = await this.jwtService.signAsync(payload,{
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      expiresIn: '15d', 
    }) 

    return refreshToken;
  }

  


 

}


