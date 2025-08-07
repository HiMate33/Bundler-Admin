import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db()

  const result = await db.collection("admins").deleteOne({ email })

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
