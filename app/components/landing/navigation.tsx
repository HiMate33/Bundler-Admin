"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Coins,
  UserPlus,
} from "lucide-react";

type MenuItem = {
  label: string;
  icon: React.ReactElement;
  key: string;
};


type NavigationProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};



const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, key: "dashboard" },
  { label: "User Management", icon: <Users size={20} />, key: "user-management" },
  { label: "Analytics & Insight", icon: <BarChart2 size={20} />, key: "analytics" },
  { label: "Revenue & Fees", icon: <Coins size={20} />, key: "revenue" },
  { label: "Add Admin", icon: <UserPlus size={20} />, key: "add-admin" },
];
export default function Navigation({activeTab, setActiveTab}: NavigationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white shadow-lg rounded-r-xl flex flex-col bg-[url('/images/sidebar-bg.jpg')] bg-cover bg-center">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700 text-center">
        <h1 className="text-2xl font-bold tracking-widest">BotZilla</h1>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>

      {/* Profile */}
      <div className="py-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-4 w-full justify-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-gray-500"
          />
          <span className="text-base">0xGhost</span>
        </div>
      </div>

      {/* Menu */}
       {/* Menu */}
      <nav className="flex-grow p-3 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveTab(item.key)}
            className={`w-full flex items-center space-x-4 p-2 rounded-lg transition-all duration-200 ${
              activeTab === item.key ? "bg-gray-800 text-white" : "text-gray-200 hover:bg-gray-800"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
