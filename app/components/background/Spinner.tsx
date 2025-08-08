"use client"
import { Loader2 } from "lucide-react"

export default function Spinner({ size = 24, color = "text-white" }: { size?: number; color?: string }) {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className={`animate-spin ${color}`} style={{ width: size, height: size }} />
    </div>
  )
}
