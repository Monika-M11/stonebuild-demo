"use client";

import React, { useState, Suspense } from "react";
import NewQuotation from "./NewQuotation";

const QuotationList = React.lazy(() => import("./QuotationList"));

type TabKey = "entry" | "list";

export default function QuotationPage() {
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
          New Quotation
        </button>

        <button
          onClick={() => setActiveTab("list")}
          className={`px-6 py-3 font-medium transition-all ${
            activeTab === "list" ? "border-b-2 border-[#103BB5] text-[#103BB5]" : "text-gray-500 hover:text-[#103BB5]"
          }`}
        >
          Quotation List
        </button>
      </div>

      <div>
        {activeTab === "entry" && <NewQuotation />}
        {activeTab === "list" && (
          <Suspense fallback={<div className="p-6">Loading Quotations...</div>}>
            <QuotationList />
          </Suspense>
        )}
      </div>
    </div>
  );
}