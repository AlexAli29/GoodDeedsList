export default interface Deed{
  
_id:string |null;

userId:string | null;

title:string | null;

description:string | null;

status:DeedStatus | null;

createdAt:string |null;

}


export enum DeedStatus{
  Started,
  Done,
  Cancelled
}