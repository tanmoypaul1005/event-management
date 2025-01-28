import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { authPaths } from './util/const';

export async function middleware(request) {

  const token = request.cookies.get('accessToken')?.value;

  // console.log('Token:', token); // Log the token for debugging

  // If there is no token, redirect to the login page
  // if (!token) {
  //   console.log('No token found, redirecting to login');
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }
  // If the token is not present and the request is not for the login or signup page, redirect to the login page
  if (!token && !request.nextUrl.pathname.startsWith(authPaths.login) && !request.nextUrl.pathname.startsWith(authPaths.register)) {
    return NextResponse.redirect(new URL(authPaths.login, request.url));
  }

  // If the token is present and the request is for the login page, redirect to the dashboard
  else if (token && request.nextUrl.pathname.startsWith(authPaths.login)) {
    return NextResponse.redirect(new URL(dashBoardPath, request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();


  //   try {
  //     // Verify the token
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'pp');
  //     console.log('Token verified:', decoded); // Log the decoded token for debugging

  //     // If the token is valid, allow the request to proceed
  //     return NextResponse.next();
  //   } catch (err) {
  //     console.error('Token verification failed:', err); // Log the error for debugging

  //     // If the token is invalid, redirect to the login page
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
}

// Specify the paths where the middleware should be applied
export const config = {
  matcher: [
    // Apply middleware to all paths except for the specified public routes
    '/',
  ],
};