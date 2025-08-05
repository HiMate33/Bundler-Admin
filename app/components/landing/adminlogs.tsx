"use client";

import React, { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";

type Admin = {
  id: number;
  username: string;
  email: string;
  image?: string;
};

export default function AdminPanel() {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: 1, username: "admin1", email: "admin1@example.com" },
    { id: 2, username: "admin2", email: "admin2@example.com" },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showRemoveList, setShowRemoveList] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    image: "",
  });

  const [deleteTarget, setDeleteTarget] = useState<Admin | null>(null);

  // Add Admin
  const handleAddAdmin = () => {
    const newAdmin: Admin = {
      id: Date.now(),
      ...formData,
    };
    setAdmins((prev) => [...prev, newAdmin]);
    setFormData({ username: "", email: "", image: "" });
    setShowAddForm(false);
  };

  // Remove Admin
  const confirmDelete = () => {
    setAdmins((prev) => prev.filter((a) => a.id !== deleteTarget?.id));
    setDeleteTarget(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Welcome to Admin Panel</h2>
        <p className="text-gray-600">Only admins can add or remove other admins.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex flex-col items-center justify-center bg-green-100 hover:bg-green-200 p-4 rounded-lg shadow"
        >
          <Plus size={24} className="text-green-600" />
          <span className="text-sm font-medium">Add</span>
        </button>
        <button
          onClick={() => setShowRemoveList(true)}
          className="flex flex-col items-center justify-center bg-red-100 hover:bg-red-200 p-4 rounded-lg shadow"
        >
          <Minus size={24} className="text-red-600" />
          <span className="text-sm font-medium">Remove</span>
        </button>
      </div>

      {/* Add Admin Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Admin</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 border rounded"
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
                >
                  Add Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Remove Admin List Modal */}
      {showRemoveList && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Remove Admin</h3>
            <ul className="space-y-3">
              {admins.map((admin) => (
                <li
                  key={admin.id}
                  className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded hover:bg-red-50"
                >
                  <div>
                    <p className="font-medium">{admin.username}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
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

      {/* Confirm Delete Dialog */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to remove admin{" "}
              <span className="font-bold">{deleteTarget.username}</span>?
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
