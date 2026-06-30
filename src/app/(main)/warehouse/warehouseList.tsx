


// "use client";

// import { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { Filter, X, RefreshCw } from "lucide-react";
// import toast from "react-hot-toast";

// type Warehouse = {
//   id: string;
//   warehouse_name: string;
//   phone: string;
//   address: string;
//   pincode: string | number;
//   state: string;
//   created_at: string;
// };


// const dummyWarehouses: Warehouse[] = [
//   {
//     id: "1",
//     warehouse_name: "Chennai Central Material Yard",
//     phone: "9876543210",
//     address: "123 MG Road, Chennai",
//     pincode: "600001",
//     state: "Tamil Nadu",
//     created_at: "2025-06-01",
//   },
//   {
//     id: "2",
//     warehouse_name: "Bangalore Heavy Machinery Hub",
//     phone: "9123456789",
//     address: "45 Brigade Road, Bangalore",
//     pincode: "560001",
//     state: "Karnataka",
//     created_at: "2025-06-02",
//   },
//   {
//     id: "3",
//     warehouse_name: "Coimbatore Concrete & Aggregate Store",
//     phone: "9988776655",
//     address: "78 RS Puram, Coimbatore",
//     pincode: "641002",
//     state: "Tamil Nadu",
//     created_at: "2025-06-03",
//   },
//   {
//     id: "4",
//     warehouse_name: "Hyderabad Structural Steel Vault",
//     phone: "9871234567",
//     address: "22 Banjara Hills, Hyderabad",
//     pincode: "500034",
//     state: "Telangana",
//     created_at: "2025-06-04",
//   },
//   {
//     id: "5",
//     warehouse_name: "Mumbai Cement Bullion Center",
//     phone: "9345678901",
//     address: "Zaveri Bazaar, Mumbai",
//     pincode: "400002",
//     state: "Maharashtra",
//     created_at: "2025-06-05",
//   },
//   {
//     id: "6",
//     warehouse_name: "Chennai Electrical & Piping Depot",
//     phone: "9178901234",
//     address: "T Nagar, Chennai",
//     pincode: "600017",
//     state: "Tamil Nadu",
//     created_at: "2025-06-06",
//   },
//   {
//     id: "7",
//     warehouse_name: "Kochi Maritime Equipment Yard",
//     phone: "9823456789",
//     address: "MG Road, Kochi",
//     pincode: "682011",
//     state: "Kerala",
//     created_at: "2025-06-07",
//   },
//   {
//     id: "8",
//     warehouse_name: "Ahmedabad Brick & Block Market",
//     phone: "9898765432",
//     address: "Manek Chowk, Ahmedabad",
//     pincode: "380001",
//     state: "Gujarat",
//     created_at: "2025-06-08",
//   },
//   {
//     id: "9",
//     warehouse_name: "Delhi NCR Scaffolding Vault",
//     phone: "9012345678",
//     address: "Karol Bagh, New Delhi",
//     pincode: "110005",
//     state: "Delhi",
//     created_at: "2025-06-09",
//   },
//   {
//     id: "10",
//     warehouse_name: "Jaipur Marble & Stone Warehouse",
//     phone: "9567890123",
//     address: "Johari Bazaar, Jaipur",
//     pincode: "302003",
//     state: "Rajasthan",
//     created_at: "2025-06-10",
//   },
//   {
//     id: "11",
//     warehouse_name: "Kolkata Rebar & TMT Hub",
//     phone: "9876540987",
//     address: "Burrabazar, Kolkata",
//     pincode: "700007",
//     state: "West Bengal",
//     created_at: "2025-06-11",
//   },
//   {
//     id: "12",
//     warehouse_name: "Pune Plumbing & HVAC Park",
//     phone: "9123459876",
//     address: "FC Road, Pune",
//     pincode: "411016",
//     state: "Maharashtra",
//     created_at: "2025-06-12",
//   },
//   {
//     id: "13",
//     warehouse_name: "Surat Precast Diamond Zone",
//     phone: "9988771122",
//     address: "Ring Road, Surat",
//     pincode: "395002",
//     state: "Gujarat",
//     created_at: "2025-06-13",
//   },
//   {
//     id: "14",
//     warehouse_name: "Lucknow Finishing Materials Warehouse",
//     phone: "9345678902",
//     address: "Hazratganj, Lucknow",
//     pincode: "226001",
//     state: "Uttar Pradesh",
//     created_at: "2025-06-14",
//   },
//   {
//     id: "15",
//     warehouse_name: "Indore Infrastructure Bullion House",
//     phone: "9871234568",
//     address: "MG Road, Indore",
//     pincode: "452001",
//     state: "Madhya Pradesh",
//     created_at: "2025-06-15",
//   },
//   {
//     id: "16",
//     warehouse_name: "Vizag Port Logistics Yard",
//     phone: "9567890124",
//     address: "Harbour Area, Visakhapatnam",
//     pincode: "530001",
//     state: "Andhra Pradesh",
//     created_at: "2025-06-16",
//   },
//   {
//     id: "17",
//     warehouse_name: "Patna Regional Tools Store",
//     phone: "9823456790",
//     address: "Boring Road, Patna",
//     pincode: "800001",
//     state: "Bihar",
//     created_at: "2025-06-17",
//   },
//   {
//     id: "18",
//     warehouse_name: "Bhubaneswar Safety Gear Vault",
//     phone: "9898765433",
//     address: "Unit 4, Bhubaneswar",
//     pincode: "751001",
//     state: "Odisha",
//     created_at: "2025-06-18",
//   },
//   {
//     id: "19",
//     warehouse_name: "Guwahati Northeast Lumber Depot",
//     phone: "9012345679",
//     address: "Fancy Bazaar, Guwahati",
//     pincode: "781001",
//     state: "Assam",
//     created_at: "2025-06-19",
//   },
//   {
//     id: "20",
//     warehouse_name: "Thiruvananthapuram Roofing Store",
//     phone: "9567890125",
//     address: "MG Road, Trivandrum",
//     pincode: "695001",
//     state: "Kerala",
//     created_at: "2025-06-20",
//   },
//   {
//     id: "21",
//     warehouse_name: "Nagpur Drywall & Gypsum Vault",
//     phone: "9876543211",
//     address: "Sitabuldi, Nagpur",
//     pincode: "440012",
//     state: "Maharashtra",
//     created_at: "2025-06-21",
//   },
//   {
//     id: "22",
//     warehouse_name: "Amritsar Earthmoving Equipment Depot",
//     phone: "9123456780",
//     address: "Hall Bazaar, Amritsar",
//     pincode: "143001",
//     state: "Punjab",
//     created_at: "2025-06-22",
//   },
//   {
//     id: "23",
//     warehouse_name: "Raipur Chhattisgarh Mining Hub",
//     phone: "9988776656",
//     address: "MG Road, Raipur",
//     pincode: "492001",
//     state: "Chhattisgarh",
//     created_at: "2025-06-23",
//   },
//   {
//     id: "24",
//     warehouse_name: "Ranchi Jharkhand Cement Store",
//     phone: "9345678910",
//     address: "Lalpur, Ranchi",
//     pincode: "834001",
//     state: "Jharkhand",
//     created_at: "2025-06-24",
//   },
//   {
//     id: "25",
//     warehouse_name: "Dehradun Valley Asphalt Warehouse",
//     phone: "9871234570",
//     address: "Rajpur Road, Dehradun",
//     pincode: "248001",
//     state: "Uttarakhand",
//     created_at: "2025-06-25",
//   },
// ];


// export default function WarehouseList() {
//   const [warehouseList, setWarehouseList] = useState<Warehouse[]>(dummyWarehouses);
//   const [loading, setLoading] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);

//   // Filter States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const handleRefresh = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setWarehouseList(dummyWarehouses);
//       toast.success("Warehouse list refreshed successfully");
//       setLoading(false);
//     }, 600);
//   };

//   const filteredWarehouses = useMemo(() => {
//     return warehouseList.filter((item) => {
//       const matchesSearch =
//         !searchTerm ||
//         item.warehouse_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.phone.includes(searchTerm) ||
//         item.address.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesState = !selectedState || item.state === selectedState;

//       let matchesDate = true;
//       if (dateFrom || dateTo) {
//         const itemDate = new Date(item.created_at);
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

//       return matchesSearch && matchesState && matchesDate;
//     });
//   }, [warehouseList, searchTerm, selectedState, dateFrom, dateTo]);

//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setSelectedState("");
//     setDateFrom("");
//     setDateTo("");
//     toast.success("Filters cleared");
//     setShowFilters(false);
//   };

//   const handleApplyFilters = () => {
//     toast.success("Filters applied successfully");
//     setShowFilters(false);
//   };

//   return (
//     <div className="bg-white">
//       {/* HEADER */}
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

//       {/* TABLE */}
//       <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
//         <table className="table-default w-full">
//           <thead className="sticky top-0 bg-white z-10">
//             <tr>
//               <th className="text-center">S.no</th>
//               <th>Warehouse Name</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th className="text-center">Pincode</th>
//               <th>State</th>
//               <th className="text-center">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredWarehouses.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="text-center py-8 text-gray-500">
//                   No warehouses found matching your filters
//                 </td>
//               </tr>
//             )}
//             {filteredWarehouses.map((item, idx) => (
//               <tr key={item.id} className="border-b hover:bg-gray-50">
//                 <td className="text-center">{idx + 1}</td>
//                 <td className="font-medium">{item.warehouse_name}</td>
//                 <td>{item.phone}</td>
//                 <td className="max-w-xs truncate">{item.address}</td>
//                 <td className="text-center">{item.pincode}</td>
//                 <td>{item.state}</td>
//                 <td className="text-center">
//                   {new Date(item.created_at).toLocaleDateString("en-GB")}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* FILTER DRAWER */}
//       {showFilters && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/60 z-50"
//             onClick={() => setShowFilters(false)}
//           />
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
//                   <label className="text-sm font-medium mb-1.5 block">
//                     Search by Name / Phone / Address
//                   </label>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Type to search..."
//                     className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#103BB5]"
//                   />
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium mb-2 block">State</label>
//                   <select
//                     value={selectedState}
//                     onChange={(e) => setSelectedState(e.target.value)}
//                     className="w-full border rounded-md px-3 py-2 text-sm"
//                   >
//                     <option value="">All States</option>
//                     <option value="Tamil Nadu">Tamil Nadu</option>
//                     <option value="Karnataka">Karnataka</option>
//                     <option value="Kerala">Kerala</option>
//                     {/* Add more states as needed */}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium mb-1.5 block">
//                     Created Date Range
//                   </label>
//                   <div className="grid grid-cols-2 gap-3">
//                     <input
//                       type="date"
//                       value={dateFrom}
//                       onChange={(e) => setDateFrom(e.target.value)}
//                       className="w-full border rounded-md px-3 py-2 text-sm"
//                     />
//                     <input
//                       type="date"
//                       value={dateTo}
//                       onChange={(e) => setDateTo(e.target.value)}
//                       className="w-full border rounded-md px-3 py-2 text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8 flex gap-3">
//                 <Button variant="outline" className="flex-1" onClick={handleClearFilters}>
//                   Clear
//                 </Button>
//                 <Button
//                   className="flex-1 bg-[#103BB5] hover:bg-[#0f2e8a]"
//                   onClick={handleApplyFilters}
//                 >
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




"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { Filter, X, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import { postAPI } from "@/app/utils/api";

type Warehouse = {
  id: string;
  warehouse_name: string;
  phone: string;
  address: string;
  pincode: string | number;
  state: string;
  created_at: string;
};

export default function WarehouseList() {
  const router = useRouter();
  const pathname = usePathname();

  const [warehouseList, setWarehouseList] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // ==================== FETCH WAREHOUSES ====================
  const fetchWarehouses = useCallback(
    async (page: number = 1, append: boolean = false) => {
      if (append) setLoadingMore(true);
      else setLoading(true);

      try {
        const payload = {
          data: {
            limit: limit,
            page_no: page,
          },
        };

        const response = await postAPI("WAREHOUSE_LIST", payload, true);

        let newData: Warehouse[] = [];

        if (Array.isArray(response.data)) {
          newData = response.data;
        } else if (Array.isArray(response.data?.data)) {
          newData = response.data.data;
        }

        if (append) {
          setWarehouseList((prev) => [...prev, ...newData]);
        } else {
          setWarehouseList(newData);
        }

        setCurrentPage(page);
        setHasMore(newData.length === limit);

        if (!append) toast.success("Warehouses loaded successfully");
      } catch (error: any) {
        console.error(error);
        toast.error(error.message || "Failed to fetch warehouses");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [limit]
  );

  // Initial Load
  useEffect(() => {
    fetchWarehouses(1, false);
  }, [fetchWarehouses]);

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    fetchWarehouses(currentPage + 1, true);
  };

  const handleRefresh = () => {
    fetchWarehouses(1, false);
  };

  const handleEdit = (id: string | number) => {
    router.push(`${pathname}?edit-id=${id}`);
  };

  const filteredWarehouses = useMemo(() => {
    return warehouseList.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.warehouse_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        item.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesState = !selectedState || item.state === selectedState;

      let matchesDate = true;
      if (dateFrom || dateTo) {
        const itemDate = new Date(item.created_at);
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

      return matchesSearch && matchesState && matchesDate;
    });
  }, [warehouseList, searchTerm, selectedState, dateFrom, dateTo]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedState("");
    setDateFrom("");
    setDateTo("");
    toast.success("Filters cleared");
    setShowFilters(false);
  };

  const handleApplyFilters = () => {
    toast.success("Filters applied successfully");
    setShowFilters(false);
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
          <thead className="sticky top-0 bg-white z-10">
            <tr>
              <th className="text-center">S.no</th>
              <th>Warehouse Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th className="text-center">Pincode</th>
              <th>State</th>
              <th className="text-center">Created At</th>
            </tr>
          </thead>
          <tbody>
            {loading && warehouseList.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  Loading warehouses...
                </td>
              </tr>
            )}

            {!loading && filteredWarehouses.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No warehouses found matching your filters
                </td>
              </tr>
            )}

            {filteredWarehouses.map((item, idx) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleEdit(item.id)}
              >
                <td className="text-center">{idx + 1}</td>
                <td className="font-medium hover:text-[#103BB5]">{item.warehouse_name}</td>
                <td>{item.phone}</td>
                <td className="max-w-xs truncate">{item.address}</td>
                <td className="text-center">{item.pincode}</td>
                <td>{item.state}</td>
                <td className="text-center">
                  {new Date(item.created_at).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LOAD MORE */}
      {hasMore && !loading && warehouseList.length > 0 && (
        <div className="flex justify-center mt-4">
          <Button variant="outline" onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      {/* FILTER DRAWER - unchanged */}
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
                  <label className="text-sm font-medium mb-1.5 block">Search by Name / Phone / Address</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Type to search..."
                    className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#103BB5]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">All States</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Maharashtra">Maharashtra</option>
                    {/* Add more as needed */}
                  </select>
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