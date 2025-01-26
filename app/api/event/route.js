import Event from "@/models/Event";
import connectMongo from "@/util/db";
import jwt from 'jsonwebtoken';

export async function POST(request, response) {
    try {
        const res = await request.json();
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

        const event = new Event({ ...res, user: userId });
        await event.save();
        return Response.json({
            success: true,
            message: "Event Created Successfully",
            status: 201,
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



