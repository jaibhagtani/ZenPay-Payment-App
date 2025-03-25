// /app/dashboard/page.jsx (Next.js 13+ with the App Router)
// "use client"; is required if you're using client-side hooks like useState, useEffect.
"use client";

import { Button } from "@repo/ui/button";
import { useState, useEffect } from "react";
 // Assume you have a Button component
// If you plan to use a chart library like Recharts or Chart.js, import your chart components here

const Dashboard = () => {
  const [financialHealth, setFinancialHealth] = useState(75); // Example score (out of 100)
  const [budget, setBudget] = useState(1000);
  const [spent, setSpent] = useState(650);
  const [transactions, setTransactions] = useState([
    // Sample transactions. Replace with dynamic data.
    { date: "2024-07-01", description: "Coffee Shop", amount: "₹50" },
    { date: "2024-07-02", description: "Grocery", amount: "₹200" },
    { date: "2024-07-03", description: "Online Purchase", amount: "₹400" },
  ]);

  const budgetProgress = (spent / budget) * 100;

  // For demo, you could load real data here with useEffect

  return (
    <div className="min-h-screen bg-gray-100 p-20 w-full">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">ZenPay Dashboard</h1>
        <p className="text-gray-600">Your financial overview at a glance</p>
      </header>

      {/* Financial Overview Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Financial Health */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Financial Health</h2>
          <div className="flex items-center justify-between mt-2">
            <div className="text-4xl font-bold text-green-500">{financialHealth}</div>
            <div className="text-sm text-gray-500">Score</div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${financialHealth}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Budget Tracker */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Budget Tracker</h2>
          <div className="mt-2">
            <p className="text-gray-600">
              Budget: ₹{budget} | Spent: ₹{spent}
            </p>
            <div className="mt-2 h-4 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${budgetProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Spending Trends */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Spending Trends</h2>
          <div className="mt-4">
            {/* Replace with your Line Chart component */}
            <div className="h-48 flex items-center justify-center text-gray-500">
              Line Chart Placeholder
            </div>
          </div>
        </div>

        {/* Spending Categories */}
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold">Spending Categories</h2>
          <div className="mt-4">
            {/* Replace with your Pie Chart component */}
            <div className="h-48 flex items-center justify-center text-gray-500">
              Pie Chart Placeholder
            </div>
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="bg-white shadow p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Description</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td className="py-2" colSpan={3}>
                  No transactions available.
                </td>
              </tr>
            ) : (
              transactions.map((tx, index) => (
                <tr key={index}>
                  <td className="py-2">{tx.date}</td>
                  <td className="py-2">{tx.description}</td>
                  <td className="py-2">{tx.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Quick Actions */}
      <section className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button onClickFunc={() => {

          }}>Add Transaction</Button>
          <Button onClickFunc={() => {
            
          }}>Send Money</Button>
          <Button onClickFunc={() => {
            
          }}>Request Payment</Button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
