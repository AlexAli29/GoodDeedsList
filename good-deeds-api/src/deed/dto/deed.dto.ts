import { IsString } from "class-validator";

export class DeedDto{
  @IsString()
  title:string;
  @IsString()
  description:string;
}