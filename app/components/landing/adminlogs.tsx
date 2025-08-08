"use client";

import React, { useEffect, useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

type Admin = {
  id?: string;
  name: string;
  email: string;
  image?: string;
};

export default function AdminPanel() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRemoveList, setShowRemoveList] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Admin | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imageFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin/list");
      const data = await res.json();
      setAdmins(data.admins || []);
    } catch (err) {
      console.error("Failed to load admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const uploadImage = async () => {
    if (!formData.imageFile) return null;
    const data = new FormData();
    data.append("file", formData.imageFile);
    data.append("upload_preset", "madmax");
    data.append("folder", "admins");

    const res = await fetch("https://api.cloudinary.com/v1_1/dnmtzwlcc/image/upload", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    return result.secure_url;
  };

  const handleAddAdmin = async () => {
    setLoading(true);
    try {
      const imageUrl = await uploadImage();

      const res = await fetch("/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          image: imageUrl,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to add admin");

      setFormData({ name: "", email: "", imageFile: null });
      setShowAddForm(false);
      fetchAdmins(); // refresh list
    } catch (err: any) {
      alert(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: deleteTarget?.email }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to delete admin");

      fetchAdmins();
      setDeleteTarget(null);
    } catch (err: any) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Welcome to Admin Panel</h2>
        <p className="text-gray-600">Only admins can add or remove other admins.</p>
      </div>

      <div className="flex gap-6">
  <button
    onClick={() => setShowAddForm(true)}
    className="cursor-pointer w-32 h-28 flex flex-col items-center justify-center bg-green-100 hover:bg-green-200 rounded-lg shadow"
  >
    <Plus size={24} className="text-green-600" />
    <span className="text-sm font-medium">Add</span>
  </button>
  <button
    onClick={() => setShowRemoveList(true)}
    className="cursor-pointer w-32 h-28 flex flex-col items-center justify-center bg-red-100 hover:bg-red-200 rounded-lg shadow"
  >
    <Minus size={24} className="text-red-600" />
    <span className="text-sm font-medium">Remove</span>
  </button>
</div>


      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Admin</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, imageFile: e.target.files?.[0] || null })
                }
                className="border rounded w-full px-4 py-2 cursor-pointer"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAdmin}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Admin"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showRemoveList && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Remove Admin</h3>
            <ul className="space-y-3 max-h-64 overflow-y-auto">
              {admins.map((admin) => (
                <li
                  key={admin.email}
                  className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded hover:bg-red-50"
                >
                  <div className="flex items-center gap-3">
                    {admin.image && (
                      <img
                        src={admin.image}
                        alt={admin.name}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium">{admin.name}</p>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDeleteTarget(admin)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowRemoveList(false)}
                className="text-gray-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to remove admin{" "}
              <span className="font-bold">{deleteTarget.name}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


