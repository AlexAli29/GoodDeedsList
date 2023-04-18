import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../../user/user.model';
import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
constructor( readonly configService: ConfigService){
  super({
    jwtFromRequest: ExtractJwt.fromExtractors([
      RefreshTokenStrategy.extractTokenFromCookie,
    ]),    
    secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),

  });
}

validate({_id}:Pick<UserModel,'_id'>){
  return _id;
}

private static extractTokenFromCookie(req: Request): string | null {
  if (req.cookies && req.cookies.refresh_token) {
    return req.cookies.refresh_token;
  }
  return null;
}

}