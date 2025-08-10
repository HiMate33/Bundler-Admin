"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { DollarSign } from "lucide-react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];


export default function Revenue() {
  const [wallets, setWallets] = useState<any[]>([]);
  const [totalSol, setTotalSol] = useState(0);
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  
  const [fees, setFees] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState(false);

  const fetchWallets = () => {
    fetch("/api/wallets")
      .then((res) => res.json())
      .then((data) => {
        setWallets(data.wallets || []);
        setTotalSol(data.totalSol || 0);
      });
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleSave = async () => {
    if (!type || !address) return alert("Please select a type and enter address");

    const res = await fetch("/api/wallets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, address }),
    });
    const data = await res.json();
    setWallets(data.wallets || []);
    setTotalSol(data.totalSol || 0);
    setType("");
    setAddress("");
  };

  const pieData = wallets.map((w) => ({
    name: w.type,
    value: w.balance,
  }));


  
    useEffect(() => {
    fetch("/api/fees")
      .then((res) => res.json())
      .then((data) => {
        const { _id, ...rest } = data; // remove _id from Mongo
        setFees(rest);
      });
  }, []);

  const handleChange = (label: string, value: string) => {
    setFees((prev) => ({ ...prev, [label]: value }));
  };

  const handleFeeSave = async () => {
    await fetch("/api/fees", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fees),
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-4">Revenue Overview</h1>

      {/* Wallet cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {wallets.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="flex items-center gap-3">
              <DollarSign className="text-indigo-600" />
              <div>
                <h2 className="font-semibold">{card.type}</h2>
                <p className="text-lg">{card.balance.toFixed(2)} SOL</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">Wallet: {card.address}</p>
            <button
              onClick={() => {
                setType(card.type);
                setAddress(card.address);
              }}
              className="text-xs text-blue-600 underline"
            >
              Change {card.type} wallet
            </button>
          </div>
        ))}
      </div>

      {/* Total earnings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold text-lg">Total Earning: {totalSol.toFixed(2)} SOL</h2>
          <p className="text-gray-600">Target monthly earning: 110 SOL</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex justify-center">
          <PieChart width={250} height={200}>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={60} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Form to add/update wallet */}
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="font-semibold text-lg">Add / Change Wallet</h2>
        <div className="flex gap-2">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">Select Type</option>
            <option value="trading">Trading/Bundles</option>
            <option value="subscription">Subscription</option>
            <option value="token_creation">Token Creation</option>
            <option value="referral">Referral</option>
            <option value="bundling">Bundling</option>
          </select>
          <input
            type="text"
            placeholder="Wallet Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border px-2 py-1 rounded flex-1"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>




      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold text-lg mb-2">Fees</h2>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          {Object.keys(fees).map((label) => (
        <div key={label} className="flex items-center mb-2">
          <span className="w-48">{label}</span>
          {isEditing ? (
            <input
              type="text"
              value={fees[label]}
              onChange={(e) => handleChange(label, e.target.value)}
              className="border rounded px-2 py-1 w-24"
            />
          ) : (
            <span>{fees[label]}</span>
          )}
        </div>
      ))}
        </div>

        <div className="mt-4 text-right space-x-2">
           {isEditing ? (
          <button
            onClick={handleFeeSave}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Edit
          </button>
        )}
        </div>
      </div>
    </div>
  );
}




