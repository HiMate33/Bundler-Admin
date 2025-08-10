// app/api/dashboard/revenue/update-fee/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function PUT(req: Request) {
  try {
    const { service, amount } = await req.json(); // e.g. { service: "copy_trade", amount: 3.0 }

    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("fees").updateOne(
      { service },
      { $set: { amount } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Failed to update fee:", error);
    return NextResponse.json({ error: "Failed to update fee" }, { status: 500 });
  }
}
