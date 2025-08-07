import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function POST(req: Request) {
  const { name, email, image } = await req.json()

  const client = await clientPromise
  const db = client.db()

  const existing = await db.collection("admins").findOne({ email })
  if (existing) return NextResponse.json({ error: "Admin already exists" }, { status: 400 })

  await db.collection("admins").insertOne({ name, email, image, createdAt: new Date() })

  return NextResponse.json({ success: true })
}
