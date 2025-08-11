"use client";

import {
  Bot,
  Users,
  PieChart,
  Search,
  DollarSign,
} from "lucide-react";
import React, { useState,  useEffect } from "react";

type User = {
  id: number;
  telegramId: string;
  username: string;
  mainWallet: string;
  bundledWallets: number;
  type: "Bot" | "Human";
};

const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  telegramId: `${100000 + i}`,
  username: `@user${i + 1}`,
  mainWallet: `0xWALLET${i + 1}`,
  bundledWallets: Math.floor(Math.random() * 6),
  type: i % 4 === 0 ? "Bot" : "Human",
}));

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [ stats, setStats ] = useState({totalUsers: 0, subscribedUsers: 0});


  useEffect(() => {
    const fetchStats =  async () => {
      try{
      const res = await fetch("/api/dashboard/stats");
      const  data  = await res.json(); 
      setStats(data);
      } catch (err) {
        console.error("Failed to fech usermanagement stats:", err);
      }
    }
    fetchStats();
  }, []);



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

  const visibleUsers = filteredUsers.slice(0, visibleCount);

  return (
    <div className="p-4 space-y-6">
      {/* Search Bar */}
      <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md w-full">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 p-4 rounded-lg shadow">
              <Users className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600 font-medium">Users</p>
              <h3 className="text-xl font-bold text-gray-800">{stats.totalUsers}</h3>
              <p className="text-sm text-gray-500">Target: 100,000</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <PieChart className="text-gray-400" size={28} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-4 rounded-lg shadow">
              <DollarSign className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600 font-medium">Subscribers</p>
              <h3 className="text-xl font-bold text-gray-800">{stats.subscribedUsers}</h3>
              <p className="text-sm text-gray-500">Target: 10,000</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <PieChart className="text-gray-400" size={28} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-4">
            <div className="bg-pink-500 p-4 rounded-lg shadow">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600 font-medium">Bot Users</p>
              <h3 className="text-xl font-bold text-gray-800">
                0
              </h3>
            </div>
          </div>
          <p className="text-sm text-red-500 mt-3">⚠️ Ban bots activity</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 overflow-auto hidden md:block">
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
            {visibleUsers.map((user) => (
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
        {visibleCount < filteredUsers.length && (
          <div className="text-center mt-4">
            <button
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className="text-blue-500 hover:underline"
            >
              Load More
            </button>
          </div>
        )}
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No users found.</p>
        )}
      </div>

      {/* Cards (Mobile) */}
      <div className="md:hidden space-y-4">
        {visibleUsers.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-semibold">{user.username}</p>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleSelect(user.id)}
              />
            </div>
            <p className="text-gray-500 text-sm">Telegram ID: {user.telegramId}</p>
            <p className="text-gray-500 text-sm">Wallet: {user.mainWallet}</p>
            <p className="text-gray-500 text-sm">Bundled: {user.bundledWallets}</p>
            <p className="text-gray-500 text-sm">Type: {user.type}</p>
          </div>
        ))}
        {visibleCount < filteredUsers.length && (
          <div className="text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 10)}
              className="text-blue-500 hover:underline"
            >
              Load More
            </button>
          </div>
        )}
        {filteredUsers.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No users found.</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => alert("Users List shown above")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow w-full sm:w-auto"
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
          } text-white px-4 py-2 rounded-md shadow w-full sm:w-auto`}
        >
          Ban Selected Users
        </button>
      </div>
    </div>
  );
}
