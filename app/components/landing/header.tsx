import {
  Bell,
  Grid3x3,
  Search,
  User,
  MoreVertical,
} from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center shadow justify-between w-full px-6 py-2 bg-gray-100 rounded-b-md">
      {/* Left - Menu + Title */}
      <div className="flex items-center gap-4">
        <div className="bg-white shadow-md rounded-full p-2">
          <MoreVertical size={18} className="text-gray-600" />
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex items-center justify-center gap-2 max-w-md flex-1 mx-8 w-full">
        <h1 className="text-gray-700 text-lg">Dashboard</h1>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center gap-6">
        {/* Notification with badge */}
        <div className="relative cursor-pointer">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            5
          </span>
        </div>
        <User size={18} className="text-gray-600 cursor-pointer" />
      </div>
    </div>
  );
}
