"use client";

import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { DollarSign } from "lucide-react";

const pieData = [
  { name: "Trading", value: 7.5 },
  { name: "Subscription", value: 4 },
  { name: "Token Creation", value: 1.2 },
  { name: "Referral", value: 0.5 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const initialFees = {
  "Create Token": "0.2",
  "Freeze Mint": "0.1",
  "Weekly Subscription": "1.7",
  "Monthly Subscription": "3.4",
  "Copy Trading": "2.0",
  "Bundle": "1.2",
  "Sniping": "7.2",
  "Book Trade": "1.2",
  "Copy Trade": "5.4",
};

export default function Revenue() {
  const [isEditing, setIsEditing] = useState(false);
  const [fees, setFees] = useState(initialFees);

  const handleFeeChange = (key: string, value: string) => {
    setFees((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated Fees:", fees); // You can handle save logic here (e.g. API call)
  };

  const handleCancel = () => {
    setFees(initialFees);
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Revenue Overview</h1>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {[
          { title: "Trading/Bundles", amount: "2.75 SOL", wallet: "0xabc...", note: "Change trade wallet" },
          { title: "Subscription", amount: "4 SOL", wallet: "0xabc...", note: "Change subscription wallet" },
          { title: "Token Creation", amount: "1.2 SOL", wallet: "0xabc...", note: "Change wallet" },
          { title: "Referral Earnings", amount: "0.5 SOL", wallet: "0xabc...", note: "Change wallet" },
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="flex items-center gap-3">
              <DollarSign className="text-indigo-600" />
              <div>
                <h2 className="font-semibold">{card.title}</h2>
                <p className="text-lg">{card.amount}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Wallet: {card.wallet}</p>
            <button className="text-xs text-blue-600 underline">{card.note}</button>
          </div>
        ))}
      </div>

      {/* Total + Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">Total Earning: 45 SOL</h2>
          <p className="text-gray-600">Target monthly earning: 110 SOL</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex justify-center">
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Fee Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold text-lg mb-2">Fees</h2>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          {Object.entries(fees).map(([label, value]) => (
            <React.Fragment key={label}>
              <div>• {label}</div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleFeeChange(label, e.target.value)}
                    className="border px-2 py-1 w-20 text-right rounded"
                  />
                ) : (
                  <span>{value}</span>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-4 text-right space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
            >
              Edit Fee
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
