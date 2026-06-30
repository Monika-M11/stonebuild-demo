


// "use client";

// import { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { Filter, X, RefreshCw } from "lucide-react";
// import { Toaster } from "@/components/ui/toaster";

// type Equipment = {
//   id: number;
//   material_name: string;
//   short_code?: string;
//   hsn?: string;
//   created_at?: string;
// };

// // Construction Materials Dummy Data
// const dummyMaterials = [
//   { id: 1, material_name: "Cement OPC 53 Grade", short_code: "CEM53", hsn: "25232930", created_at: "2025-06-01" },
//   { id: 2, material_name: "TMT Steel Bar 12mm", short_code: "TMT12", hsn: "72142090", created_at: "2025-06-02" },
//   { id: 3, material_name: "River Sand", short_code: "RSAND", hsn: "25059000", created_at: "2025-06-03" },
//   { id: 4, material_name: "Blue Metal 20mm", short_code: "BM20", hsn: "25171010", created_at: "2025-06-04" },
//   { id: 5, material_name: "Fly Ash Bricks", short_code: "FABRK", hsn: "68159990", created_at: "2025-06-05" },
//   { id: 6, material_name: "M-Sand", short_code: "MSAND", hsn: "25059000", created_at: "2025-06-06" },
//   { id: 7, material_name: "Concrete Blocks", short_code: "CBLK", hsn: "68101190", created_at: "2025-06-07" },
//   { id: 8, material_name: "PVC Pipe 4 Inch", short_code: "PVC4", hsn: "39172300", created_at: "2025-06-08" },
//   { id: 9, material_name: "Electrical Wire 1.5sqmm", short_code: "EW15", hsn: "85444999", created_at: "2025-06-09" },
//   { id: 10, material_name: "Wall Putty", short_code: "PUTTY", hsn: "32149090", created_at: "2025-06-10" },

//   { id: 11, material_name: "Ceramic Floor Tiles", short_code: "CTILE", hsn: "69072100", created_at: "2025-06-11" },
//   { id: 12, material_name: "Granite Slab", short_code: "GRAN", hsn: "68022390", created_at: "2025-06-12" },
//   { id: 13, material_name: "Plywood 18mm", short_code: "PLY18", hsn: "44123300", created_at: "2025-06-13" },
//   { id: 14, material_name: "Wooden Door Frame", short_code: "WDFRM", hsn: "44182000", created_at: "2025-06-14" },
//   { id: 15, material_name: "UPVC Window", short_code: "UPVCW", hsn: "39252000", created_at: "2025-06-15" },
//   { id: 16, material_name: "Ready Mix Concrete", short_code: "RMC", hsn: "38245010", created_at: "2025-06-16" },
//   { id: 17, material_name: "Binding Wire", short_code: "BWIRE", hsn: "72171010", created_at: "2025-06-17" },
//   { id: 18, material_name: "Waterproofing Chemical", short_code: "WPCHEM", hsn: "38244090", created_at: "2025-06-18" },
//   { id: 19, material_name: "Exterior Wall Paint", short_code: "EXTPNT", hsn: "32091010", created_at: "2025-06-19" },
//   { id: 20, material_name: "Interior Emulsion Paint", short_code: "INTPNT", hsn: "32091090", created_at: "2025-06-20" },

//   { id: 21, material_name: "CPVC Pipe 1 Inch", short_code: "CPVC1", hsn: "39172300", created_at: "2025-06-21" },
//   { id: 22, material_name: "Wash Basin", short_code: "WBASN", hsn: "69101000", created_at: "2025-06-22" },
//   { id: 23, material_name: "Indian Toilet Pan", short_code: "ITPAN", hsn: "69101000", created_at: "2025-06-23" },
//   { id: 24, material_name: "LED Flood Light", short_code: "LEDFL", hsn: "94054090", created_at: "2025-06-24" },
//   { id: 25, material_name: "Switch Board 8 Module", short_code: "SWB8", hsn: "85365090", created_at: "2025-06-25" },
//   { id: 26, material_name: "Roofing Sheet", short_code: "ROOF", hsn: "72104100", created_at: "2025-06-26" },
//   { id: 27, material_name: "Glass Panel 8mm", short_code: "GLASS8", hsn: "70071900", created_at: "2025-06-27" },
//   { id: 28, material_name: "Safety Helmet", short_code: "HELM", hsn: "65061010", created_at: "2025-06-28" },
//   { id: 29, material_name: "Safety Gloves", short_code: "GLOVE", hsn: "61161000", created_at: "2025-06-29" },
//   { id: 30, material_name: "Scaffolding Pipe", short_code: "SCFP", hsn: "73063090", created_at: "2025-06-30" },
// ];

// export default function MaterialList() {
//   const [equipmentList, setEquipmentList] = useState<Equipment[]>(dummyMaterials);
//   const [loading, setLoading] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);

//   // Filter States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedHsn, setSelectedHsn] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   // Custom Toast
//   const [toast, setToast] = useState<{
//     message: string;
//     type: "success" | "error";
//   } | null>(null);

//   const showToast = (message: string, type: "success" | "error" = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 2500);
//   };

//   const handleRefresh = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setEquipmentList(dummyMaterials);
//       showToast("Materials refreshed successfully");
//       setLoading(false);
//     }, 600);
//   };

//   // Real Filter Logic
//   const filteredEquipment = useMemo(() => {
//     return equipmentList.filter((item) => {
//       const matchesSearch =
//         !searchTerm ||
//         item.material_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (item.short_code && item.short_code.toLowerCase().includes(searchTerm.toLowerCase()));

//       const matchesHsn = !selectedHsn || item.hsn === selectedHsn;

//       let matchesDate = true;
//       if (dateFrom || dateTo) {
//         const itemDate = item.created_at ? new Date(item.created_at) : null;
//         if (!itemDate) return false;

//         if (dateFrom) {
//           const fromDate = new Date(dateFrom);
//           matchesDate = matchesDate && itemDate >= fromDate;
//         }
//         if (dateTo) {
//           const toDate = new Date(dateTo);
//           toDate.setHours(23, 59, 59);
//           matchesDate = matchesDate && itemDate <= toDate;
//         }
//       }

//       return matchesSearch && matchesHsn && matchesDate;
//     });
//   }, [equipmentList, searchTerm, selectedHsn, dateFrom, dateTo]);

//   const handleApplyFilters = () => {
//     showToast("Filters applied successfully");
//     setShowFilters(false);
//   };

//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setSelectedHsn("");
//     setDateFrom("");
//     setDateTo("");
//     showToast("Filters cleared");
//     setShowFilters(false);
//   };

//   return (
//     <>
//       {toast && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="bg-white p-6">
//         {/* HEADER */}
//         <div className="flex justify-end items-center gap-3 mb-6 pr-4">
//           <Button
//             onClick={handleRefresh}
//             disabled={loading}
//             className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white"
//           >
//             <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
//             {loading ? "Refreshing..." : "Refresh"}
//           </Button>

//           <Button
//             onClick={() => setShowFilters(true)}
//             className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white px-3"
//           >
//             <Filter className="h-4 w-4" />
//           </Button>
//         </div>

//         {/* TABLE */}
//         <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
//           <table className="table-default w-full">
//             <thead className="sticky top-0 z-10 bg-white">
//               <tr>
//                 <th className="text-center">S.no</th>
//                 <th>Equipment Name</th>
//                 <th>Short Code</th>
//                 <th>HSN</th>
//                 <th className="text-center">Created At</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredEquipment.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="text-center py-8 text-gray-500">
//                     No materials found matching your filters
//                   </td>
//                 </tr>
//               )}

//               {filteredEquipment.map((item, idx) => (
//                 <tr key={item.id} className="border-b hover:bg-gray-50">
//                   <td className="text-center">{idx + 1}</td>
//                   <td className="font-medium">{item.material_name}</td>
//                   <td>{item.short_code || "-"}</td>
//                   <td>{item.hsn || "-"}</td>
//                   <td className="text-center">
//                     {item.created_at ? new Date(item.created_at).toLocaleDateString("en-GB") : "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* FILTER DRAWER */}
//         {showFilters && (
//           <>
//             <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setShowFilters(false)} />
//             <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-lg font-semibold">Filters</h2>
//                   <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
//                     <X className="h-5 w-5" />
//                   </Button>
//                 </div>

//                 <div className="space-y-6">
//                   {/* Search */}
//                   <div>
//                     <label className="text-sm font-medium mb-1.5 block">Search</label>
//                     <input
//                       type="text"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       placeholder="Search by name or code..."
//                       className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#103BB5]"
//                     />
//                   </div>

//                   {/* HSN Filter */}
//                   <div>
//                     <label className="text-sm font-medium mb-2 block">HSN Code</label>
//                     <select
//                       value={selectedHsn}
//                       onChange={(e) => setSelectedHsn(e.target.value)}
//                       className="w-full border rounded-md px-3 py-2 text-sm"
//                     >
//                       <option value="">All HSN Codes</option>
//                       <option value="71081300">71081300</option>
//                       <option value="71069290">71069290</option>
//                       <option value="71131900">71131900</option>
//                       <option value="71131910">71131910</option>
//                       <option value="71162000">71162000</option>
//                     </select>
//                   </div>

//                   {/* Date Range */}
//                   <div>
//                     <label className="text-sm font-medium mb-1.5 block">Created Date Range</label>
//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <input
//                           type="date"
//                           value={dateFrom}
//                           onChange={(e) => setDateFrom(e.target.value)}
//                           className="w-full border rounded-md px-3 py-2 text-sm"
//                         />
//                       </div>
//                       <div>
//                         <input
//                           type="date"
//                           value={dateTo}
//                           onChange={(e) => setDateTo(e.target.value)}
//                           className="w-full border rounded-md px-3 py-2 text-sm"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="mt-8 flex gap-3">
//                   <Button variant="outline" className="flex-1" onClick={handleClearFilters}>
//                     Clear
//                   </Button>
//                   <Button
//                     className="flex-1 bg-[#103BB5] hover:bg-[#0f2e8a]"
//                     onClick={handleApplyFilters}
//                   >
//                     Apply Filters
//                   </Button>
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

import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, RefreshCw, Loader } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

import { postAPI } from "@/app/utils/api";

type Material = {
  id: string | number;
  material_name: string;
  short_code?: string;
  hsn?: string;
  main_unit?: string;
  created_at?: string;
};

type ApiResponse = {
  success?: boolean;
  status?: string;
  message?: string;
  data?: any;
  count?: number;
};

export default function MaterialList() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHsn, setSelectedHsn] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // ==================== FETCH MATERIALS ====================
  const fetchMaterials = useCallback(async (page: number, append: boolean = false) => {
    if (append) setLoadingMore(true);
    else setLoading(true);

    try {
      const payload = {
        data: {
          limit: limit,
          page_no: page,
        },
      };

      const response = await postAPI("MATERIAL_LIST", payload, true);

      let newData: Material[] = [];

      if (Array.isArray(response.data)) {
        newData = response.data;
      } else if (Array.isArray(response.data?.data)) {
        newData = response.data.data;
      }

      if (append) {
        setMaterials(prev => [...prev, ...newData]);
      } else {
        setMaterials(newData);
      }

      setCurrentPage(page);
      setHasMore(newData.length === limit);

    } catch (error: any) {
      console.error(error);
      showToast("Failed to fetch materials", "error");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [limit]);

  // Initial Load
  useEffect(() => {
    fetchMaterials(1, false);
  }, [fetchMaterials]);

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          fetchMaterials(currentPage + 1, true);
        }
      },
      { threshold: 0.5 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [currentPage, hasMore, loadingMore, fetchMaterials]);

  const handleRefresh = () => {
    setMaterials([]);
    setCurrentPage(1);
    setHasMore(true);
    fetchMaterials(1, false);
  };

  // Client-side Filtering
  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.material_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.short_code && item.short_code.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesHsn = !selectedHsn || item.hsn === selectedHsn;

      let matchesDate = true;
      if (dateFrom || dateTo) {
        const itemDate = item.created_at ? new Date(item.created_at) : null;
        if (!itemDate) return false;
        if (dateFrom) matchesDate = matchesDate && itemDate >= new Date(dateFrom);
        if (dateTo) {
          const toDate = new Date(dateTo);
          toDate.setHours(23, 59, 59);
          matchesDate = matchesDate && itemDate <= toDate;
        }
      }

      return matchesSearch && matchesHsn && matchesDate;
    });
  }, [materials, searchTerm, selectedHsn, dateFrom, dateTo]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedHsn("");
    setDateFrom("");
    setDateTo("");
    showToast("Filters cleared");
    setShowFilters(false);
  };

  const handleApplyFilters = () => {
    showToast("Filters applied");
    setShowFilters(false);
  };

  return (
    <>
      {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="bg-white p-6">
        {/* HEADER */}
        <div className="flex justify-end items-center gap-3 mb-6 pr-4">
          <Button onClick={handleRefresh} disabled={loading} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white">
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button onClick={() => setShowFilters(true)} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white">
            <Filter className="h-4 w-4" /> Filter
          </Button>
        </div>

        {/* TABLE */}
        <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
          <table className="table-default w-full">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                <th className="text-center">S.no</th>
                <th>Material Name</th>
                <th>Short Code</th>
                <th>HSN</th>
                <th>Main Unit</th>
                <th className="text-center">Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading && materials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">Loading materials...</td>
                </tr>
              ) : filteredMaterials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">No materials found</td>
                </tr>
              ) : (
                filteredMaterials.map((item, idx) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="text-center">{idx + 1}</td>
                    <td className="font-medium">{item.material_name}</td>
                    <td>{item.short_code || "-"}</td>
                    <td>{item.hsn || "-"}</td>
                    <td>{item.main_unit || "-"}</td>
                    <td className="text-center">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString("en-GB") : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Infinite Scroll Loader */}
          {loadingMore && (
            <div className="flex justify-center py-6">
              <Loader className="h-6 w-6 animate-spin text-[#103BB5]" />
            </div>
          )}

          {/* Sentinel for Infinite Scroll */}
          {hasMore && <div ref={observerTarget} className="h-10" />}
        </div>

        {/* FILTER DRAWER */}
        {showFilters && (
          /* Your existing filter drawer code remains the same */
          <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setShowFilters(false)}>
            {/* Paste your full filter drawer content here */}
          </div>
        )}
      </div>
    </>
  );
}