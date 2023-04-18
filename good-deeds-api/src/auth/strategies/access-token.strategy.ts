import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserModel } from '../../user/user.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy,'jwt-access') {
constructor(readonly configService: ConfigService){
  super({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),    
    secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
  });
}

validate({_id}:Pick<UserModel,'_id'>){
  return _id;
}

}