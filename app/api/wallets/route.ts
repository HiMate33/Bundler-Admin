// app/api/wallets/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

const SOLANA_RPC = process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com";

// Function to get SOL balance
async function getSolBalance(wallet: string): Promise<number> {
  try {
    const res = await fetch(SOLANA_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getBalance",
        params: [wallet],
      }),
    });
    const json = await res.json();
    return (json.result?.value || 0) / 1e9; // lamports → SOL
  } catch (err) {
    console.error(`Error fetching SOL balance for ${wallet}:`, err);
    return 0;
  }
}

async function fetchWalletsWithBalance() {
  const client = await clientPromise;
  const db = client.db("test");
  const wallets = await db.collection("wallets").find({}).toArray();

  let totalSol = 0;
  const walletsWithBalance = await Promise.all(
    wallets.map(async (wallet) => {
      const balance = await getSolBalance(wallet.address);
      totalSol += balance;
      return { ...wallet, balance };
    })
  );

  return { wallets: walletsWithBalance, totalSol };
}

// GET → Get all wallets
export async function GET() {
  try {
    const data = await fetchWalletsWithBalance();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch wallets" }, { status: 500 });
  }
}

// POST → Create or Update wallet
export async function POST(req: Request) {
  try {
    const { type, address } = await req.json();
    if (!type || !address) {
      return NextResponse.json({ error: "Missing type or address" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test");

    await db.collection("wallets").updateOne(
      { type },
      { $set: { type, address } },
      { upsert: true }
    );

    const data = await fetchWalletsWithBalance();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to save wallet" }, { status: 500 });
  }
}

// DELETE → Remove wallet by type
export async function DELETE(req: Request) {
  try {
    const { type } = await req.json();
    if (!type) {
      return NextResponse.json({ error: "Missing type" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("test");
    await db.collection("wallets").deleteOne({ type });

    const data = await fetchWalletsWithBalance();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete wallet" }, { status: 500 });
  }
}
