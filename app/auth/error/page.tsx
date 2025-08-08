"use client"
import { useRouter } from "next/navigation"
import { ShieldAlert } from "lucide-react"
import { signIn } from "next-auth/react"

export default function AccessDeniedPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0b0b0e] text-white px-4 text-center">
      <ShieldAlert size={48} className="text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-4 text-red-500">Access Denied</h1>
      <p className="mb-6 max-w-md">
        You cannot access this page. Your email is not authorized. <br />
        Please contact the administrator to proceed.
      </p>

      <button
        onClick={() => router.push("/login")}
        className="bg-gradient-to-r from-[#9945ff] via-[#19fb9b] to-[#00ffa3] text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
      >
        Back to Login
      </button>
    </div>
  )
}
