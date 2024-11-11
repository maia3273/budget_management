"use client";
import React from "react";

function MainComponent() {
  const [budgets, setBudgets] = useState([
    { id: 1, category: "食費", total: 50000, used: 30000 },
    { id: 2, category: "交通費", total: 20000, used: 15000 },
    { id: 3, category: "娯楽費", total: 30000, used: 10000 },
    { id: 4, category: "光熱費", total: 25000, used: 20000 },
  ]);
  const calculatePercentage = (used, total) => {
    return (used / total) * 100;
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-800 font-noto">
                  💰 家計簿アプリ
                </span>
              </div>
              <div className="hidden md:flex md:items-center md:ml-6 space-x-4">
                <a
                  href="#"
                  className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium font-noto"
                >
                  予算管理
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium font-noto"
                >
                  支出記録
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium font-noto"
                >
                  レポート
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 font-noto">
            予算管理
          </h1>
          <div className="grid gap-6">
            {budgets.map((budget) => {
              const percentage = calculatePercentage(budget.used, budget.total);
              const remaining = budget.total - budget.used;
              return (
                <div
                  key={budget.id}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-700 font-noto">
                      {budget.category}
                    </h2>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 font-noto">
                        残額: ¥{remaining.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 font-noto">
                        予算: ¥{budget.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-right">
                        <span className="text-sm font-semibold inline-block text-blue-600">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-3 bg-gray-200 rounded-full">
                      <div
                        style={{ width: `${percentage}%` }}
                        className={`h-full rounded-full ${
                          percentage >= 90
                            ? "bg-red-500"
                            : percentage >= 70
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4 font-noto">
              新しい予算を設定
            </h2>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  name="category"
                  placeholder="カテゴリー名"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="budget"
                  placeholder="予算額"
                  className="w-full p-2 border rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                追加
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainComponent;