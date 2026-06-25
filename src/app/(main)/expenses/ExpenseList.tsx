// "use client";

// import { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { Filter, X, RefreshCw } from "lucide-react";
// import { Toaster } from "@/components/ui/toaster";

// type Expense = {
//   id: number;
//   date: string;
//   expense_category: string;
//   bank_account: string;
//   mode: string;
//   amount: number;
//   remarks?: string;
//   created_at: string;
// };

// const dummyExpenses = [
//   { id: 1, date: "2025-06-01", expense_category: "Electricity Bill", bank_account: "HDFC - 501002345678", mode: "neft", amount: 2450, remarks: "Monthly bill", created_at: "2025-06-01" },
//   { id: 2, date: "2025-06-02", expense_category: "Salary", bank_account: "SBI - 12345678901", mode: "cash", amount: 45000, remarks: "Staff salary", created_at: "2025-06-02" },
//   { id: 3, date: "2025-06-03", expense_category: "Transportation", bank_account: "ICICI - 0987654321", mode: "upi", amount: 1250, remarks: "Fuel", created_at: "2025-06-03" },
//   { id: 4, date: "2025-06-04", expense_category: "Rent", bank_account: "HDFC - 501002345678", mode: "neft", amount: 35000, remarks: "Office rent", created_at: "2025-06-04" },
//   { id: 5, date: "2025-06-05", expense_category: "Internet", bank_account: "Axis - 9876543210", mode: "upi", amount: 899, remarks: "", created_at: "2025-06-05" },
//   { id: 6, date: "2025-06-06", expense_category: "Maintenance", bank_account: "SBI - 12345678901", mode: "cash", amount: 3200, remarks: "AC repair", created_at: "2025-06-06" },
//   { id: 7, date: "2025-06-07", expense_category: "Office Supplies", bank_account: "HDFC - 501002345678", mode: "upi", amount: 1450, remarks: "Stationery", created_at: "2025-06-07" },
//   { id: 8, date: "2025-06-08", expense_category: "Marketing", bank_account: "ICICI - 0987654321", mode: "neft", amount: 8500, remarks: "Social media ads", created_at: "2025-06-08" },
//   { id: 9, date: "2025-06-09", expense_category: "Travel", bank_account: "Axis - 9876543210", mode: "cash", amount: 6200, remarks: "Client meeting", created_at: "2025-06-09" },
//   { id: 10, date: "2025-06-10", expense_category: "Water Bill", bank_account: "SBI - 12345678901", mode: "upi", amount: 780, remarks: "", created_at: "2025-06-10" },
//   { id: 11, date: "2025-06-11", expense_category: "Salary", bank_account: "HDFC - 501002345678", mode: "neft", amount: 42000, remarks: "June salary", created_at: "2025-06-11" },
//   { id: 12, date: "2025-06-12", expense_category: "Repair", bank_account: "ICICI - 0987654321", mode: "cash", amount: 1850, remarks: "Machine repair", created_at: "2025-06-12" },
//   { id: 13, date: "2025-06-13", expense_category: "Food & Refreshment", bank_account: "Axis - 9876543210", mode: "upi", amount: 2340, remarks: "Team lunch", created_at: "2025-06-13" },
//   { id: 14, date: "2025-06-14", expense_category: "Insurance", bank_account: "HDFC - 501002345678", mode: "neft", amount: 12500, remarks: "Vehicle insurance", created_at: "2025-06-14" },
//   { id: 15, date: "2025-06-15", expense_category: "Software Subscription", bank_account: "SBI - 12345678901", mode: "upi", amount: 2999, remarks: "CRM tool", created_at: "2025-06-15" },
//   { id: 16, date: "2025-06-16", expense_category: "Electricity Bill", bank_account: "ICICI - 0987654321", mode: "neft", amount: 2680, remarks: "", created_at: "2025-06-16" },
//   { id: 17, date: "2025-06-17", expense_category: "Transportation", bank_account: "Axis - 9876543210", mode: "cash", amount: 980, remarks: "Courier", created_at: "2025-06-17" },
//   { id: 18, date: "2025-06-18", expense_category: "Rent", bank_account: "HDFC - 501002345678", mode: "neft", amount: 35000, remarks: "", created_at: "2025-06-18" },
//   { id: 19, date: "2025-06-19", expense_category: "Marketing", bank_account: "SBI - 12345678901", mode: "upi", amount: 7200, remarks: "Google ads", created_at: "2025-06-19" },
//   { id: 20, date: "2025-06-20", expense_category: "Maintenance", bank_account: "ICICI - 0987654321", mode: "cash", amount: 4100, remarks: "Plumbing", created_at: "2025-06-20" },
//   { id: 21, date: "2025-06-21", expense_category: "Salary", bank_account: "Axis - 9876543210", mode: "neft", amount: 48000, remarks: "", created_at: "2025-06-21" },
//   { id: 22, date: "2025-06-22", expense_category: "Internet", bank_account: "HDFC - 501002345678", mode: "upi", amount: 899, remarks: "", created_at: "2025-06-22" },
//   { id: 23, date: "2025-06-23", expense_category: "Office Supplies", bank_account: "SBI - 12345678901", mode: "cash", amount: 1680, remarks: "", created_at: "2025-06-23" },
//   { id: 24, date: "2025-06-24", expense_category: "Travel", bank_account: "ICICI - 0987654321", mode: "upi", amount: 5340, remarks: "Site visit", created_at: "2025-06-24" },
//   { id: 25, date: "2025-06-25", expense_category: "Water Bill", bank_account: "Axis - 9876543210", mode: "neft", amount: 650, remarks: "", created_at: "2025-06-25" },
//   { id: 26, date: "2025-06-26", expense_category: "Repair", bank_account: "HDFC - 501002345678", mode: "cash", amount: 2750, remarks: "Electrical", created_at: "2025-06-26" },
//   { id: 27, date: "2025-06-27", expense_category: "Food & Refreshment", bank_account: "SBI - 12345678901", mode: "upi", amount: 1890, remarks: "", created_at: "2025-06-27" },
//   { id: 28, date: "2025-06-28", expense_category: "Insurance", bank_account: "ICICI - 0987654321", mode: "neft", amount: 8900, remarks: "", created_at: "2025-06-28" },
//   { id: 29, date: "2025-06-29", expense_category: "Software Subscription", bank_account: "Axis - 9876543210", mode: "upi", amount: 3499, remarks: "", created_at: "2025-06-29" },
//   { id: 30, date: "2025-06-30", expense_category: "Electricity Bill", bank_account: "HDFC - 501002345678", mode: "neft", amount: 2890, remarks: "", created_at: "2025-06-30" },
// ];

// export default function ExpenseList() {
//   const [expenseList, setExpenseList] = useState<Expense[]>(dummyExpenses);
//   const [loading, setLoading] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedMode, setSelectedMode] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const showToast = (message: string, type: "success" | "error" = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 2500);
//   };

//   const handleRefresh = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setExpenseList(dummyExpenses);
//       showToast("Expense list refreshed successfully");
//       setLoading(false);
//     }, 600);
//   };

//   const filteredExpenses = useMemo(() => {
//     return expenseList.filter((item) => {
//       const matchesSearch =
//         !searchTerm ||
//         item.expense_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.bank_account.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesMode = !selectedMode || item.mode === selectedMode;

//       let matchesDate = true;
//       if (dateFrom || dateTo) {
//         const itemDate = new Date(item.date);
//         if (dateFrom) matchesDate = matchesDate && itemDate >= new Date(dateFrom);
//         if (dateTo) {
//           const toDate = new Date(dateTo);
//           toDate.setHours(23, 59, 59);
//           matchesDate = matchesDate && itemDate <= toDate;
//         }
//       }
//       return matchesSearch && matchesMode && matchesDate;
//     });
//   }, [expenseList, searchTerm, selectedMode, dateFrom, dateTo]);

//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setSelectedMode("");
//     setDateFrom("");
//     setDateTo("");
//     showToast("Filters cleared");
//     setShowFilters(false);
//   };

//   const handleApplyFilters = () => {
//     showToast("Filters applied successfully");
//     setShowFilters(false);
//   };

//   return (
//     <>
//       {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

//       <div className="bg-white">
//         <div className="flex justify-end items-center gap-3 mb-6 pr-4">
//           <Button onClick={handleRefresh} disabled={loading} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white">
//             <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
//             {loading ? "Refreshing..." : "Refresh"}
//           </Button>

//           <Button onClick={() => setShowFilters(true)} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white px-3">
//             <Filter className="h-4 w-4" />
//           </Button>
//         </div>

//         <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
//           <table className="table-default w-full">
//             <thead className="sticky top-0 bg-white z-10">
//               <tr>
//                 <th className="text-center">S.no</th>
//                 <th>Date</th>
//                 <th>Expense Category</th>
//                 <th>Bank Account</th>
//                 <th>Mode</th>
//                 <th className="text-right">Amount</th>
//                 <th className="text-center">Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredExpenses.length === 0 && (
//                 <tr>
//                   <td colSpan={7} className="text-center py-8 text-gray-500">
//                     No expenses found
//                   </td>
//                 </tr>
//               )}
//               {filteredExpenses.map((item, idx) => (
//                 <tr key={item.id} className="border-b hover:bg-gray-50">
//                   <td className="text-center">{idx + 1}</td>
//                   <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
//                   <td>{item.expense_category}</td>
//                   <td>{item.bank_account}</td>
//                   <td className="text-center capitalize">{item.mode}</td>
//                   <td className="text-right font-medium">₹ {item.amount.toLocaleString()}</td>
//                   <td className="text-center">{new Date(item.created_at).toLocaleDateString("en-GB")}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Filter Drawer */}
//         {showFilters && (
//           <>
//             <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setShowFilters(false)} />
//             <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
//               <div className="p-6">
//                 <div className="flex justify-between mb-6">
//                   <h2 className="text-lg font-semibold">Filters</h2>
//                   <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
//                     <X className="h-5 w-5" />
//                   </Button>
//                 </div>

//                 <div className="space-y-6">
//                   <div>
//                     <label className="text-sm font-medium mb-1.5 block">Search</label>
//                     <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Category or account" className="w-full border rounded-md px-3 py-2 text-sm" />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium mb-2 block">Payment Mode</label>
//                     <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm">
//                       <option value="">All Modes</option>
//                       <option value="cash">Cash</option>
//                       <option value="upi">UPI</option>
//                       <option value="neft">NEFT</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium mb-1.5 block">Date Range</label>
//                     <div className="grid grid-cols-2 gap-3">
//                       <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border rounded-md px-3 py-2 text-sm" />
//                       <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border rounded-md px-3 py-2 text-sm" />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8 flex gap-3">
//                   <Button variant="outline" className="flex-1" onClick={handleClearFilters}>Clear</Button>
//                   <Button className="flex-1 bg-[#103BB5]" onClick={handleApplyFilters}>Apply</Button>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }


//API
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, RefreshCw } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

import { postAPI } from "@/app/utils/api";

type Expense = {
  id: number | string;
  date: string;
  expense_category: string;
  bank_account: string;
  mode: string;
  amount: number;
  remarks?: string;
  created_at: string;
};

export default function ExpenseList() {
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMode, setSelectedMode] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // ==================== FETCH EXPENSES ====================
  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const response = await postAPI("EXPENSE_LIST", {}, true); // Add this endpoint

      if (response.status === "success" && Array.isArray(response.data)) {
        setExpenseList(response.data);
        showToast("Expense list loaded successfully");
      } else {
        showToast(response.message || "Failed to load expenses", "error");
      }
    } catch (error: any) {
      showToast(error.message || "Failed to fetch expenses", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleRefresh = () => {
    fetchExpenses();
  };

  const filteredExpenses = useMemo(() => {
    return expenseList.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.expense_category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bank_account.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMode = !selectedMode || item.mode === selectedMode;

      let matchesDate = true;
      if (dateFrom || dateTo) {
        const itemDate = new Date(item.date);
        if (dateFrom) matchesDate = matchesDate && itemDate >= new Date(dateFrom);
        if (dateTo) {
          const toDate = new Date(dateTo);
          toDate.setHours(23, 59, 59);
          matchesDate = matchesDate && itemDate <= toDate;
        }
      }
      return matchesSearch && matchesMode && matchesDate;
    });
  }, [expenseList, searchTerm, selectedMode, dateFrom, dateTo]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedMode("");
    setDateFrom("");
    setDateTo("");
    showToast("Filters cleared");
    setShowFilters(false);
  };

  const handleApplyFilters = () => {
    showToast("Filters applied successfully");
    setShowFilters(false);
  };

  return (
    <>
      {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="bg-white">
        <div className="flex justify-end items-center gap-3 mb-6 pr-4">
          <Button onClick={handleRefresh} disabled={loading} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh"}
          </Button>

          <Button onClick={() => setShowFilters(true)} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white px-3">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
          <table className="table-default w-full">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th className="text-center">S.no</th>
                <th>Date</th>
                <th>Expense Category</th>
                <th>Bank Account</th>
                <th>Mode</th>
                <th className="text-right">Amount</th>
                <th className="text-center">Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading && expenseList.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    Loading expenses...
                  </td>
                </tr>
              )}

              {!loading && filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No expenses found
                  </td>
                </tr>
              )}

              {filteredExpenses.map((item, idx) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="text-center">{idx + 1}</td>
                  <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                  <td>{item.expense_category}</td>
                  <td>{item.bank_account}</td>
                  <td className="text-center capitalize">{item.mode}</td>
                  <td className="text-right font-medium">₹ {item.amount.toLocaleString()}</td>
                  <td className="text-center">{new Date(item.created_at).toLocaleDateString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Filter Drawer - unchanged */}
        {showFilters && (
          <>
            <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setShowFilters(false)} />
            <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Search</label>
                    <input 
                      type="text" 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                      placeholder="Category or account" 
                      className="w-full border rounded-md px-3 py-2 text-sm" 
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Payment Mode</label>
                    <select 
                      value={selectedMode} 
                      onChange={(e) => setSelectedMode(e.target.value)} 
                      className="w-full border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">All Modes</option>
                      <option value="cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="neft">NEFT</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Date Range</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border rounded-md px-3 py-2 text-sm" />
                      <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border rounded-md px-3 py-2 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleClearFilters}>Clear</Button>
                  <Button className="flex-1 bg-[#103BB5]" onClick={handleApplyFilters}>Apply</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}