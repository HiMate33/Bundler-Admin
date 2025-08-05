"use client";

import {
  Bell,
  Menu,
  MoreVertical,
  User,
} from "lucide-react";
import { useState } from "react";
import { LayoutDashboard, Users, BarChart2, Coins, UserPlus, X } from "lucide-react";

type HeaderProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const tabLabels: Record<string, string> = {
  dashboard: "Dashboard",
  "user-management": "User Management",
  analytics: "Analytics & Insight",
  revenue: "Revenue & Fees",
  "add-admin": "Add Admin",
};

const menuItems = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, key: "dashboard" },
  { label: "User Management", icon: <Users size={18} />, key: "user-management" },
  { label: "Analytics & Insight", icon: <BarChart2 size={18} />, key: "analytics" },
  { label: "Revenue & Fees", icon: <Coins size={18} />, key: "revenue" },
  { label: "Add Admin", icon: <UserPlus size={18} />, key: "add-admin" },
];

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMenuClick = (key: string) => {
    setActiveTab(key);
    setShowMobileMenu(false);
  };

  return (
    <div className="flex items-center shadow justify-between w-full px-6 py-2 bg-gray-100 rounded-b-md relative">
      {/* Left - Desktop Placeholder */}
      <div className="hidden md:flex items-center gap-4">
        <div className="bg-white shadow-md rounded-full p-2">
          <MoreVertical size={18} className="text-gray-600" />
        </div>
      </div>

      {/* Left - Mobile Menu Button */}
      <div className="flex md:hidden items-center gap-4">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="bg-white shadow-md rounded-full p-2"
        >
          {showMobileMenu ? <X size={18} className="text-gray-600" /> : <Menu size={18} className="text-gray-600" />}
        </button>
      </div>

      {/* Center - Title */}
      <div className="flex items-center justify-center gap-2 max-w-md flex-1 mx-8 w-full">
        <h1 className="text-gray-700 text-lg">
          {tabLabels[activeTab] || "Dashboard"}
        </h1>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            5
          </span>
        </div>
        <User size={18} className="text-gray-600 cursor-pointer" />
      </div>

      {/* Mobile Dropdown Navigation */}
      {showMobileMenu && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-md z-50 p-3 space-y-2 md:hidden">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleMenuClick(item.key)}
              className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-md ${
                activeTab === item.key
                  ? "bg-gray-800 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

