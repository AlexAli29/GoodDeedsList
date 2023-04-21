import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest){
  
  if(request.url.includes('/login') || request.url.includes('/register') || request.url==process.env.NEXT_PUBLIC_API_BASE_URL ){
    
    if(request.cookies.get('refresh_token')){
      
      return NextResponse.redirect(new URL('/deeds', request.url))
    }
  }

  if((request.url.includes('/deeds') || request.url.includes('/user'))){
  
    if(!request.cookies.get('refresh_token')){
      
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}