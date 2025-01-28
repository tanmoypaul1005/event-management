import Event from "@/models/Event";
import connectMongo from "@/util/db";
import jwt from 'jsonwebtoken';

export async function POST(request) {
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


export async function GET(request) {
    try {
        await connectMongo();

        // Get query parameters for search
        const url = new URL(request.url);
        const searchQuery = url.searchParams.get('q') || '';


        // Find events based on user ID and search query
        const event = await Event.find({
            // user: userId,
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
                { location: { $regex: searchQuery, $options: 'i' } },
                { start_time: { $regex: searchQuery, $options: 'i' } },
                { end_time: { $regex: searchQuery, $options: 'i' } }
            ]
        }).populate({
            path: 'user',
            select: '_id email name'
          });

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
