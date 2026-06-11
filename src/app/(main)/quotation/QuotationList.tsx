"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, RefreshCw } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

type Quotation = {
  id: number;
  client_name: string;
  phone: string;
  plot_size: string;
  created_at: string;
};
const dummyQuotations = [
  { id: 1, client_name: "Ramesh Kumar", phone: "9876543210", plot_size: "30x40 ft", plot_address: "123 MG Road, Chennai", created_at: "2025-06-01" },
  { id: 2, client_name: "Priya Sharma", phone: "9123456789", plot_size: "25x50 ft", plot_address: "45 Brigade Road, Bangalore", created_at: "2025-06-02" },
  { id: 3, client_name: "Suresh Babu", phone: "9988776655", plot_size: "40x60 ft", plot_address: "78 Anna Nagar, Chennai", created_at: "2025-06-03" },
  { id: 4, client_name: "Lakshmi Narayanan", phone: "9871234567", plot_size: "20x30 ft", plot_address: "22 Nungambakkam, Chennai", created_at: "2025-06-04" },
  { id: 5, client_name: "Vijay Kumar", phone: "9345678901", plot_size: "35x45 ft", plot_address: "Kochi Junction", created_at: "2025-06-05" },
  { id: 6, client_name: "Anitha Reddy", phone: "9178901234", plot_size: "28x55 ft", plot_address: "Hyderabad", created_at: "2025-06-06" },
  { id: 7, client_name: "Manoj Patel", phone: "9823456789", plot_size: "45x70 ft", plot_address: "Ahmedabad", created_at: "2025-06-07" },
  { id: 8, client_name: "Geetha Menon", phone: "9898765432", plot_size: "22x35 ft", plot_address: "T Nagar, Chennai", created_at: "2025-06-08" },
  { id: 9, client_name: "Karthik Raj", phone: "9012345678", plot_size: "30x40 ft", plot_address: "Anna Nagar West", created_at: "2025-06-09" },
  { id: 10, client_name: "Divya Nair", phone: "9567890123", plot_size: "25x50 ft", plot_address: "Ernakulam", created_at: "2025-06-10" },
  { id: 11, client_name: "Arjun Singh", phone: "9876540987", plot_size: "40x60 ft", plot_address: "Mumbai", created_at: "2025-06-11" },
  { id: 12, client_name: "Meena Kumari", phone: "9123459876", plot_size: "35x45 ft", plot_address: "Mylapore", created_at: "2025-06-12" },
  { id: 13, client_name: "Rahul Sharma", phone: "9988771122", plot_size: "28x55 ft", plot_address: "Connaught Place", created_at: "2025-06-13" },
  { id: 14, client_name: "Sneha Iyer", phone: "9345678901", plot_size: "30x40 ft", plot_address: "Adyar", created_at: "2025-06-14" },
  { id: 15, client_name: "Prakash Rao", phone: "9871234560", plot_size: "45x70 ft", plot_address: "Banjara Hills", created_at: "2025-06-15" },
  { id: 16, client_name: "Sunil Verma", phone: "9567890124", plot_size: "25x50 ft", plot_address: "Jaipur", created_at: "2025-06-16" },
  { id: 17, client_name: "Rekha Nair", phone: "9823456790", plot_size: "35x45 ft", plot_address: "Kochi", created_at: "2025-06-17" },
  { id: 18, client_name: "Amit Patel", phone: "9898765433", plot_size: "40x60 ft", plot_address: "Surat", created_at: "2025-06-18" },
  { id: 19, client_name: "Deepa Menon", phone: "9012345679", plot_size: "22x35 ft", plot_address: "Trivandrum", created_at: "2025-06-19" },
  { id: 20, client_name: "Sanjay Gupta", phone: "9567890125", plot_size: "30x40 ft", plot_address: "Indore", created_at: "2025-06-20" },
  { id: 21, client_name: "Pooja Sharma", phone: "9876543211", plot_size: "28x55 ft", plot_address: "Lucknow", created_at: "2025-06-21" },
  { id: 22, client_name: "Rajesh Kumar", phone: "9123456780", plot_size: "45x70 ft", plot_address: "Patna", created_at: "2025-06-22" },
  { id: 23, client_name: "Meenakshi Iyer", phone: "9988776656", plot_size: "25x50 ft", plot_address: "Coimbatore", created_at: "2025-06-23" },
  { id: 24, client_name: "Vikram Singh", phone: "9345678910", plot_size: "35x45 ft", plot_address: "Jaipur", created_at: "2025-06-24" },
  { id: 25, client_name: "Anjali Reddy", phone: "9871234570", plot_size: "40x60 ft", plot_address: "Hyderabad", created_at: "2025-06-25" },
  { id: 26, client_name: "Kiran Patel", phone: "9567890126", plot_size: "30x40 ft", plot_address: "Ahmedabad", created_at: "2025-06-26" },
  { id: 27, client_name: "Suresh Rao", phone: "9823456791", plot_size: "25x50 ft", plot_address: "Bangalore", created_at: "2025-06-27" },
  { id: 28, client_name: "Latha Menon", phone: "9898765434", plot_size: "35x45 ft", plot_address: "Chennai", created_at: "2025-06-28" },
  { id: 29, client_name: "Mohan Das", phone: "9012345680", plot_size: "28x55 ft", plot_address: "Kochi", created_at: "2025-06-29" },
  { id: 30, client_name: "Shalini Verma", phone: "9567890127", plot_size: "45x70 ft", plot_address: "Mumbai", created_at: "2025-06-30" },
];
export default function QuotationList() {
  const [quotationList, setQuotationList] = useState<Quotation[]>(dummyQuotations);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setQuotationList(dummyQuotations);
      showToast("Quotation list refreshed successfully");
      setLoading(false);
    }, 600);
  };

  const filteredQuotations = useMemo(() => {
    return quotationList.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm);

      let matchesDate = true;
      if (dateFrom || dateTo) {
        const itemDate = new Date(item.created_at);
        if (dateFrom) matchesDate = matchesDate && itemDate >= new Date(dateFrom);
        if (dateTo) {
          const toDate = new Date(dateTo);
          toDate.setHours(23, 59, 59);
          matchesDate = matchesDate && itemDate <= toDate;
        }
      }
      return matchesSearch && matchesDate;
    });
  }, [quotationList, searchTerm, dateFrom, dateTo]);

  const handleClearFilters = () => {
    setSearchTerm("");
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
                <th>Client Name</th>
                <th>Phone</th>
                <th>Plot Size</th>
                <th className="text-center">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotations.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No quotations found
                  </td>
                </tr>
              )}
              {filteredQuotations.map((item, idx) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="text-center">{idx + 1}</td>
                  <td className="font-medium">{item.client_name}</td>
                  <td>{item.phone}</td>
                  <td>{item.plot_size}</td>
                  <td className="text-center">
                    {new Date(item.created_at).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Filter Drawer */}
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
                    <label className="text-sm font-medium mb-1.5 block">Search Client</label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Client name or phone..."
                      className="w-full border rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Created Date Range</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border rounded-md px-3 py-2 text-sm" />
                      <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border rounded-md px-3 py-2 text-sm" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleClearFilters}>Clear</Button>
                  <Button className="flex-1 bg-[#103BB5]" onClick={handleApplyFilters}>Apply Filters</Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}