"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    await signIn("google", { callbackUrl: "/" })
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#0b0b0e] overflow-hidden text-white">
      {/* Background Solana symbol animation */}
      <div className="absolute inset-0 -z-10 opacity-5 animate-pulse">
        <img
          src="/solana-icon.png"
          alt="Solana Background"
          className="absolute top-10 left-20 w-48 animate-spin-slow"
        />
        <img
          src="/solana-icon.png"
          alt="Solana Background"
          className="absolute bottom-10 right-20 w-36 animate-bounce-slow"
        />
      </div>

      <div>
        <img src="/botzilla.png" alt="BotZilla Logo" className="w-40 h-40 mb-6" />
      </div>

      <h1 className="text-3xl font-bold mb-4 text-[#9945ff]">Welcome to BotZilla</h1>

      <button
        onClick={handleSignIn}
        disabled={loading}
        className={`flex items-center gap-2 bg-gradient-to-r from-[#9945ff] via-[#19fb9b] to-[#00ffa3] text-black px-6 py-3 rounded-lg font-semibold shadow-md transition duration-300 ${
          loading ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg hover:scale-105 cursor-pointer"
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            Signing in...
          </>
        ) : (
          "Sign in with Google"
        )}
      </button>
    </div>
  )
}
