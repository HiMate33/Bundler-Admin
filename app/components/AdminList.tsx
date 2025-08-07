"use client"

import { useEffect, useState } from "react"

type Admin = {
  name: string
  email: string
  image: string
}

export default function AdminList() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch("/api/admin/list")
        const data = await res.json()
        setAdmins(data.admins || [])
      } catch (err) {
        setError("Failed to load admins")
      } finally {
        setLoading(false)
      }
    }

    fetchAdmins()
  }, [])

  const deleteAdmin = async (email: string) => {
    if (!confirm("Are you sure you want to delete this admin?")) return

    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || "Failed to delete")

      setAdmins((prev) => prev.filter((admin) => admin.email !== email))
    } catch (err: any) {
      alert(`❌ ${err.message}`)
    }
  }

  if (loading) return <p className="text-center">Loading admins...</p>
  if (error) return <p className="text-red-500 text-center">{error}</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Current Admins</h2>
      <ul className="space-y-4">
        {admins.map((admin) => (
          <li key={admin.email} className="flex items-center justify-between p-4 border rounded">
            <div className="flex items-center space-x-4">
              <img src={admin.image} alt={admin.name} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-medium">{admin.name}</p>
                <p className="text-sm text-gray-500">{admin.email}</p>
              </div>
            </div>
            <button
              onClick={() => deleteAdmin(admin.email)}
              className="text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
