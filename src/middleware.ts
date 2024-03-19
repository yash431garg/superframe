export { default } from 'next-auth/middleware';

// See "Matching Paths" below to learn more
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
