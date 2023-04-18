import {IsEmail, IsString, Length} from 'class-validator'

export class RegisterUserDto{
  @IsString()
  name:string;

  @IsEmail()
  @IsString()
  email:string;

  @Length(8,20)
  @IsString()
  password:string;
}