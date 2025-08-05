"use client";

import {
  Bot,
  Users,
  PieChart,
  Search,
  DollarSign,
} from "lucide-react";
import React, { useState } from "react";

type User = {
  id: number;
  telegramId: string;
  username: string;
  mainWallet: string;
  bundledWallets: number;
  type: "Bot" | "Human";
};

const mockUsers: User[] = [
  {
    id: 1,
    telegramId: "123456",
    username: "@john_doe",
    mainWallet: "0xABC123",
    bundledWallets: 3,
    type: "Human",
  },
  {
    id: 2,
    telegramId: "789012",
    username: "@bot_killer",
    mainWallet: "0xXYZ456",
    bundledWallets: 5,
    type: "Bot",
  },
  {
    id: 3,
    telegramId: "246810",
    username: "@alice_dev",
    mainWallet: "0xFFF987",
    bundledWallets: 2,
    type: "Human",
  },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleBanUsers = () => {
    const remaining = users.filter((user) => !selectedUsers.includes(user.id));
    setUsers(remaining);
    setSelectedUsers([]);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.telegramId.includes(searchTerm) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      {/* Search Bar */}
      <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md w-full max-w-md">
        <Search className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search user by ID or username"
          className="outline-none w-full text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 p-4 rounded-lg shadow">
              <Users className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600 font-medium">Users</p>
              <h3 className="text-xl font-bold text-gray-800">{users.length}</h3>
              <p className="text-sm text-gray-500">Target: 5,180</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <PieChart className="text-gray-400" size={32} />
            </div>
          </div>
        </div>

        {/* Subscribers Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-4 rounded-lg shadow">
              <DollarSign className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600 font-medium">Subscribers</p>
              <h3 className="text-xl font-bold text-gray-800">7</h3>
              <p className="text-sm text-gray-500">Target: 5,000</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <PieChart className="text-gray-400" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Bot Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-4">
            <div className="bg-pink-500 p-4 rounded-lg shadow">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600 font-medium">Bot Users</p>
              <h3 className="text-xl font-bold text-gray-800">
                {users.filter((u) => u.type === "Bot").length}
              </h3>
            </div>
          </div>
          <p className="text-sm text-red-500 mt-3">⚠️ Ban bots activity</p>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-2xl shadow p-4 overflow-auto">
        <h2 className="text-lg font-semibold mb-4">User List</h2>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="p-2">Select</th>
              <th className="p-2">Telegram ID</th>
              <th className="p-2">Username</th>
              <th className="p-2">Main Wallet</th>
              <th className="p-2"># Bundled Wallets</th>
              <th className="p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => toggleSelect(user.id)}
                  />
                </td>
                <td className="p-2">{user.telegramId}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.mainWallet}</td>
                <td className="p-2">{user.bundledWallets}</td>
                <td className="p-2">{user.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No users found.</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => alert("Users List shown above")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow"
        >
          View Users
        </button>
        <button
          onClick={handleBanUsers}
          disabled={selectedUsers.length === 0}
          className={`${
            selectedUsers.length > 0
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-300 cursor-not-allowed"
          } text-white px-4 py-2 rounded-md shadow`}
        >
          Ban Selected Users
        </button>
      </div>
    </div>
  );
}
