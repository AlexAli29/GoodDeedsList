export default interface ErrorResponse {
 status:number | null,
 data:{ statusCode: number | null,
  message:string} | null
}