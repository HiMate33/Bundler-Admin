import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import { NextAuthOptions } from "next-auth"


export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const client = await clientPromise
      const db = client.db()
      const allowed = await db.collection("admins").findOne({ email: user.email })
      return !!allowed 
    },
    async session({ session, token }) {
      return session
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}` 
    }
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
    signOut: "/login",
    
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
