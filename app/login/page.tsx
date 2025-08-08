"use client"
import { signIn } from "next-auth/react"

export default function LoginPage() {
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
        <img src="/botzilla.png" alt="BotZilla Logo" className="w-32 h-32 mb-6" />
      </div>

      <h1 className="text-3xl font-bold mb-4 text-[#9945ff]">Welcome to BotZilla</h1>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-gradient-to-r from-[#9945ff] via-[#19fb9b] to-[#00ffa3] text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
      >
        Sign in with Google
      </button>
    </div>
  )
}
