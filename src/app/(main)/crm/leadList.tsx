//  "use client";
// import { useEffect, useState, useCallback, useRef } from "react";
// import { postRequest } from "../utils/api";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";

// type Leads = {
//   id: string;
//   contact_name: string;
//   phone: string;
//   address: string;
//   pincode: string | number;
//   state: string | number;
//   created_at: string;
//   requirement: string;
// };

// export default function LeadList() {
//   const LIMIT = 10;

//   const [leadList, setLeadsList] = useState<Leads[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingMore, setFetchingMore] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef<IntersectionObserver | null>(null);

//   const didInitialFetchRef = useRef(false);

//   const fetchLeadss = useCallback(
//     async (opts: { offset?: number; limit?: number; reset?: boolean } = {}) => {
//       const off = typeof opts.offset === "number" ? opts.offset : offset;
//       const lim = opts.limit ?? LIMIT;
//       const resetFlag = opts.reset ?? false;

//       try {
//         if (resetFlag) {
//           setLoading(true);
//         } else {
//           setFetchingMore(true);
//         }

//         const res = await postRequest({
//           token: "getLeads",
//           data: { offset: off, limit: lim },
//         });

//         if (res && res.success && Array.isArray(res.data)) {
//           if (resetFlag) {
//             setLeadsList(res.data);
//             setOffset(off + res.data.length);
//             setHasMore(res.data.length === lim);
//           } else {
//             setLeadsList((prev) => {
//               const existingIds = new Set(prev.map((p) => p.id));
//               const newItems = res.data.filter((r: Leads) => !existingIds.has(r.id));
//               const next = [...prev, ...newItems];
//               setOffset(off + newItems.length);
//               if (typeof res.meta?.has_more === "boolean") {
//                 setHasMore(res.meta.has_more);
//               } else {
//                 setHasMore(newItems.length === lim);
//               }
//               return next;
//             });
//           }
//         } else {
//           if (resetFlag) setLeadsList([]);
//           setHasMore(false);
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch leads ❌");
//       } finally {
//         setLoading(false);
//         setFetchingMore(false);
//       }
//     },
//     [offset]
//   );

//   // initial load (guarded)
//   useEffect(() => {
//     if (didInitialFetchRef.current) return;
//     didInitialFetchRef.current = true;

//     setOffset(0);
//     setHasMore(true);
//     fetchLeadss({ offset: 0, limit: LIMIT, reset: true });
//   }, [fetchLeadss]);

//   // Intersection observer callback - when last row visible, fetch next page
//   const lastRowRef = useCallback(
//     (node: HTMLElement | null) => {
//       if (fetchingMore) return;
//       if (observer.current) {
//         observer.current.disconnect();
//       }

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore && !loading && !fetchingMore) {
//           fetchLeadss({ offset, limit: LIMIT });
//         }
//       });

//       if (node) observer.current.observe(node);
//     },
//     [fetchLeadss, hasMore, offset, loading, fetchingMore]
//   );

//   // manual refresh
//   const handleRefresh = () => {
//     setOffset(0);
//     setHasMore(true);
//     fetchLeadss({ offset: 0, limit: LIMIT, reset: true });
//   };

//   return (
//     <div className="bg-white p-6">
//       <div className="flex justify-between items-center mb-4">
//         <Button
//           onClick={handleRefresh}
//           variant="default"
//           disabled={loading || fetchingMore}
//         >
//           {loading ? "Refreshing..." : "↻ Refresh"}
//         </Button>
//       </div>

//       <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
//         <table className="table-default w-full">
//           <thead className=" sticky top-0 z-10 bg-white">
//             <tr>
//               <th className="text-center">S.no</th>
//               <th>Leads Name</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th className="text-center">Pincode</th>
//               <th>Requirement</th>
//               <th className="text-center">Created At</th>
//             </tr>
//           </thead>

//           <tbody>
//             {leadList.length === 0 && !loading && (
//               <tr>
//                 <td colSpan={7} className="text-center py-4 text-gray-500">
//                   No leads found
//                 </td>
//               </tr>
//             )}

//             {leadList.map((item, idx) => {
//               const isLast = idx === leadList.length - 1;
//               return (
//                 <tr
//                   key={`${item.id}-${idx}`}
//                   className="border-b"
//                   ref={isLast ? lastRowRef : null}
//                 >
//                   <td className="text-center">{idx + 1}</td>
//                   <td>{item.contact_name}</td>
//                   <td>{item.phone}</td>
//                   <td>{item.address}</td>
//                   <td className="text-center">{item.pincode || "-"}</td>
//                   <td>{item.requirement || "-"}</td>
//                   <td className="text-center">{item.created_at}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {/* Loading indicator for fetching more */}
//         {fetchingMore && (
//           <div className="p-3 text-center text-sm text-gray-600">Loading more...</div>
//         )}

//         {/* End message */}
//         {!hasMore && leadList.length > 0 && (
//           <div className="p-3 text-center text-sm text-gray-600">No more leads</div>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, RefreshCw } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

type Lead = {
  id: number;
  lead_name: string;
  phone: string;
  date: string;
  status: "New" | "Contacted" | "Follow Up" | "Interested" | "Not Interested" | "Converted";
  follow_up_date: string;
  created_at: string;
};

const dummyLeads: Lead[] = [
  { id: 1, lead_name: "Ramesh Kumar", phone: "9876543210", date: "2025-06-01", status: "New", follow_up_date: "2025-06-05", created_at: "2025-06-01" },
  { id: 2, lead_name: "Priya Sharma", phone: "9123456789", date: "2025-06-02", status: "Contacted", follow_up_date: "2025-06-06", created_at: "2025-06-02" },
  { id: 3, lead_name: "Suresh Babu", phone: "9988776655", date: "2025-06-03", status: "Follow Up", follow_up_date: "2025-06-08", created_at: "2025-06-03" },
  { id: 4, lead_name: "Lakshmi Narayanan", phone: "9871234567", date: "2025-06-04", status: "Interested", follow_up_date: "2025-06-07", created_at: "2025-06-04" },
  { id: 5, lead_name: "Vijay Kumar", phone: "9345678901", date: "2025-06-05", status: "Converted", follow_up_date: "2025-06-10", created_at: "2025-06-05" },
  { id: 6, lead_name: "Anitha Reddy", phone: "9178901234", date: "2025-06-06", status: "Not Interested", follow_up_date: "2025-06-09", created_at: "2025-06-06" },
  { id: 7, lead_name: "Manoj Patel", phone: "9823456789", date: "2025-06-07", status: "Follow Up", follow_up_date: "2025-06-12", created_at: "2025-06-07" },
  { id: 8, lead_name: "Geetha Menon", phone: "9898765432", date: "2025-06-08", status: "Interested", follow_up_date: "2025-06-11", created_at: "2025-06-08" },
  { id: 9, lead_name: "Karthik Raj", phone: "9012345678", date: "2025-06-09", status: "Contacted", follow_up_date: "2025-06-13", created_at: "2025-06-09" },
  { id: 10, lead_name: "Divya Nair", phone: "9567890123", date: "2025-06-10", status: "New", follow_up_date: "2025-06-15", created_at: "2025-06-10" },
  { id: 11, lead_name: "Arjun Singh", phone: "9876540987", date: "2025-06-11", status: "Follow Up", follow_up_date: "2025-06-14", created_at: "2025-06-11" },
  { id: 12, lead_name: "Meena Kumari", phone: "9123459876", date: "2025-06-12", status: "Interested", follow_up_date: "2025-06-16", created_at: "2025-06-12" },
  { id: 13, lead_name: "Rahul Sharma", phone: "9988771122", date: "2025-06-13", status: "Converted", follow_up_date: "2025-06-18", created_at: "2025-06-13" },
  { id: 14, lead_name: "Sneha Iyer", phone: "9345678901", date: "2025-06-14", status: "Not Interested", follow_up_date: "2025-06-17", created_at: "2025-06-14" },
  { id: 15, lead_name: "Prakash Rao", phone: "9871234560", date: "2025-06-15", status: "Follow Up", follow_up_date: "2025-06-20", created_at: "2025-06-15" },
  { id: 16, lead_name: "Sunil Verma", phone: "9567890124", date: "2025-06-16", status: "New", follow_up_date: "2025-06-19", created_at: "2025-06-16" },
  { id: 17, lead_name: "Rekha Nair", phone: "9823456790", date: "2025-06-17", status: "Interested", follow_up_date: "2025-06-21", created_at: "2025-06-17" },
  { id: 18, lead_name: "Amit Patel", phone: "9898765433", date: "2025-06-18", status: "Contacted", follow_up_date: "2025-06-22", created_at: "2025-06-18" },
  { id: 19, lead_name: "Deepa Menon", phone: "9012345679", date: "2025-06-19", status: "Follow Up", follow_up_date: "2025-06-23", created_at: "2025-06-19" },
  { id: 20, lead_name: "Sanjay Gupta", phone: "9567890125", date: "2025-06-20", status: "Converted", follow_up_date: "2025-06-25", created_at: "2025-06-20" },
  { id: 21, lead_name: "Pooja Sharma", phone: "9876543211", date: "2025-06-21", status: "New", follow_up_date: "2025-06-24", created_at: "2025-06-21" },
  { id: 22, lead_name: "Rajesh Kumar", phone: "9123456780", date: "2025-06-22", status: "Interested", follow_up_date: "2025-06-26", created_at: "2025-06-22" },
  { id: 23, lead_name: "Meenakshi Iyer", phone: "9988776656", date: "2025-06-23", status: "Follow Up", follow_up_date: "2025-06-27", created_at: "2025-06-23" },
  { id: 24, lead_name: "Vikram Singh", phone: "9345678910", date: "2025-06-24", status: "Contacted", follow_up_date: "2025-06-28", created_at: "2025-06-24" },
  { id: 25, lead_name: "Anjali Reddy", phone: "9871234570", date: "2025-06-25", status: "Not Interested", follow_up_date: "2025-06-29", created_at: "2025-06-25" },
];

export default function LeadList() {
  const [leadList, setLeadList] = useState<Lead[]>(dummyLeads);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLeadList(dummyLeads);
      showToast("Leads list refreshed successfully");
      setLoading(false);
    }, 600);
  };

  const filteredLeads = useMemo(() => {
    return leadList.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.lead_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm);

      const matchesStatus = !selectedStatus || item.status === selectedStatus;

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
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [leadList, searchTerm, selectedStatus, dateFrom, dateTo]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("");
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
          <Button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh"}
          </Button>

          <Button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white px-3"
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
          <table className="table-default w-full">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th className="text-center">S.no</th>
                <th>Lead Name</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Status</th>
                <th>Follow Up Date</th>
                <th className="text-center">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No leads found
                  </td>
                </tr>
              )}
              {filteredLeads.map((item, idx) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="text-center">{idx + 1}</td>
                  <td className="font-medium">{item.lead_name}</td>
                  <td>{item.phone}</td>
                  <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "Converted"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Not Interested"
                          ? "bg-red-100 text-red-700"
                          : item.status === "Interested"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>{new Date(item.follow_up_date).toLocaleDateString("en-GB")}</td>
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
                    <label className="text-sm font-medium mb-1.5 block">Search Lead</label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Name or Phone..."
                      className="w-full border rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">All Status</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Follow Up">Follow Up</option>
                      <option value="Interested">Interested</option>
                      <option value="Not Interested">Not Interested</option>
                      <option value="Converted">Converted</option>
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
                  <Button variant="outline" className="flex-1" onClick={handleClearFilters}>
                    Clear
                  </Button>
                  <Button className="flex-1 bg-[#103BB5]" onClick={handleApplyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}