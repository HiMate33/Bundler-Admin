import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";



// api/users/route.ts
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const users = await usersCollection
      .find({}, {
        projection: {
          telegram_id: 1,
          username: 1,
          is_bot: 1,
          language_code: 1,
          "wallet.publicKey": 1,
          bundled_wallets: 1,
          subscribed: 1,
        }
      })
      .toArray();

    const formattedUsers = users.map((user) => ({
      telegram_id: user.telegram_id,
      username: user.username,
      is_bot: user.is_bot || false,
      language_code: user.language_code,
      wallet_publicKey: user.wallet?.publicKey || null,
      bundled_wallet_count: user.bundled_wallets?.length || 0,
      subscribed: Boolean(user.subscribed),
    }));

    // Bot count
    const botCount = formattedUsers.filter((u) => u.is_bot).length;

    return NextResponse.json({
      success: true,
      data: formattedUsers,
      botCount,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching users" },
      { status: 500 }
    );
  }
}




/*
import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); 
    const usersCollection = db.collection("users");

    const users = await usersCollection
      .find(
        {},
        {
          projection: {
            telegram_id: 1,
            username: 1,
            is_bot: 1,
            language_code: 1,
            "wallet.publicKey": 1,
            bundled_wallets: 1,
            subscribed: 1,
          },
        }
      )
      .toArray();

    const formattedUsers = users.map((user) => ({
      telegram_id: user.telegram_id,
      username: user.username,
      is_bot: user.is_bot,
      language_code: user.language_code,
      wallet_publicKey: user.wallet?.publicKey || null,
      bundled_wallet_count: user.bundled_wallets
        ? user.bundled_wallets.length
        : 0,
      subscribed: user.subscribed,
    }));

    return NextResponse.json({ success: true, data: formattedUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching users" },
      { status: 500 }
    );
  }
}

*/