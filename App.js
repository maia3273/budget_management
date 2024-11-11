"use client";
import React from "react";
import { useState } from "react";
import "./style.css";

function MainComponent() {
  const [transactions, setTransactions] = useState([]);
  const [quickInputs] = useState([
    { category: "食費", amount: 1000, type: "支出" },
    { category: "給料", amount: 250000, type: "収入" },
    { category: "交通費", amount: 500, type: "支出" },
  ]);
  const [timeframe, setTimeframe] = useState("month");

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    amount: "",
    type: "支出",
    memo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTransactions((prev) => [...prev, formData]);
    setFormData({
      date: new Date().toISOString().split("T")[0],
      category: "",
      amount: "",
      type: "支出",
      memo: "",
    });
  };

  const handleQuickInput = (item) => {
    const newTransaction = {
      date: new Date().toISOString().split("T")[0],
      ...item,
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center font-noto">
          家計簿ダッシュボードsss
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 font-noto">収支入力</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex space-x-2">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                >
                  <option value="支出">支出</option>
                  <option value="収入">収入</option>
                </select>
                <input
                  type="text"
                  name="category"
                  placeholder="カテゴリ"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="flex-1 p-2 border rounded"
                />
              </div>
              <input
                type="number"
                name="amount"
                placeholder="金額"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="memo"
                placeholder="メモ"
                value={formData.memo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                記録する
              </button>
            </form>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2 font-noto">クイック入力</h3>
              <div className="flex flex-wrap gap-2">
                {quickInputs.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickInput(item)}
                    className="bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                  >
                    {item.category} ({item.amount}円)
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg col-span-2">
            <h2 className="text-xl font-bold mb-4 font-noto">支出分析</h2>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setTimeframe("day")}
                className={`px-4 py-2 rounded ${
                  timeframe === "day" ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                日別
              </button>
              <button
                onClick={() => setTimeframe("week")}
                className={`px-4 py-2 rounded ${
                  timeframe === "week"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                週別
              </button>
              <button
                onClick={() => setTimeframe("month")}
                className={`px-4 py-2 rounded ${
                  timeframe === "month"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                月別
              </button>
            </div>
            <div className="h-[300px] bg-gray-50 rounded flex items-center justify-center">
              <p className="text-gray-500">グラフ表示エリア</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 font-noto">最近の取引</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left">日付</th>
                  <th className="p-2 text-left">種類</th>
                  <th className="p-2 text-left">カテゴリ</th>
                  <th className="p-2 text-right">金額</th>
                  <th className="p-2 text-left">メモ</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{transaction.date}</td>
                    <td className="p-2">{transaction.type}</td>
                    <td className="p-2">{transaction.category}</td>
                    <td className="p-2 text-right">{transaction.amount}円</td>
                    <td className="p-2">{transaction.memo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
