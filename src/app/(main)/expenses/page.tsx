"use client";

import React, { useState, Suspense } from "react";
import NewExpense from "./NewExpense";

const ExpenseList = React.lazy(() => import("./ExpenseList"));

type TabKey = "entry" | "list";

export default function ExpensePage() {
  const [activeTab, setActiveTab] = useState<TabKey>("entry");

  return (
    <div className="px-6">
      <div className="flex border-b border-gray-300">
        <button
          onClick={() => setActiveTab("entry")}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === "entry" ? "border-b-2 border-[#103BB5] text-[#103BB5]" : "text-gray-500 hover:text-[#103BB5]"
          }`}
        >
          New Expense
        </button>

        <button
          onClick={() => setActiveTab("list")}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === "list" ? "border-b-2 border-[#103BB5] text-[#103BB5]" : "text-gray-500 hover:text-[#103BB5]"
          }`}
        >
          Expense List
        </button>
      </div>

      <div>
        {activeTab === "entry" && <NewExpense />}
        {activeTab === "list" && (
          <Suspense fallback={<div className="p-6">Loading Expenses...</div>}>
            <ExpenseList />
          </Suspense>
        )}
      </div>
    </div>
  );
}