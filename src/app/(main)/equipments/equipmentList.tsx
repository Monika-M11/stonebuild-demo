//  "use client";
// import { useEffect, useState, useCallback, useRef } from "react";
// import { postRequest } from "../utils/api";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";

// type Equipment = {
//   id: number;
//   equipment_name: string;
//   brand?: string;
//   model?: string;
//   status?: string;
//   purchase_date?: string;
//   last_service_date?: string;
//   next_service_date?: string;
//   total_count?: number;
//   created_by?: string;
//   created_at?: string;
//   codes_count?: number;
//   codes?: string[];
// };

// export default function EquipmentList() {
//   const LIMIT = 10;

//   const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingMore, setFetchingMore] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef<IntersectionObserver | null>(null);
//   const didInitialFetchRef = useRef(false);

//   const fetchEquipments = useCallback(
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
//           token: "getEquipments",
//           data: { offset: off, limit: lim },
//         });

//         if (res && res.success && Array.isArray(res.data)) {
//           const returned = res.data as Equipment[];
//           // when resetting, replace list
//           if (resetFlag) {
//             setEquipmentList(returned);
//             setOffset(off + returned.length);
//             setHasMore(typeof res.meta?.has_more === "boolean" ? res.meta.has_more : returned.length === lim);
//           } else {
//             setEquipmentList((prev) => {
//               const existingIds = new Set(prev.map((p) => p.id));
//               const newItems = returned.filter((r) => !existingIds.has(r.id));
//               const next = [...prev, ...newItems];
//               return next;
//             });
//             // update offset and hasMore after state update
//             setOffset((prevOff) => prevOff + returned.length);
//             setHasMore(typeof res.meta?.has_more === "boolean" ? res.meta.has_more : returned.length === lim);
//           }
//         } else {
//           if (resetFlag) setEquipmentList([]);
//           setHasMore(false);
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch equipments ❌");
//       } finally {
//         setLoading(false);
//         setFetchingMore(false);
//       }
//     },
//     // intentionally do not include `offset` in deps to avoid stale setState loops;
//     // we pass offset explicitly when calling (or rely on updated state via setOffset).
//     []
//   );

//   // initial load (guarded)
//   useEffect(() => {
//     if (didInitialFetchRef.current) return;
//     didInitialFetchRef.current = true;

//     setOffset(0);
//     setHasMore(true);
//     fetchEquipments({ offset: 0, limit: LIMIT, reset: true });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Intersection observer callback - when last row visible, fetch next page
//   const lastRowRef = useCallback(
//     (node: HTMLElement | null) => {
//       if (fetchingMore) return;
//       if (observer.current) {
//         observer.current.disconnect();
//       }

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore && !loading && !fetchingMore) {
//           // fetch using current offset
//           fetchEquipments({ offset, limit: LIMIT });
//         }
//       });

//       if (node) observer.current.observe(node);
//     },
//     [fetchEquipments, hasMore, offset, loading, fetchingMore]
//   );

//   // manual refresh
//   const handleRefresh = () => {
//     setOffset(0);
//     setHasMore(true);
//     fetchEquipments({ offset: 0, limit: LIMIT, reset: true });
//   };

//   const renderCodes = (item: Equipment) => {
//     const codes = item.codes ?? [];
//     if (codes.length === 0) return <span className="text-sm text-gray-500">—</span>;

//     const shown = codes.slice(0, 2).join(", ");
//     return (
//       <div className="text-sm">
//         <div className="font-medium">{item.codes_count ?? codes.length} code{(item.codes_count ?? codes.length) > 1 ? "s" : ""}</div>
//         <div className="text-xs text-gray-600 truncate max-w-[220px]">{shown}{codes.length > 2 ? ` +${codes.length - 2}` : ""}</div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white p-6">
//       <div className="flex justify-between items-center mb-4">
//         <Button onClick={handleRefresh} variant="default" disabled={loading || fetchingMore}>
//           {loading ? "Refreshing..." : "↻ Refresh"}
//         </Button>
//       </div>

//       <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
//         <table className="table-default w-full">
//           <thead className=" sticky top-0 z-10 bg-white">
//             <tr>
//               <th className="text-center">S.no</th>
//               <th>Equipment Name</th>
//               <th>Brand</th>
//               <th>Model</th>
//               <th className="text-center">Status</th>
//               <th>Codes</th>
//               <th className="text-center">Created At</th>
//             </tr>
//           </thead>

//           <tbody>
//             {equipmentList.length === 0 && !loading && (
//               <tr>
//                 <td colSpan={7} className="text-center py-4 text-gray-500">
//                   No equipments found
//                 </td>
//               </tr>
//             )}

//             {equipmentList.map((item, idx) => {
//               const isLast = idx === equipmentList.length - 1;
//               const serial = offset - equipmentList.length + idx + 1; // compute continuous serial based on offset
//               // fallback if serial becomes NaN/invalid
//               const sNo = Number.isFinite(serial) && serial > 0 ? serial : idx + 1;
//               return (
//                 <tr key={`${item.id}-${idx}`} className="border-b" ref={isLast ? lastRowRef : null}>
//                   <td className="text-center">{sNo}</td>
//                   <td className="font-medium">{item.equipment_name}</td>
//                   <td>{item.brand || "-"}</td>
//                   <td>{item.model || "-"}</td>
//                   <td className="text-center">{item.status || "-"}</td>
//                   <td>{renderCodes(item)}</td>
//                   <td className="text-center">{item.created_at || "-"}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {/* Loading indicator for fetching more */}
//         {fetchingMore && <div className="p-3 text-center text-sm text-gray-600">Loading more...</div>}

//         {/* End message */}
//         {!hasMore && equipmentList.length > 0 && <div className="p-3 text-center text-sm text-gray-600">No more equipments</div>}
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

type Equipment = {
  id: number;
  equipment_name: string;
  brand?: string;
  model?: string;
  status: string;
  purchase_date?: string;
  last_service_date?: string;
  next_service_date?: string;
  codes_count?: number;
  codes?: string[];
  created_at?: string;
};

const dummyEquipments: Equipment[] = [
  // ... (your dummy data remains the same)
  { id: 1, equipment_name: "Gold Testing Machine", brand: "Karatmeter", model: "KM-2025", status: "active", codes_count: 5, created_at: "2025-06-01" },
  { id: 2, equipment_name: "Digital Weighing Scale", brand: "CAS", model: "CS-500", status: "active", codes_count: 3, created_at: "2025-06-02" },
  { id: 3, equipment_name: "Laser Engraver", brand: "Gravotech", model: "LS-100", status: "inactive", codes_count: 8, created_at: "2025-06-03" },
  { id: 4, equipment_name: "Polishing Machine", brand: "Suhner", model: "P-300", status: "active", codes_count: 4, created_at: "2025-06-04" },
  { id: 5, equipment_name: "Jewelry Cutter", brand: "Proxxon", model: "DS-460", status: "active", codes_count: 6, created_at: "2025-06-05" },
  { id: 6, equipment_name: "Microscope", brand: "Olympus", model: "SZ-61", status: "active", codes_count: 2, created_at: "2025-06-06" },
  { id: 7, equipment_name: "Ultrasonic Cleaner", brand: "Crest", model: "U-100", status: "inactive", codes_count: 7, created_at: "2025-06-07" },
  { id: 8, equipment_name: "Melting Furnace", brand: "Indutherm", model: "MF-200", status: "active", codes_count: 3, created_at: "2025-06-08" },
  { id: 9, equipment_name: "Engraving Tool", brand: "GRS", model: "GraverMax", status: "active", codes_count: 5, created_at: "2025-06-09" },
  { id: 10, equipment_name: "Diamond Tester", brand: "Presidium", model: "DT-100", status: "active", codes_count: 4, created_at: "2025-06-10" },
  { id: 11, equipment_name: "Rolling Mill", brand: "Durston", model: "DRM-130", status: "active", codes_count: 6, created_at: "2025-06-11" },
  { id: 12, equipment_name: "Annealing Torch", brand: "Smith", model: "Little Torch", status: "inactive", codes_count: 2, created_at: "2025-06-12" },
  { id: 13, equipment_name: "Vacuum Casting Machine", brand: "Indutherm", model: "VC-400", status: "active", codes_count: 7, created_at: "2025-06-13" },
  { id: 14, equipment_name: "Handheld Scanner", brand: "Honeywell", model: "1900", status: "active", codes_count: 3, created_at: "2025-06-14" },
  { id: 15, equipment_name: "Jewelry Buffer", brand: "Grobet", model: "B-200", status: "active", codes_count: 4, created_at: "2025-06-15" },
  { id: 16, equipment_name: "Digital Caliper", brand: "Mitutoyo", model: "CD-6", status: "active", codes_count: 5, created_at: "2025-06-16" },
  { id: 17, equipment_name: "Soldering Station", brand: "Weller", model: "WE-1010", status: "inactive", codes_count: 3, created_at: "2025-06-17" },
  { id: 18, equipment_name: "Gemstone Identifier", brand: "Gemoro", model: "GS-500", status: "active", codes_count: 6, created_at: "2025-06-18" },
  { id: 19, equipment_name: "Precision Drill", brand: "Foredom", model: "SR-8", status: "active", codes_count: 4, created_at: "2025-06-19" },
  { id: 20, equipment_name: "Safety Cabinet", brand: "Godrej", model: "SC-300", status: "active", codes_count: 2, created_at: "2025-06-20" },
];

export default function EquipmentList() {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(dummyEquipments);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(true);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setEquipmentList(dummyEquipments);
      toast.success("Equipment list refreshed successfully");
      setLoading(false);
    }, 600);
  };

  // Real-time filtered data
  const filteredEquipments = useMemo(() => {
    return equipmentList.filter((item) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        item.equipment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.brand?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.model?.toLowerCase() || "").includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        (showActive && item.status === "active") ||
        (showInactive && item.status === "inactive");

      // Date range filter
      let matchesDate = true;
      if (dateFrom || dateTo) {
        const itemDate = new Date(item.created_at || "");
        if (dateFrom) {
          const fromDate = new Date(dateFrom);
          matchesDate = matchesDate && itemDate >= fromDate;
        }
        if (dateTo) {
          const toDate = new Date(dateTo);
          toDate.setHours(23, 59, 59);
          matchesDate = matchesDate && itemDate <= toDate;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [equipmentList, searchTerm, showActive, showInactive, dateFrom, dateTo]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setShowActive(true);
    setShowInactive(true);
    setDateFrom("");
    setDateTo("");
    toast.success("Filters cleared");
    setShowFilters(false);
  };

  const handleApplyFilters = () => {
    toast.success("Filters applied successfully");
    setShowFilters(false);
  };

  const renderCodes = (item: Equipment) => {
    const count = item.codes_count ?? 0;
    if (count === 0) return <span className="text-sm text-gray-500">—</span>;
    return (
      <div className="text-sm">
        <div className="font-medium">{count} code{count > 1 ? "s" : ""}</div>
      </div>
    );
  };

  return (
    <div className="bg-white">
      {/* HEADER */}
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

      {/* TABLE */}
      <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
        <table className="table-default w-full">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <th className="text-center">S.no</th>
              <th>Equipment Name</th>
              <th>Brand</th>
              <th>Model</th>
              <th className="text-center">Status</th>
              <th>Codes</th>
              <th className="text-center">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipments.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No equipment found matching your filters
                </td>
              </tr>
            )}
            {filteredEquipments.map((item, idx) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="text-center">{idx + 1}</td>
                <td className="font-medium">{item.equipment_name}</td>
                <td>{item.brand || "-"}</td>
                <td>{item.model || "-"}</td>
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{renderCodes(item)}</td>
                <td className="text-center">
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("en-GB")
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FILTER DRAWER */}
      {showFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-50"
            onClick={() => setShowFilters(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Search by Name / Brand / Model
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type to search..."
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#103BB5]"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showActive}
                        onChange={(e) => setShowActive(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span>Active</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showInactive}
                        onChange={(e) => setShowInactive(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>

                {/* Date Range */}
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Created Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm"
                    />
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleClearFilters}
                >
                  Clear
                </Button>
                <Button
                  className="flex-1 bg-[#103BB5] hover:bg-[#0f2e8a]"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}