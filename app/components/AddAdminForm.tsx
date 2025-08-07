"use client"

import { useState } from "react"

export default function AddAdminForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleImageUpload = async () => {
    if (!imageFile) return null

    const formData = new FormData()
    formData.append("file", imageFile)
    formData.append("upload_preset", "madmax") // 👈 Change this
    formData.append("folder", "admins")

    const res = await fetch("https://api.cloudinary.com/v1_1/dnmtzwlcc/image/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    return data.secure_url // The image URL
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const imageUrl = await handleImageUpload()

      const res = await fetch("/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, image: imageUrl }),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || "Failed to add admin")

      setMessage("✅ Admin added successfully!")
      setName("")
      setEmail("")
      setImageFile(null)
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow mt-10">
      <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          required
          className="w-full p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Add Admin"}
        </button>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </form>
    </div>
  )
}
