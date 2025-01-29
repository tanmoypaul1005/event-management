import { NextResponse } from 'next/server';
import { authPaths } from './util/const';

export async function middleware(request) {
  const token = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

//   // Redirect unauthenticated users trying to access protected routes
//   if (!token && !pathname.startsWith(authPaths.login) && !pathname.startsWith(authPaths.register)) {
//     return NextResponse.redirect(new URL(authPaths.login, request.url));
//   }

  // Redirect authenticated users away from login/register pages
  if (token && (pathname.startsWith(authPaths.login) || pathname.startsWith(authPaths.register))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except public ones
export const config = {
  matcher: ['/((?!api|_next|static|public|favicon.ico).*)'],
};
