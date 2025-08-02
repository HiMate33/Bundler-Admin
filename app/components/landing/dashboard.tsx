import {
  Users,
  DollarSign,
  Wallet,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1  md:grid-cols-1 gap-8 p-8">
      {/* Total Users */}
      

      {/* Subscribers */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        <div className="flex items-center gap-6">
          <div className="bg-green-500 p-5 rounded-lg shadow-lg">
            <DollarSign size={32} className="text-white" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-gray-500 text-base font-medium">Subscribers</p>
            <h3 className="text-3xl font-bold text-gray-800">2,601</h3>
          </div>
        </div>
        <hr className="my-5" />
        <p className="text-sm text-gray-500 font-medium">Last 24 Hours</p>
      </div>

      {/* Fixed Issues */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        <div className="flex items-center gap-6">
          <div className="bg-red-500 p-5 rounded-lg shadow-lg">
            <Wallet size={32} className="text-white" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-gray-500 text-base font-medium">Revenues</p>
            <h3 className="text-3xl font-bold text-gray-800">89.025 <span className="text-gray-400">sol</span></h3>
          </div>
        </div>
        <hr className="my-5" />
        <p className="text-sm text-gray-500 font-medium">Net income from all wallets</p>
      </div>

      {/* Followers */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        <div className="flex items-center gap-6">
          <div className="bg-cyan-500 p-5 rounded-lg shadow-lg">
            <Activity size={32} className="text-white" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-gray-500 text-base font-medium">Active Users</p>
            <h3 className="text-3xl font-bold text-gray-800">+1,976</h3>
          </div>
        </div>
        <hr className="my-5" />
        <p className="text-sm text-gray-500 font-medium">Just Updated</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 p-8">
      hello world
    </div>
    </div>
    
  );
}
