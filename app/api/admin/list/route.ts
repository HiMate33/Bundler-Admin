import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function GET() {
  const client = await clientPromise
  const db = client.db()

  const admins = await db.collection("admins").find().toArray()

  return NextResponse.json({
    admins: admins.map(({ _id, ...rest }) => rest), // remove _id
  })
}
