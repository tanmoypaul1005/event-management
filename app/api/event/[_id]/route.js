import Event from "@/models/Event";
import connectMongo from "@/util/db";
import jwt from 'jsonwebtoken';

export async function DELETE(request) {
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

        // Extract the _id from the URL path
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const id = pathSegments[pathSegments.length - 1];

        if (!id) {
            return new Response(JSON.stringify({
                success: false,
                message: "Event ID is required",
                status: 400,
            }), { status: 400 });
        }

        // Find events based on user ID and search query
        const event = await Event.findByIdAndDelete({ _id: id, user: userId });

        return Response.json({
            success: true,
            status: 200,
            data: event,
            message:"Event delete Successfully"
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

export async function PUT(request) {
    try {
        await connectMongo();
        const res = await request.json();
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

        // Extract the _id from the URL path
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const id = pathSegments[pathSegments.length - 1];

        if (!id) {
            return new Response(JSON.stringify({
                success: false,
                message: "Event ID is required",
                status: 400,
            }), { status: 400 });
        }

        // Find events based on user ID and search query
        const event = await Event.findOneAndUpdate(
            { _id: id, user: userId },
            res,
            { new: true }
          );

        return Response.json({
            success: true,
            status: 200,
            data: event,
            message:"Event update Successfully"
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

        // Extract the _id from the URL path
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const id = pathSegments[pathSegments.length - 1];

        if (!id) {
            return new Response(JSON.stringify({
                success: false,
                message: "Event ID is required",
                status: 400,
            }), { status: 400 });
        }

        // Find events based on user ID and search query
        const event = await Event.findOne({ _id: id }).populate({
            path: 'user',
            select: '_id email name',
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