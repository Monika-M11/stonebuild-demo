//  "use client";
// import { useEffect, useState, useCallback, useRef } from "react";
// import { postRequest } from "../utils/api";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";

// type Equipment = {
//   id: number;
//   material_name: string;
//   short_code?: string;
//   hsn?: string;
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

// export default function MaterialList() {
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
//           token: "getMaterials",
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
//               <th>short_code</th>
//               <th>hsn</th>
            
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
//                   <td className="font-medium">{item.material_name}</td>
//                   <td>{item.short_code || "-"}</td>
//                   <td>{item.hsn || "-"}</td>
                 
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
import { Toaster } from "@/components/ui/toaster";

type Equipment = {
  id: number;
  material_name: string;
  short_code?: string;
  hsn?: string;
  created_at?: string;
};

// Construction Materials Dummy Data
const dummyMaterials = [
  { id: 1, material_name: "Cement OPC 53 Grade", short_code: "CEM53", hsn: "25232930", created_at: "2025-06-01" },
  { id: 2, material_name: "TMT Steel Bar 12mm", short_code: "TMT12", hsn: "72142090", created_at: "2025-06-02" },
  { id: 3, material_name: "River Sand", short_code: "RSAND", hsn: "25059000", created_at: "2025-06-03" },
  { id: 4, material_name: "Blue Metal 20mm", short_code: "BM20", hsn: "25171010", created_at: "2025-06-04" },
  { id: 5, material_name: "Fly Ash Bricks", short_code: "FABRK", hsn: "68159990", created_at: "2025-06-05" },
  { id: 6, material_name: "M-Sand", short_code: "MSAND", hsn: "25059000", created_at: "2025-06-06" },
  { id: 7, material_name: "Concrete Blocks", short_code: "CBLK", hsn: "68101190", created_at: "2025-06-07" },
  { id: 8, material_name: "PVC Pipe 4 Inch", short_code: "PVC4", hsn: "39172300", created_at: "2025-06-08" },
  { id: 9, material_name: "Electrical Wire 1.5sqmm", short_code: "EW15", hsn: "85444999", created_at: "2025-06-09" },
  { id: 10, material_name: "Wall Putty", short_code: "PUTTY", hsn: "32149090", created_at: "2025-06-10" },

  { id: 11, material_name: "Ceramic Floor Tiles", short_code: "CTILE", hsn: "69072100", created_at: "2025-06-11" },
  { id: 12, material_name: "Granite Slab", short_code: "GRAN", hsn: "68022390", created_at: "2025-06-12" },
  { id: 13, material_name: "Plywood 18mm", short_code: "PLY18", hsn: "44123300", created_at: "2025-06-13" },
  { id: 14, material_name: "Wooden Door Frame", short_code: "WDFRM", hsn: "44182000", created_at: "2025-06-14" },
  { id: 15, material_name: "UPVC Window", short_code: "UPVCW", hsn: "39252000", created_at: "2025-06-15" },
  { id: 16, material_name: "Ready Mix Concrete", short_code: "RMC", hsn: "38245010", created_at: "2025-06-16" },
  { id: 17, material_name: "Binding Wire", short_code: "BWIRE", hsn: "72171010", created_at: "2025-06-17" },
  { id: 18, material_name: "Waterproofing Chemical", short_code: "WPCHEM", hsn: "38244090", created_at: "2025-06-18" },
  { id: 19, material_name: "Exterior Wall Paint", short_code: "EXTPNT", hsn: "32091010", created_at: "2025-06-19" },
  { id: 20, material_name: "Interior Emulsion Paint", short_code: "INTPNT", hsn: "32091090", created_at: "2025-06-20" },

  { id: 21, material_name: "CPVC Pipe 1 Inch", short_code: "CPVC1", hsn: "39172300", created_at: "2025-06-21" },
  { id: 22, material_name: "Wash Basin", short_code: "WBASN", hsn: "69101000", created_at: "2025-06-22" },
  { id: 23, material_name: "Indian Toilet Pan", short_code: "ITPAN", hsn: "69101000", created_at: "2025-06-23" },
  { id: 24, material_name: "LED Flood Light", short_code: "LEDFL", hsn: "94054090", created_at: "2025-06-24" },
  { id: 25, material_name: "Switch Board 8 Module", short_code: "SWB8", hsn: "85365090", created_at: "2025-06-25" },
  { id: 26, material_name: "Roofing Sheet", short_code: "ROOF", hsn: "72104100", created_at: "2025-06-26" },
  { id: 27, material_name: "Glass Panel 8mm", short_code: "GLASS8", hsn: "70071900", created_at: "2025-06-27" },
  { id: 28, material_name: "Safety Helmet", short_code: "HELM", hsn: "65061010", created_at: "2025-06-28" },
  { id: 29, material_name: "Safety Gloves", short_code: "GLOVE", hsn: "61161000", created_at: "2025-06-29" },
  { id: 30, material_name: "Scaffolding Pipe", short_code: "SCFP", hsn: "73063090", created_at: "2025-06-30" },
];

export default function MaterialList() {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(dummyMaterials);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHsn, setSelectedHsn] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Custom Toast
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setEquipmentList(dummyMaterials);
      showToast("Materials refreshed successfully");
      setLoading(false);
    }, 600);
  };

  // Real Filter Logic
  const filteredEquipment = useMemo(() => {
    return equipmentList.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.material_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.short_code && item.short_code.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesHsn = !selectedHsn || item.hsn === selectedHsn;

      let matchesDate = true;
      if (dateFrom || dateTo) {
        const itemDate = item.created_at ? new Date(item.created_at) : null;
        if (!itemDate) return false;

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

      return matchesSearch && matchesHsn && matchesDate;
    });
  }, [equipmentList, searchTerm, selectedHsn, dateFrom, dateTo]);

  const handleApplyFilters = () => {
    showToast("Filters applied successfully");
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedHsn("");
    setDateFrom("");
    setDateTo("");
    showToast("Filters cleared");
    setShowFilters(false);
  };

  return (
    <>
      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="bg-white p-6">
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
                <th>Short Code</th>
                <th>HSN</th>
                <th className="text-center">Created At</th>
              </tr>
            </thead>

            <tbody>
              {filteredEquipment.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No materials found matching your filters
                  </td>
                </tr>
              )}

              {filteredEquipment.map((item, idx) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="text-center">{idx + 1}</td>
                  <td className="font-medium">{item.material_name}</td>
                  <td>{item.short_code || "-"}</td>
                  <td>{item.hsn || "-"}</td>
                  <td className="text-center">
                    {item.created_at ? new Date(item.created_at).toLocaleDateString("en-GB") : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FILTER DRAWER */}
        {showFilters && (
          <>
            <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setShowFilters(false)} />
            <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Search</label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search by name or code..."
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#103BB5]"
                    />
                  </div>

                  {/* HSN Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">HSN Code</label>
                    <select
                      value={selectedHsn}
                      onChange={(e) => setSelectedHsn(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 text-sm"
                    >
                      <option value="">All HSN Codes</option>
                      <option value="71081300">71081300</option>
                      <option value="71069290">71069290</option>
                      <option value="71131900">71131900</option>
                      <option value="71131910">71131910</option>
                      <option value="71162000">71162000</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Created Date Range</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          className="w-full border rounded-md px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                          className="w-full border rounded-md px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={handleClearFilters}>
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
    </>
  );
}