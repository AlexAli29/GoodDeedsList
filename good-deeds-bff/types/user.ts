export default interface User{
  _id:string | null,  
  name:string | null,  
  email:string | null,    
  friendsIds: [string] | null
}