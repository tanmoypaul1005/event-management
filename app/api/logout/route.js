import connectMongo from '@/util/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {

    await connectMongo();
    // Clear the authentication token (e.g., by clearing a cookie)

    const authHeader = request.headers.get('Authorization');
    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return Response.json({
            success: false,
            message: "No token provided",
            status: 401,
        });
    }
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Clear the cookie
    response.cookies.set('token', '', { maxAge: -1 });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      message: err.message,
      status: 500,
    });
  }
}