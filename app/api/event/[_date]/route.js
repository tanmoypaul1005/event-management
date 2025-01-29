// export async function GET(request) {
//     try {
//       await connectMongo();
  
//       const url = new URL(request.url);
//       const searchQuery = url.searchParams.get('date') || '';

//       const startOfMonth = moment().startOf('month').toDate();
//       const endOfMonth = moment().endOf('month').toDate();

//       const events = await Event.find({date: { $gte: startOfMonth, $lte: endOfMonth }})
//         .sort({ createdAt: -1 })
//         .populate({
//           path: 'user',
//           select: '_id email name',
//         });
  
//       return new Response(JSON.stringify({
//         success: true,
//         status: 200,
//         events,
//       }), { status: 200 });
//     } catch (err) {
//       console.error(err);
//       return new Response(JSON.stringify({
//         success: false,
//         message: err.message,
//         status: 500,
//       }), { status: 500 });
//     }
//   }
  