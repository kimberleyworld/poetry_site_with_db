import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect admin routes, but exclude the login page
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Check if user has a token (basic check)
    const token = request.cookies.get('admin-token')?.value;
    
    if (!token) {
      // No token present, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // Token exists - detailed verification happens in the page/API routes
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*'
};
