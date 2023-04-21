export default interface Request{
  
  _id:string

  senderId:string
  
  senderName:string
 
  recipientId: string
 
  status:RequestStatus
}

enum RequestStatus{
  Pending,
  Accepted,
  Rejected
  }