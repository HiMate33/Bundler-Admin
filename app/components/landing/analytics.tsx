"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const mockFeatureUsage = [
  { name: "Copy Trading", count: 135 },
  { name: "Sniping", count: 212 },
  { name: "Autobundle Buy", count: 120 },
  { name: "Autobundle Sell", count: 95 },
  { name: "Volume Simulator", count: 50 },
  { name: "Create Token", count: 80 },
  { name: "Buy Tokens", count: 160 },
  { name: "Cross DEX Arbitrage", count: 75 },
  { name: "Volume Tracker", count: 105 },
];

const mockActiveUsers = {
  last24h: 72,
  last7d: 312,
};

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#8B5CF6", "#EC4899"];

export default function Analytics() {
  const [featureData, setFeatureData] = useState<{ name: string; count: number }[]>([]);
  const [incomeData, setIncomeData] = useState<{ name: string; value: number }[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [activeUsers, setActiveUsers] = useState({ last24h: 0, last7d: 0 });

  useEffect(() => {
    setFeatureData(mockFeatureUsage);
    setActiveUsers(mockActiveUsers);

    async function fetchWalletData() {
      try {
        const res = await fetch("/api/wallets");
        const data = await res.json();

        if (data?.totalSol !== undefined) {
          setTotalEarnings(data.totalSol); // total SOL in all wallets
        }

        if (Array.isArray(data?.wallets)) {
          const pieData = data.wallets.map((w: { type: any; address: any; balance: any; }) => ({
            name: w.type || w.address,
            value: w.balance,
          }));
          setIncomeData(pieData);
        }
      } catch (err) {
        console.error("Failed to fetch wallet balances:", err);
      }
    }

    fetchWalletData();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      {/* Active Users & Earnings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-gray-500">Active Users (24h)</h3>
          <p className="text-2xl font-bold text-blue-600">{activeUsers.last24h}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-gray-500">Active Users (7d)</h3>
          <p className="text-2xl font-bold text-green-600">{activeUsers.last7d}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-gray-500">Total Earnings (SOL)</h3>
          <p className="text-2xl font-bold text-emerald-600">
            {totalEarnings.toFixed(4)}
          </p>
        </div>
      </div>

      {/* Feature Usage Chart */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Feature Usage (Top Actions)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={featureData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-15} interval={0} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Earnings Breakdown */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Earnings Breakdown (by Wallet)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={incomeData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
              dataKey="value"
            >
              {incomeData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
