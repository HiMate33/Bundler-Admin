import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); 
    const usersCollection = db.collection("users");

    const totalUsers = await usersCollection.countDocuments();
    const subscribedUsers = await usersCollection.countDocuments({ subscribed: true });

    return NextResponse.json({
      totalUsers,
      subscribedUsers,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
