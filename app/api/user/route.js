import User from "@/models/User";
import connectMongo from "@/util/db";

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
  
      const user = new User(res);
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