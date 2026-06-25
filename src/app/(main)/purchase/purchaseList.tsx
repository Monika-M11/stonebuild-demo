



// "use client";

// import { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { Filter, X, RefreshCw } from "lucide-react";
// import toast from "react-hot-toast";

// type Equipment = {
//   id: number;
//   equipment_name: string;
//   brand?: string;
//   model?: string;
//   status: string;
//   purchase_date?: string;
//   last_service_date?: string;
//   next_service_date?: string;
//   codes_count?: number;
//   codes?: string[];
//   created_at?: string;
// };
// const dummyEquipments: Equipment[] = [
//   { id: 1, equipment_name: "Hydraulic Excavator", brand: "Caterpillar", model: "CAT 320", status: "active", codes_count: 5, created_at: "2025-06-01" },
//   { id: 2, equipment_name: "Crawler Bulldozer", brand: "Komatsu", model: "D65EX-18", status: "active", codes_count: 3, created_at: "2025-06-02" },
//   { id: 3, equipment_name: "Backhoe Loader", brand: "JCB", model: "3CX Eco", status: "inactive", codes_count: 8, created_at: "2025-06-03" },
//   { id: 4, equipment_name: "Skid Steer Loader", brand: "Bobcat", model: "S740", status: "active", codes_count: 4, created_at: "2025-06-04" },
//   { id: 5, equipment_name: "Motor Grader", brand: "John Deere", model: "672G", status: "active", codes_count: 6, created_at: "2025-06-05" },
//   { id: 6, equipment_name: "Vibratory Soil Compactor", brand: "Hamm", model: "3411", status: "active", codes_count: 2, created_at: "2025-06-06" },
//   { id: 7, equipment_name: "Mobile Crane", brand: "Liebherr", model: "LTM 1050", status: "inactive", codes_count: 7, created_at: "2025-06-07" },
//   { id: 8, equipment_name: "Concrete Mixer Truck", brand: "Mack", model: "Granite", status: "active", codes_count: 3, created_at: "2025-06-08" },
//   { id: 9, equipment_name: "Articulated Dump Truck", brand: "Volvo", model: "A30G", status: "active", codes_count: 5, created_at: "2025-06-09" },
//   { id: 10, equipment_name: "Telescopic Handler", brand: "Manitou", model: "MT 1840", status: "active", codes_count: 4, created_at: "2025-06-10" },
//   { id: 11, equipment_name: "Asphalt Paver", brand: "Vögele", model: "Super 1800-3", status: "active", codes_count: 6, created_at: "2025-06-11" },
//   { id: 12, equipment_name: "Wheel Loader", brand: "Hitachi", model: "ZW220-6", status: "inactive", codes_count: 2, created_at: "2025-06-12" },
//   { id: 13, equipment_name: "Tower Crane", brand: "Potain", model: "MDT 219", status: "active", codes_count: 7, created_at: "2025-06-13" },
//   { id: 14, equipment_name: "Portable Air Compressor", brand: "Atlas Copco", model: "XAS 185", status: "active", codes_count: 3, created_at: "2025-06-14" },
//   { id: 15, equipment_name: "Boom Lift", brand: "JLG", model: "860SJ", status: "active", codes_count: 4, created_at: "2025-06-15" },
//   { id: 16, equipment_name: "Scissor Lift", brand: "Genie", model: "GS-1930", status: "active", codes_count: 5, created_at: "2025-06-16" },
//   { id: 17, equipment_name: "Concrete Boom Pump", brand: "Putzmeister", model: "BSF 36-4", status: "inactive", codes_count: 3, created_at: "2025-06-17" },
//   { id: 18, equipment_name: "Crawler Crane", brand: "Kobelco", model: "CK1100G", status: "active", codes_count: 6, created_at: "2025-06-18" },
//   { id: 19, equipment_name: "Pneumatic Roller", brand: "BOMAG", model: "BW 27 RH", status: "active", codes_count: 4, created_at: "2025-06-19" },
//   { id: 20, equipment_name: "Mini Excavator", brand: "Kubota", model: "KX040-4", status: "active", codes_count: 2, created_at: "2025-06-20" },
//   { id: 21, equipment_name: "Total Station", brand: "Leica", model: "FlexLine TS07", status: "active", codes_count: 9, created_at: "2025-06-21" },
//   { id: 22, equipment_name: "Demolition Hammer", brand: "Bosch", model: "GSH 16-30", status: "inactive", codes_count: 4, created_at: "2025-06-22" },
//   { id: 23, equipment_name: "Core Drilling Machine", brand: "Hilti", model: "DD 160", status: "active", codes_count: 3, created_at: "2025-06-23" },
//   { id: 24, equipment_name: "Concrete Vibrator", brand: "Wacker Neuson", model: "IEC 45", status: "active", codes_count: 11, created_at: "2025-06-24" },
//   { id: 25, equipment_name: "Rebar Tying Tool", brand: "MAX", model: "TwinTier RB441T", status: "active", codes_count: 6, created_at: "2025-06-25" },
//   { id: 26, equipment_name: "Walk-Behind Trowel", brand: "Husqvarna", model: "CT 36", status: "active", codes_count: 2, created_at: "2025-06-26" },
//   { id: 27, equipment_name: "Laser Leveler", brand: "Topcon", model: "RL-H5A", status: "inactive", codes_count: 5, created_at: "2025-06-27" },
//   { id: 28, equipment_name: "Dewatering Pump", brand: "Tsurumi", model: "LB-480", status: "active", codes_count: 8, created_at: "2025-06-28" },
//   { id: 29, equipment_name: "Industrial Generator", brand: "Cummins", model: "C50D5", status: "active", codes_count: 3, created_at: "2025-06-29" },
//   { id: 30, equipment_name: "Plate Compactor", brand: "Mikasa", model: "MVC-88", status: "active", codes_count: 7, created_at: "2025-06-30" },
// ];

// export default function PurchaseList() {   // ← Renamed component if needed
//   const [equipmentList, setEquipmentList] = useState<Equipment[]>(dummyEquipments);
//   const [loading, setLoading] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);

//   // Filter States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showActive, setShowActive] = useState(true);
//   const [showInactive, setShowInactive] = useState(true);
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const handleRefresh = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setEquipmentList(dummyEquipments);
//       toast.success("Equipment list refreshed successfully");
//       setLoading(false);
//     }, 600);
//   };

//   const filteredEquipments = useMemo(() => {
//     return equipmentList.filter((item) => {
//       const matchesSearch =
//         !searchTerm ||
//         item.equipment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (item.brand?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//         (item.model?.toLowerCase() || "").includes(searchTerm.toLowerCase());

//       const matchesStatus =
//         (showActive && item.status === "active") ||
//         (showInactive && item.status === "inactive");

//       let matchesDate = true;
//       if (dateFrom || dateTo) {
//         const itemDate = new Date(item.created_at || "");
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

//       return matchesSearch && matchesStatus && matchesDate;
//     });
//   }, [equipmentList, searchTerm, showActive, showInactive, dateFrom, dateTo]);

//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setShowActive(true);
//     setShowInactive(true);
//     setDateFrom("");
//     setDateTo("");
//     toast.success("Filters cleared");
//     setShowFilters(false);
//   };

//   const handleApplyFilters = () => {
//     toast.success("Filters applied successfully");
//     setShowFilters(false);
//   };

//   const renderCodes = (item: Equipment) => {
//     const count = item.codes_count ?? 0;
//     if (count === 0) return <span className="text-sm text-gray-500">—</span>;
//     return (
//       <div className="text-sm">
//         <div className="font-medium">{count} code{count > 1 ? "s" : ""}</div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white">
//       {/* Header */}
//       <div className="flex justify-end items-center gap-3 mb-6 pr-4">
//         <Button
//           onClick={handleRefresh}
//           disabled={loading}
//           className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white"
//         >
//           <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
//           {loading ? "Refreshing..." : "Refresh"}
//         </Button>

//         <Button
//           onClick={() => setShowFilters(true)}
//           className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white px-3"
//         >
//           <Filter className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Table */}
//       <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
//         <table className="table-default w-full">
//           <thead className="sticky top-0 bg-white z-10">
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
//             {filteredEquipments.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="text-center py-8 text-gray-500">
//                   No equipment found matching your filters
//                 </td>
//               </tr>
//             )}
//             {filteredEquipments.map((item, idx) => (
//               <tr key={item.id} className="border-b hover:bg-gray-50">
//                 <td className="text-center">{idx + 1}</td>
//                 <td className="font-medium">{item.equipment_name}</td>
//                 <td>{item.brand || "-"}</td>
//                 <td>{item.model || "-"}</td>
//                 <td className="text-center">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       item.status === "active"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//                 <td>{renderCodes(item)}</td>
//                 <td className="text-center">
//                   {item.created_at ? new Date(item.created_at).toLocaleDateString("en-GB") : "-"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Filter Drawer */}
//       {showFilters && (
//         <>
//           <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setShowFilters(false)} />
//           <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-lg font-semibold">Filters</h2>
//                 <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
//                   <X className="h-5 w-5" />
//                 </Button>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="text-sm font-medium mb-1.5 block">Search</label>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Equipment name, brand, model..."
//                     className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#103BB5]"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium mb-2 block">Status</label>
//                   <div className="space-y-2">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input type="checkbox" checked={showActive} onChange={(e) => setShowActive(e.target.checked)} className="w-4 h-4" />
//                       <span>Active</span>
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input type="checkbox" checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)} className="w-4 h-4" />
//                       <span>Inactive</span>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium mb-1.5 block">Created Date Range</label>
//                   <div className="grid grid-cols-2 gap-3">
//                     <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
//                     <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 flex gap-3">
//                 <Button variant="outline" className="flex-1" onClick={handleClearFilters}>
//                   Clear
//                 </Button>
//                 <Button className="flex-1 bg-[#103BB5] hover:bg-[#0f2e8a]" onClick={handleApplyFilters}>
//                   Apply Filters
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

//API
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import { postAPI } from "@/app/utils/api";

type Equipment = {
  id: number | string;
  equipment_name: string;
  brand?: string;
  model?: string;
  status: string;
  purchase_date?: string;
  last_service_date?: string;
  next_service_date?: string;
  codes_count?: number;
  created_at?: string;
};

export default function PurchaseList() {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(true);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // ==================== FETCH PURCHASES / EQUIPMENT ====================
  const fetchPurchases = useCallback(async () => {
    setLoading(true);
    try {
      const response = await postAPI("PURCHASE_LIST", {}, true); // Add this endpoint in api.ts

      if (response.status === "success" && Array.isArray(response.data)) {
        setEquipmentList(response.data);
        toast.success("Purchase list loaded successfully");
      } else {
        toast.error(response.message || "Failed to load purchases");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch purchase list");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  const handleRefresh = () => {
    fetchPurchases();
  };

  const filteredEquipments = useMemo(() => {
    return equipmentList.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.equipment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.brand?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.model?.toLowerCase() || "").includes(searchTerm.toLowerCase());

      const matchesStatus =
        (showActive && item.status === "active") ||
        (showInactive && item.status === "inactive");

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
      {/* Header */}
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

      {/* Table */}
      <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
        <table className="table-default w-full">
          <thead className="sticky top-0 bg-white z-10">
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
            {loading && equipmentList.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  Loading purchases...
                </td>
              </tr>
            )}

            {!loading && filteredEquipments.length === 0 && (
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
                  {item.created_at ? new Date(item.created_at).toLocaleDateString("en-GB") : "-"}
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
              <div className="flex items-center justify-between mb-6">
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
                    placeholder="Equipment name, brand, model..."
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#103BB5]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={showActive} onChange={(e) => setShowActive(e.target.checked)} className="w-4 h-4" />
                      <span>Active</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={showInactive} onChange={(e) => setShowInactive(e.target.checked)} className="w-4 h-4" />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Created Date Range</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full border rounded-md px-3 py-2 text-sm" />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={handleClearFilters}>
                  Clear
                </Button>
                <Button className="flex-1 bg-[#103BB5] hover:bg-[#0f2e8a]" onClick={handleApplyFilters}>
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