import {useEffect, useState} from "react"

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
  ShieldCheck,
  UserPlus,
} from "lucide-react";



export default function Dashboard() {
  const [admins, setAdmins] = useState<{ name: string; email: string }[]>([]);
  const [stats, setStats] = useState({ totalUsers: 0, subscribedUsers: 0 });
  const [totalEarnings, setTotalEarnings] = useState(0);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await fetch("/api/dashboard/stats");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    }
  };

  fetchStats();
}, []);


useEffect(() => {
  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin/list");
      const data = await res.json();
      setAdmins(data.admins);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
    }
  };

  fetchAdmins();
}, []);



useEffect(() => {

    async function fetchWalletData() {
      try {
        const res = await fetch("/api/wallets");
        const data = await res.json();

        if (data?.totalSol !== undefined) {
          setTotalEarnings(data.totalSol); 
        }
      } catch (err) {
        console.error("Failed to fetch wallet balances:", err);
      }
    }

    fetchWalletData();
  }, []);





  return (
    <div>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-8 p-1 md:p-8">

      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <div className="flex items-center gap-6">
          <div className="bg-orange-500 p-5 rounded-lg shadow-lg">
            <Users size={20} className="text-white" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-gray-500 text-sm font-medium">Total Users</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {stats.totalUsers}
            </h3>
          </div>
        </div>
        <hr className="my-3" />
        <p className="text-sm text-pink-600 flex items-center gap-2">
          <Bot size={16} className="text-pink-600" />
          Users interacted with bot
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <div className="flex items-center gap-6">
          <div className="bg-green-500 p-5 rounded-lg shadow-lg">
            <DollarSign size={20} className="text-white" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-gray-500 text-sm font-medium">Subscribers</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.subscribedUsers}</h3>
          </div>
        </div>
        <hr className="my-3" />
        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
          <LucideTimerReset size={16} />
          Last 24 Hours
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <div className="flex items-center gap-6">
          <div className="bg-red-500 p-5 rounded-lg shadow-lg">
            <Wallet size={20} className="text-white" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-gray-500 text-sm font-medium">Revenues</p>
            <h3 className="text-2xl font-bold text-gray-800">{totalEarnings.toFixed(4)} <span className="text-gray-400">sol</span></h3>
          </div>
        </div>
        <hr className="my-3" />
        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
          <WalletCardsIcon size={16} />
          Net income from all wallets</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col">
        <div className="flex items-center gap-6">
          <div className="bg-cyan-500 p-5 rounded-lg shadow-lg">
            <Activity size={20} className="text-white" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-gray-500 text-sm font-medium">Active Users</p>
            <h3 className="text-2xl font-bold text-gray-800">+2</h3>
          </div>
        </div>
        <hr className="my-3" />
        <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
          <ArrowDownNarrowWideIcon size={16} />
          Just Updated</p>
      </div>


    </div>

    <div className="grid grid-cols-1 md:grid-cols-1 md:gap-8 mt-2 md:mt-0 p-1 md:p-6">
      
  <div className="bg-white rounded-2xl shadow-lg p-6 ">
  
  <div className="flex items-center justify-between mb-6">
    <div className="bg-pink-500 p-5 rounded-lg shadow-lg w-2/3]">
            <ShieldCheck size={20} className="text-white" />
    </div>
  </div>

  <div>
    <p>
      <span className="text-gray-500 text-sm font-medium">Admin Management</span>
    </p>
  </div>
  

  <div className=" md:flex items-center gap-6">
    <div className="md:w-1/2 ">
    {/* Each admin entry */}
    {admins.map((admin, i, arr) => (
  <div
    key={i}
    className={`flex justify-between items-center py-1 ${
      i !== arr.length - 1 ? "border-b border-gray-200" : ""
    }`}
  >
    <div className="flex gap-2 items-center">
      <User size={18} className="text-gray-500" />
      <p className="text-lg text-gray-800">{admin.name}</p>
    </div>
    <div className="flex gap-3">
      <p className="text-base text-gray-600">{admin.email}</p>
    </div>
  </div>
))}

  </div>
  <div className="md:w-1/2 hidden md:flex justify-center items-center">
    <div className="bg-gray-500 p-8 rounded-full shadow-inner">
      <span className="text-6xl  text-white">
        <UserPlus size={20} />
      </span>
    </div>
  </div>
  </div>


  
</div>
    </div>
    </div>
    
  );
}
