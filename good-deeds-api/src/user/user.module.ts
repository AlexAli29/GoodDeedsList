import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from './user.model';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    TypegooseModule.forFeature([
      {
        typegooseClass:UserModel,
        schemaOptions:{
          collection:'Users'
        }
      }
    ]),
    ConfigModule,
  ],
  providers: [UserService],
  exports:[TypegooseModule,UserService],
  controllers: [UserController]
})
export class UserModule {}
