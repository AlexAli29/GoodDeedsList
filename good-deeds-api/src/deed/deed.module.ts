import { Module } from '@nestjs/common';
import { DeedController } from './deed.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { DeedModel } from './deed.model';
import { DeedService } from './deed.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [DeedController],
  imports:[
    TypegooseModule.forFeature([
      {
        typegooseClass:DeedModel,
        schemaOptions:{
          collection:'Deeds'
        }
      }
    ]),
    ConfigModule
  ],
  providers: [DeedService]
})
export class DeedModule {}
