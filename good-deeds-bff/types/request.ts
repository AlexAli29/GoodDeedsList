export default interface Request{
  
  senderId:string
  
 
  recipientId: string
 
  status:RequestStatus
}

enum RequestStatus{
  Pending,
  Accepted,
  Rejected
  }