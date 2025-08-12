"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  console.log("RequireAuth status:", status, "session:", session)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0b0b0e] text-white">
        <Loader2 className="h-10 w-10 animate-spin text-[#9945ff]" />
      </div>
    )
  }

  // Only render children when authenticated
  if (status === "authenticated") {
    return <>{children}</>
  }

  return null
}






/*


"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0b0b0e] text-white">
        <Loader2 className="h-10 w-10 animate-spin text-[#9945ff]" />
      </div>
    )
  }

  return <>{children}</>
}


*/