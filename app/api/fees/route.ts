import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

// Define the shape of the fees document
interface FeesDoc {
  _id: string;
  "Create Token": string;
  "Freeze Mint": string;
  "Weekly Subscription": string;
  "Monthly Subscription": string;
  "Copy Trading": string;
  "Bundle": string;
  "Sniping": string;
  "Book Trade": string;
  "Copy Trade": string;
}

const initialFees: Omit<FeesDoc, "_id"> = {
  "Create Token": "0",
  "Freeze Mint": "0",
  "Weekly Subscription": "0",
  "Monthly Subscription": "0",
  "Copy Trading": "0",
  "Bundle": "0",
  "Sniping": "0",
  "Book Trade": "0",
  "Copy Trade": "0",
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("yourDBName");
    const feesCollection = db.collection<FeesDoc>("fees");

    let feesDoc = await feesCollection.findOne({ _id: "fees" });

    if (!feesDoc) {
      await feesCollection.insertOne({ _id: "fees", ...initialFees });
      feesDoc = { _id: "fees", ...initialFees };
    }

    return NextResponse.json(feesDoc);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch fees" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const updates: Partial<FeesDoc> = await req.json();
    const client = await clientPromise;
    const db = client.db("yourDBName");
    const feesCollection = db.collection<FeesDoc>("fees");

    await feesCollection.updateOne(
      { _id: "fees" },
      { $set: updates },
      { upsert: true }
    );

    const updated = await feesCollection.findOne({ _id: "fees" });
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update fees" },
      { status: 500 }
    );
  }
}
