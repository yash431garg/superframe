export { default } from 'next-auth/middleware';

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
