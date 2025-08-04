import {
  Bot,
  LucideTimerReset,
  WalletCardsIcon,
  ArrowDownNarrowWideIcon,
  Users,
  User,   
  DollarSign,
  Wallet,
  Activity,
  UserCheckIcon,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-8 p-8">

      {/* Total Users */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
        <div className="flex items-center gap-6">
          <div className="bg-orange-500 p-5 rounded-lg shadow-lg">
            <Users size={32} className="text-white" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-gray-500 text-base font-medium">Total Users</p>
            <h3 className="text-3xl font-bold text-gray-800">
              31,500
            </h3>
          </div>
        </div>
        <hr className="my-5" />
        <p className="text-sm text-pink-600 flex items-center gap-2 font-semibold">
          <Bot size={16} className="text-pink-600" />
          Users interacted with bot
        </p>
      </div>

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
        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
          <LucideTimerReset size={16} />
          Last 24 Hours
        </p>
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
        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
          <WalletCardsIcon size={16} />
          Net income from all wallets</p>
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
        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
          <ArrowDownNarrowWideIcon size={16} />
          Just Updated</p>
      </div>


    </div>

    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 p-8">
      
  <div className="bg-white rounded-2xl shadow-lg p-6 ">
  
  <div className="flex items-center justify-between mb-6">
    <div className="bg-pink-500 p-5 rounded-lg shadow-lg w-2/3]">
            <ShieldCheck size={32} className="text-white" />
    </div>
  </div>

  <div>
    <p>
      <span className="text-gray-500 text-base font-medium">Admin Management</span>
    </p>
  </div>
  

  <div className="flex items-center gap-6">
    <div className="w-1/2 ">
    {/* Each admin entry */}
    {[
  { email: "caleb@gmail.com", username: "Cally" },
  { email: "alex@gmail.com", username: "Alex12" },
  { email: "joblawal@gmail.com", username: "Job" },
].map((admin, i, arr) => (
  <div
    key={i}
    className={`flex justify-between items-center py-3 ${
      i !== arr.length - 1 ? "border-b border-gray-200" : ""
    }`}
  >
    {/* Left Side - Icon and Username */}
    <div className="flex gap-4 items-center">
      <User size={20} className="text-gray-500" />
      <p className="text-xl text-gray-800">{admin.username}</p>
    </div>
    {/* Right Side - Email */}
    <div className="flex gap-3">
      <p className="text-lg text-gray-600">{admin.email}</p>
    </div>
  </div>
))}
  </div>
  {/* Left Side - Big Admin Icon */}
  <div className="w-1/2 flex justify-center items-center">
    <div className="bg-gray-500 p-10 rounded-full shadow-inner">
      {/* Replace with Lucide <ShieldCheck /> or any admin icon */}
      <span className="text-6xl text-white">
        <UserPlus size={50} />
      </span>
    </div>
  </div>
  </div>


  
</div>
    </div>
    </div>
    
  );
}
