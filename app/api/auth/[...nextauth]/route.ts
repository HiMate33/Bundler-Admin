import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb" 

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const client = await clientPromise
      const db = client.db()

      // 1. Check if admin exists
      const allowed = await db.collection("admins").findOne({ email: user.email })
      if (!allowed) return false

      // 2. Find existing NextAuth user
      let existingUser = await db.collection("users").findOne({ email: user.email })

      // 3. Create user if missing
      if (!existingUser) {
        const insertResult = await db.collection("users").insertOne({
          name: user.name,
          email: user.email,
          image: user.image || null,
          emailVerified: new Date(),
        })
        existingUser = { _id: insertResult.insertedId }
      }

      // 4. Only try linking if account is provided (on first sign-in, not on session refresh)
      if (account) {
        const existingAccount = await db.collection("accounts").findOne({
          userId: existingUser._id,
          provider: account.provider,
        })

        if (!existingAccount) {
          await db.collection("accounts").insertOne({
            userId: existingUser._id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
          })
        }
      }

      return true
    },

    async session({ session }) {
      return session
    },

    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
    signOut: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }



/*
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb" 

const handler = NextAuth({
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
      return baseUrl
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
    signOut: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
*/






/*
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


*/