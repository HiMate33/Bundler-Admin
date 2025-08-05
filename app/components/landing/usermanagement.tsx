import {
  Bot,
  Users,
  PieChart,
  UserPlus,
  Search,
  DollarSign,
} from "lucide-react";

export default function UserManagement() {
  return (
    <div className="p-6 space-y-8">
      {/* Search Bar */}
      <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md w-full max-w-md">
        <Search className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search user by ID or username"
          className="outline-none w-full text-sm"
        />
      </div>

      {/* Metrics: Users & Subscribers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 p-4 rounded-lg shadow">
              <Users className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600 font-medium">Users</p>
              <h3 className="text-xl font-bold text-gray-800">2,819</h3>
              <p className="text-sm text-gray-500">Target: 5,180</p>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            {/* Placeholder for Pie Chart */}
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
            {/* Placeholder for Pie Chart */}
            <div className="w-32 h-32 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
              <PieChart className="text-gray-400" size={32} />
            </div>
          </div>
        </div>
      </div>

      {/* Bot Users Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-4">
            <div className="bg-pink-500 p-4 rounded-lg shadow">
              <Bot className="text-white" size={20} />
            </div>
            <div>
              <p className="text-gray-600 font-medium">Bot Users</p>
              <h3 className="text-xl font-bold text-gray-800">7</h3>
            </div>
          </div>
          <p className="text-sm text-red-500 mt-3">⚠️ Ban bots activity</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow">
          View Users
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow">
          Ban Users
        </button>
      </div>
    </div>
  );
}
