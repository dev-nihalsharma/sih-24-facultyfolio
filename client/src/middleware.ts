import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/sign-in' || path === '/sign-up' || path === '/forgetPassword';
  const token = request.cookies.get('token')?.value || '';

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/forgetPassword',
    '/workspace',
    '/',
    '/faculty/:path*',
    '/facultyBoard',
    '/facultylist',
    '/timetable',
  ],
};
