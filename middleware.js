import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request) {
 
  const token = request.cookies.get('accessToken')?.value;

  console.log('Token:', token); // Log the token for debugging

  // If there is no token, redirect to the login page
  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

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