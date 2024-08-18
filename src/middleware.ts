import { NextRequest, NextResponse } from 'next/server';
import { getJwtPayload } from './app/actions/validate';

export async function middleware(request: NextRequest) {
  const token = await getJwtPayload()
  if(!token){
    return NextResponse.redirect(new URL('/auth', request.nextUrl));
  }  
}

export const config = {
  matcher: [
    '/',
    '/add',
    '/subscribers/:id*',
    '/api/query_event/:path*',
    '/api/query_event_link/:path*',
    '/api/query_subscribers/:path*',
  ],
};
