import { NextResponse } from "next/server"
import clientPromise from "../../../lib/mongodb"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get("email")

  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 })

  const client = await clientPromise
  const db = client.db()

  const admin = await db.collection("admins").findOne({ email })

  if (!admin) return NextResponse.json({ error: "Admin not found" }, { status: 404 })

  return NextResponse.json({ name: admin.name, image: admin.image })
}
