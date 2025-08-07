import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Fetch data from User collection
    const totalUsers = await User.countDocuments({});
    const subscribers = await User.countDocuments({ subscribed: true });
    const activeUsers = await User.countDocuments({ "volume_tracking.enabled": true });

    // Calculate revenue (example: 0.07 SOL per subscriber)
    const revenue = subscribers * 0.07;

    // Optional debug log (check in server terminal)
    console.log("STATS =>", {
      totalUsers,
      subscribers,
      activeUsers,
      revenue,
    });

    // Return the data
    res.status(200).json({ totalUsers, subscribers, activeUsers, revenue });
  } catch (error: any) {
    console.error("Stats API error:", error?.message || error);

    // Provide detailed error if in development
    res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV !== "production" ? error.message : undefined,
    });
  }
}
