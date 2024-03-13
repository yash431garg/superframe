import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession, logout } from '@/lib';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/auth' || path === '/signup';

  const session = await getSession();

  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL('/auth', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/add',
    '/api/query_event/:path*',
    '/api/query_event_link/:path*',
    // '/api/subscribe/:path*',
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
