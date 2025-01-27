import User from "@/models/User";
import connectMongo from "@/util/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request, response) {
    try {
      const res = await request.json();
      await connectMongo();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(res?.email)) {
        return Response.json({
          success: false,
          message: "Invalid email format",
          status: 400,
        });
      }

      const email=await User.findOne({email:res?.email});

      if(email){
        return Response.json({
            success: false,
            message: "Your Email all ready register",
            status: 500,
          });
      }
      const hashedPassword = await bcrypt.hash(res.password, 10);
      const user = new User({ ...res, password: hashedPassword });
      await user.save();
      return Response.json({
        success: true,
        message: "User Created Successfully",
        status: 201,
        data: user,
      });
    } catch (err) {
      console.error(err);
      return Response.json({
        success: false,
        message: err,
        status: 500,
      });
    }
}


export async function GET(request) {
  try {
      await connectMongo();

      // Get a specific header
      const authHeader = request.headers.get('Authorization');
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
          return Response.json({
              success: false,
              message: "No token provided",
              status: 401,
          });
      }
      // Verify and decode the token

      const decoded = await jwt.verify(token, "pp");
      const userId = decoded.id;

      // Find events based on user ID and search query
      const event = await User.findOne({_id:userId});

      return Response.json({
          success: true,
          status: 200,
          data: event,
      });
  } catch (err) {
      console.error(err);
      return Response.json({
          success: false,
          message: err.message,
          status: 500,
      });
  }
}
