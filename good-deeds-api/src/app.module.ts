import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DeedModule } from './deed/deed.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypegooseModule} from 'nestjs-typegoose'
import { getMongoConfig } from './configs/mongo.config';
import { UserModule } from './user/user.module';
import { RequestModule } from './request/request.module';



@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:getMongoConfig,
    }),
    AuthModule, 
    DeedModule, UserModule, RequestModule,
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
