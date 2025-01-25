import User from "@/models/User";
import connectMongo from "@/util/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request, response) {
  try {
    const res = await request.json();
    await connectMongo();

    const user = await User.findOne({ email: res.email });
    if (!user) {
      return Response.json({
        success: false,
        message: "User not found",
        status: 404,
      });
    }

    const isMatch = await bcrypt.compare(res.password, user.password);
    if (!isMatch) {
      return Response.json({
        success: false,
        message: "Invalid credentials",
        status: 400,
      });
    }

    const token = jwt.sign({ id: user._id }, "pp", { expiresIn: '1h' });

    return Response.json({
      success: true,
      message: "Login successful",
      status: 200,
      token,
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
