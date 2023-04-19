import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { FriendRequestModel } from './request.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [RequestController],
  imports:[
    UserModule,
    TypegooseModule.forFeature([
      {
        typegooseClass:FriendRequestModel,
        schemaOptions:{
          collection:'Request'
        }
      }
    ]),
    ConfigModule
  ],  
  providers: [RequestService],
 
  
  
})
export class RequestModule {}
