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
  route: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, route: "/dashboard" },
  { label: "User Management", icon: <Users size={20} />, route: "/" },
  { label: "Analytics & Insight", icon: <BarChart2 size={20} />, route: "/components" },
  { label: "Revenue & Fees", icon: <Coins size={20} />, route: "/forms" },
  { label: "Add Admin", icon: <UserPlus size={20} />, route: "/tables" },
];

export default function Navigation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white shadow-lg rounded-r-xl flex flex-col bg-[url('/images/sidebar-bg.jpg')] bg-cover bg-center">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700 text-center">
        <h1 className="text-3xl font-bold tracking-widest">BotZilla</h1>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>

      {/* Profile */}
      <div className="py-5 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-4 w-full justify-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User Avatar"
            className="w-12 h-12 rounded-full border border-gray-500"
          />
          <span className="text-lg">0xGhost</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-grow p-6 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.route}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 text-gray-200 text-xl transition-all duration-200"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
