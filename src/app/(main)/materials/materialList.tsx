


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
import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { Filter, X, RefreshCw, ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { postAPI } from "@/app/utils/api";

type Material = {
  id: string | number;
  material_name: string;
  short_code?: string;
  hsn?: string;
  main_unit?: string;
  created_at?: string;
};

type ToastType = "success" | "error";

export function Toaster({
  message,
  type,
  onClose,
}: {
  message: string;
  type: ToastType;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;
  return (
    <div
      className={`fixed top-5 right-5 z-[9999] px-5 py-3 rounded-xl shadow-xl text-sm text-white transition-all duration-300 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}

export default function MaterialList() {
  const router = useRouter();
  const pathname = usePathname();

  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters - Draft (while typing in drawer)
  const [filterMaterialName, setFilterMaterialName] = useState("");
  const [filterShortCode, setFilterShortCode] = useState("");
  const [selectedHsn, setSelectedHsn] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Filters - Applied (sent to API)
  const [appliedFilters, setAppliedFilters] = useState({
    materialName: "",
    shortCode: "",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // ==================== FETCH MATERIALS ====================
  const fetchMaterials = useCallback(
    async (page: number = 1, filters = appliedFilters) => {
      setLoading(true);
      try {
        const conditions: Record<string, string> = {};
        if (filters.materialName.trim()) {
          conditions.material_name = filters.materialName.trim();
        }
        if (filters.shortCode.trim()) {
          conditions.short_code = filters.shortCode.trim();
        }

        const payload = {
          page,
          limit,
          ...(Object.keys(conditions).length > 0 && { conditions }),
        };

        const response = await postAPI("MATERIAL_LIST", payload, true);

        let rawMaterials: Material[] = [];
        if (Array.isArray(response.data)) {
          rawMaterials = response.data;
        } else if (Array.isArray(response.data?.data)) {
          rawMaterials = response.data.data;
        }

        const count = response.count ?? rawMaterials.length;

        setMaterials(rawMaterials);
        setTotalCount(count);
        setCurrentPage(page);
        setTotalPages(Math.ceil(count / limit) || 1);
      } catch (error: any) {
        console.error(error);
        showToast("Failed to fetch materials", "error");
      } finally {
        setLoading(false);
      }
    },
    [limit, appliedFilters]
  );

  // Initial Load
  useEffect(() => {
    fetchMaterials(1);
  }, [fetchMaterials]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchMaterials(page, appliedFilters);
  };

  const handleRefresh = () => {
    fetchMaterials(currentPage, appliedFilters);
  };

  // Client-side filtering (HSN + Date only)
  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      const matchesHsn = !selectedHsn || item.hsn === selectedHsn;

      let matchesDate = true;
      if (dateFrom || dateTo) {
        if (!item.created_at) return false;
        const itemDate = new Date(item.created_at);
        if (dateFrom) matchesDate = matchesDate && itemDate >= new Date(dateFrom);
        if (dateTo) {
          const toDate = new Date(dateTo);
          toDate.setHours(23, 59, 59);
          matchesDate = matchesDate && itemDate <= toDate;
        }
      }
      return matchesHsn && matchesDate;
    });
  }, [materials, selectedHsn, dateFrom, dateTo]);

  const handleClearFilters = () => {
    setFilterMaterialName("");
    setFilterShortCode("");
    setSelectedHsn("");
    setDateFrom("");
    setDateTo("");

    const cleared = { materialName: "", shortCode: "" };
    setAppliedFilters(cleared);
    fetchMaterials(1, cleared);
    showToast("Filters cleared");
    setShowFilters(false);
  };

  const handleApplyFilters = () => {
    const newFilters = {
      materialName: filterMaterialName,
      shortCode: filterShortCode,
    };
    setAppliedFilters(newFilters);
    fetchMaterials(1, newFilters);
    showToast("Filters applied");
    setShowFilters(false);
  };

  return (
    <>
      {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pr-4">
          <div className="text-sm text-gray-500">
            Showing {filteredMaterials.length} of {totalCount} materials (Page {currentPage})
          </div>
          <div className="flex gap-3">
            <Button onClick={handleRefresh} disabled={loading} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button onClick={() => setShowFilters(true)} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white">
              <Filter className="h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="max-h-[calc(100vh-280px)] overflow-y-auto border rounded-lg">
          <table className="table-default w-full">
            <thead className="sticky top-0 bg-white z-10">
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
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    Loading materials...
                  </td>
                </tr>
              ) : filteredMaterials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-500">
                    No materials found
                  </td>
                </tr>
              ) : (
                filteredMaterials.map((item, idx) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="text-center">
                      {(currentPage - 1) * limit + idx + 1}
                    </td>
                    <td className="font-medium">{item.material_name}</td>
                    <td>{item.short_code || "—"}</td>
                    <td>{item.hsn || "—"}</td>
                    <td>{item.main_unit || "—"}</td>
                    <td className="text-center">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString("en-GB") : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 px-4">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} • Total {totalCount} records
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

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
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Material Name</label>
                    <input
                      type="text"
                      value={filterMaterialName}
                      onChange={(e) => setFilterMaterialName(e.target.value)}
                      placeholder="Search by material name"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#103BB5]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Short Code</label>
                    <input
                      type="text"
                      value={filterShortCode}
                      onChange={(e) => setFilterShortCode(e.target.value)}
                      placeholder="Search by short code"
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#103BB5]"
                    />
                  </div>

                  {/* Add HSN, Date From, Date To fields here if needed */}
                  {/* ... your existing fields ... */}
                </div>

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