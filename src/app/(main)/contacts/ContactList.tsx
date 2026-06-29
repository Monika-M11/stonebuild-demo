// //  "use client";

// // import { useEffect, useState, useCallback, useRef } from "react";
// // import { postAPI } from "@/app/utils/api";
// // import { Button } from "@/components/ui/button";
// // import toast from "react-hot-toast";
// // import { usePathname, useRouter } from "next/navigation";

// // type Contact = {
// //   id: string;
// //   full_name: string;
// //   phone: string;
// //   email: string;
// //   bank_name: string;
// //   state: string | number;
// //   pincode: string | number;
// //   address: string;
// //   created_at: string;
// //   status: string | number;
// //   ifsc: string;
// // };

// // export default function ContactList() {
// //   const LIMIT = 10;

// //   const router = useRouter();
// //   const pathname = usePathname();

// //   const [contactList, setContactList] = useState<Contact[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [fetchingMore, setFetchingMore] = useState(false);
// //   const [offset, setOffset] = useState(0);
// //   const [hasMore, setHasMore] = useState(true);

// //   const observer = useRef<IntersectionObserver | null>(null);
// //   const didInitialFetchRef = useRef(false);

// //   // 🔥 FETCH CONTACTS
// //   const fetchContacts = useCallback(
// //     async (opts: { offset?: number; limit?: number; reset?: boolean } = {}) => {
// //       const off = typeof opts.offset === "number" ? opts.offset : offset;
// //       const lim = opts.limit ?? LIMIT;
// //       const resetFlag = opts.reset ?? false;

// //       try {
// //         resetFlag ? setLoading(true) : setFetchingMore(true);

// //         const res = await postAPI(
// //           "/contact-list",
// //           { data: { offset: off, limit: lim } },
// //           true
// //         );

// //         if (res?.status === "success" && res.data && Array.isArray(res.data.contacts)) {
// //           if (resetFlag) {
// //             setContactList(res.data.contacts);
// //             setOffset(off + res.data.contacts.length);
// //             setHasMore(res.data.contacts.length === lim);
// //           } else {
// //             setContactList((prev) => {
// //               const existingIds = new Set(prev.map((p) => p.id));
// //               const newItems = res.data.contacts.filter(
// //                 (r: Contact) => !existingIds.has(r.id)
// //               );

// //               const next = [...prev, ...newItems];
// //               setOffset(off + newItems.length);
// //               setHasMore(newItems.length === lim);

// //               return next;
// //             });
// //           }
// //         } else {
// //           if (resetFlag) setContactList([]);
// //           setHasMore(false);
// //         }
// //       } catch (err) {
// //         console.error(err);
// //         toast.error("Failed to fetch contacts ❌");
// //       } finally {
// //         setLoading(false);
// //         setFetchingMore(false);
// //       }
// //     },
// //     [offset]
// //   );

// //   // 🔥 INITIAL LOAD
// //   useEffect(() => {
// //     if (didInitialFetchRef.current) return;

// //     didInitialFetchRef.current = true;
// //     setOffset(0);
// //     setHasMore(true);

// //     fetchContacts({ offset: 0, limit: LIMIT, reset: true });
// //   }, []);

// //   // 🔥 INFINITE SCROLL
// //   const lastRowRef = useCallback(
// //     (node: HTMLElement | null) => {
// //       if (fetchingMore) return;

// //       if (observer.current) observer.current.disconnect();

// //       observer.current = new IntersectionObserver((entries) => {
// //         if (entries[0].isIntersecting && hasMore && !loading) {
// //           fetchContacts({ offset, limit: LIMIT });
// //         }
// //       });

// //       if (node) observer.current.observe(node);
// //     },
// //     [fetchContacts, hasMore, offset, loading, fetchingMore]
// //   );

// //   // 🔥 REFRESH
// //   const handleRefresh = () => {
// //     setOffset(0);
// //     setHasMore(true);
// //     fetchContacts({ offset: 0, limit: LIMIT, reset: true });
// //   };

// //   // 🔥 EDIT
// //   const handleEdit = (id: string) => {
// //     router.push(`${pathname}?edit-id=${id}`);
// //   };

// //   // 🔥 STATUS TOGGLE
// //   const handleStatusToggle = async (
// //     contact_id: string,
// //     currentStatus: string | number
// //   ) => {
// //     const newStatus = Number(currentStatus) === 1 ? 0 : 1;

// //     try {
// //       const res = await postAPI(
// //         "/update-contact-status",
// //         { data: { contact_id, status: newStatus } },
// //         true
// //       );

// //       if (res.status === "success") {
// //         setContactList((prev) =>
// //           prev.map((item) =>
// //             item.id === contact_id
// //               ? { ...item, status: newStatus }
// //               : item
// //           )
// //         );

// //         toast.success("Status updated ✔");
// //       } else {
// //         toast.error(res.message || "Failed ❌");
// //       }
// //     } catch (err: any) {
// //       toast.error(err.message || "Error ❌");
// //     }
// //   };

// //   return (
// //     <div className="bg-white ">
// //       {/* HEADER */}
// //       <div className="flex justify-between items-center mb-4">
// //         <Button
// //           onClick={handleRefresh}
// //           disabled={loading || fetchingMore}
// //         >
// //           {loading ? "Refreshing..." : "↻ Refresh"}
// //         </Button>
// //       </div>

// //       {/* TABLE */}
// //       <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
// //         <table className="table-default w-full">
// //           <thead className="sticky top-0 bg-white z-10">
// //             <tr>
// //               <th className="text-center">S.no</th>
// //               <th>Full Name</th>
// //               <th>Phone</th>
// //               <th>Email</th>
// //               <th>Address</th>
// //               <th className="text-center">Pincode</th>
// //               <th>State</th>
// //               <th>Status</th>
// //               <th className="text-center">Created At</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {contactList.map((item, idx) => {
// //               const isLast = idx === contactList.length - 1;

// //               return (
// //                 <tr
// //                   key={`${item.id}-${idx}`}
// //                   ref={isLast ? lastRowRef : null}
// //                   className="border-b"
// //                 >
// //                   <td className="text-center">{idx + 1}</td>

// //                   <td
// //                     className="cursor-pointer hover:text-[#103BB5]"
// //                     onClick={() => handleEdit(item.id)}
// //                   >
// //                     {item.full_name}
// //                   </td>

// //                   <td>{item.phone}</td>
// //                   <td>{item.email}</td>
// //                   <td>{item.address}</td>

// //                   <td className="text-center">{item.pincode}</td>
// //                   <td>{item.state}</td>

// //                   {/* STATUS SWITCH */}
// //                   <td className="text-center">
// //                     <button
// //                       onClick={() =>
// //                         handleStatusToggle(item.id, item.status)
// //                       }
// //                       className={`relative inline-flex h-5 w-10 items-center rounded-full transition
// //                       ${
// //                         Number(item.status) === 1
// //                           ? "bg-[#103BB5]"
// //                           : "bg-gray-300"
// //                       }`}
// //                     >
// //                       <span
// //                         className={`inline-block h-4 w-4 transform rounded-full bg-white transition
// //                         ${
// //                           Number(item.status) === 1
// //                             ? "translate-x-5"
// //                             : "translate-x-1"
// //                         }`}
// //                       />
// //                     </button>
// //                   </td>

// //                   <td className="text-center">
// //                     {new Date(item.created_at).toLocaleDateString("en-GB")}
// //                   </td>
// //                 </tr>
// //               );
// //             })}
// //           </tbody>
// //         </table>

// //         {/* LOAD MORE */}
// //         {fetchingMore && (
// //           <div className="p-3 text-center text-sm text-gray-600">
// //             Loading more...
// //           </div>
// //         )}

// //         {!hasMore && contactList.length > 0 && (
// //           <div className="p-3 text-center text-sm text-gray-600">
// //             No more contacts
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// "use client";

// import { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { useRouter, usePathname } from "next/navigation";
// import { Filter, X, RefreshCw } from "lucide-react";
// import { Toaster } from "@/components/ui/toaster";

// type Contact = {
//   id: string;
//   full_name: string;
//   phone: string;
//   email: string;
//   bank_name: string;
//   state: string;
//   pincode: string;
//   address: string;
//   created_at: string;
//   status: number;
//   ifsc: string;
// };

// const dummyContacts: Contact[] = [
//   { id: "1", full_name: "Ramesh Kumar", phone: "9876543210", email: "ramesh@email.com", bank_name: "SBI", state: "Tamil Nadu", pincode: "600001", address: "123 MG Road, Chennai", created_at: "2025-06-01", status: 1, ifsc: "SBIN0001234" },
//   { id: "2", full_name: "Priya Sharma", phone: "9123456789", email: "priya@email.com", bank_name: "HDFC", state: "Karnataka", pincode: "560001", address: "45 Brigade Road, Bangalore", created_at: "2025-06-02", status: 1, ifsc: "HDFC0005678" },
//   { id: "3", full_name: "Suresh Babu", phone: "9988776655", email: "suresh@email.com", bank_name: "ICICI", state: "Tamil Nadu", pincode: "600028", address: "78 Anna Nagar, Chennai", created_at: "2025-06-03", status: 0, ifsc: "ICIC0009876" },
//   { id: "4", full_name: "Lakshmi Narayanan", phone: "9871234567", email: "lakshmi@email.com", bank_name: "Axis Bank", state: "Tamil Nadu", pincode: "600002", address: "22 Nungambakkam", created_at: "2025-06-04", status: 1, ifsc: "AXSB0001122" },
//   { id: "5", full_name: "Vijay Kumar", phone: "9345678901", email: "vijay@email.com", bank_name: "Canara Bank", state: "Kerala", pincode: "695001", address: "Kochi Junction", created_at: "2025-06-05", status: 1, ifsc: "CNRB0003344" },
//   { id: "6", full_name: "Anitha Reddy", phone: "9178901234", email: "anitha@email.com", bank_name: "Kotak", state: "Andhra Pradesh", pincode: "500001", address: "Hyderabad", created_at: "2025-06-06", status: 0, ifsc: "KKBK0005566" },
//   { id: "7", full_name: "Manoj Patel", phone: "9823456789", email: "manoj@email.com", bank_name: "SBI", state: "Gujarat", pincode: "380001", address: "Ahmedabad", created_at: "2025-06-07", status: 1, ifsc: "SBIN0007788" },
//   { id: "8", full_name: "Geetha Menon", phone: "9898765432", email: "geetha@email.com", bank_name: "HDFC", state: "Tamil Nadu", pincode: "600015", address: "T Nagar, Chennai", created_at: "2025-06-08", status: 1, ifsc: "HDFC0009900" },
//   { id: "9", full_name: "Karthik Raj", phone: "9012345678", email: "karthik@email.com", bank_name: "ICICI", state: "Tamil Nadu", pincode: "600040", address: "Anna Nagar West", created_at: "2025-06-09", status: 1, ifsc: "ICIC0001122" },
//   { id: "10", full_name: "Divya Nair", phone: "9567890123", email: "divya@email.com", bank_name: "Federal Bank", state: "Kerala", pincode: "682001", address: "Ernakulam", created_at: "2025-06-10", status: 0, ifsc: "FDRL0003344" },
//   { id: "11", full_name: "Arjun Singh", phone: "9876540987", email: "arjun@email.com", bank_name: "Axis", state: "Maharashtra", pincode: "400001", address: "Mumbai", created_at: "2025-06-11", status: 1, ifsc: "AXSB0005566" },
//   { id: "12", full_name: "Meena Kumari", phone: "9123459876", email: "meena@email.com", bank_name: "SBI", state: "Tamil Nadu", pincode: "600033", address: "Mylapore", created_at: "2025-06-12", status: 1, ifsc: "SBIN0007788" },
//   { id: "13", full_name: "Rahul Sharma", phone: "9988771122", email: "rahul@email.com", bank_name: "HDFC", state: "Delhi", pincode: "110001", address: "Connaught Place", created_at: "2025-06-13", status: 0, ifsc: "HDFC0009900" },
//   { id: "14", full_name: "Sneha Iyer", phone: "9345678901", email: "sneha@email.com", bank_name: "Canara", state: "Tamil Nadu", pincode: "600018", address: "Adyar", created_at: "2025-06-14", status: 1, ifsc: "CNRB0001122" },
//   { id: "15", full_name: "Prakash Rao", phone: "9871234560", email: "prakash@email.com", bank_name: "Kotak", state: "Telangana", pincode: "500082", address: "Banjara Hills", created_at: "2025-06-15", status: 1, ifsc: "KKBK0003344" },
//   { id: "16", full_name: "Ramesh Kumar", phone: "9876543210", email: "ramesh@email.com", bank_name: "SBI", state: "Tamil Nadu", pincode: "600001", address: "123 MG Road, Chennai", created_at: "2025-06-01", status: 1, ifsc: "SBIN0001234" },
//   { id: "17", full_name: "Priya Sharma", phone: "9123456789", email: "priya@email.com", bank_name: "HDFC", state: "Karnataka", pincode: "560001", address: "45 Brigade Road, Bangalore", created_at: "2025-06-02", status: 1, ifsc: "HDFC0005678" },
//   { id: "18", full_name: "Suresh Babu", phone: "9988776655", email: "suresh@email.com", bank_name: "ICICI", state: "Tamil Nadu", pincode: "600028", address: "78 Anna Nagar, Chennai", created_at: "2025-06-03", status: 0, ifsc: "ICIC0009876" },
//   { id: "19", full_name: "Lakshmi Narayanan", phone: "9871234567", email: "lakshmi@email.com", bank_name: "Axis Bank", state: "Tamil Nadu", pincode: "600002", address: "22 Nungambakkam", created_at: "2025-06-04", status: 1, ifsc: "AXSB0001122" },
//   { id: "20", full_name: "Vijay Kumar", phone: "9345678901", email: "vijay@email.com", bank_name: "Canara Bank", state: "Kerala", pincode: "695001", address: "Kochi Junction", created_at: "2025-06-05", status: 1, ifsc: "CNRB0003344" },
//   { id: "21", full_name: "Anitha Reddy", phone: "9178901234", email: "anitha@email.com", bank_name: "Kotak", state: "Andhra Pradesh", pincode: "500001", address: "Hyderabad", created_at: "2025-06-06", status: 0, ifsc: "KKBK0005566" },
//   { id: "22", full_name: "Manoj Patel", phone: "9823456789", email: "manoj@email.com", bank_name: "SBI", state: "Gujarat", pincode: "380001", address: "Ahmedabad", created_at: "2025-06-07", status: 1, ifsc: "SBIN0007788" },
//   { id: "23", full_name: "Geetha Menon", phone: "9898765432", email: "geetha@email.com", bank_name: "HDFC", state: "Tamil Nadu", pincode: "600015", address: "T Nagar, Chennai", created_at: "2025-06-08", status: 1, ifsc: "HDFC0009900" },
//   { id: "24", full_name: "Karthik Raj", phone: "9012345678", email: "karthik@email.com", bank_name: "ICICI", state: "Tamil Nadu", pincode: "600040", address: "Anna Nagar West", created_at: "2025-06-09", status: 1, ifsc: "ICIC0001122" },
//   { id: "25", full_name: "Divya Nair", phone: "9567890123", email: "divya@email.com", bank_name: "Federal Bank", state: "Kerala", pincode: "682001", address: "Ernakulam", created_at: "2025-06-10", status: 0, ifsc: "FDRL0003344" },
//   { id:  "26", full_name: "Arjun Singh", phone: "9876540987", email: "arjun@email.com", bank_name: "Axis", state: "Maharashtra", pincode: "400001", address: "Mumbai", created_at: "2025-06-11", status: 1, ifsc: "AXSB0005566" },
//   { id: "27", full_name: "Meena Kumari", phone: "9123459876", email: "meena@email.com", bank_name: "SBI", state: "Tamil Nadu", pincode: "600033", address: "Mylapore", created_at: "2025-06-12", status: 1, ifsc: "SBIN0007788" },
//   { id: "28", full_name: "Rahul Sharma", phone: "9988771122", email: "rahul@email.com", bank_name: "HDFC", state: "Delhi", pincode: "110001", address: "Connaught Place", created_at: "2025-06-13", status: 0, ifsc: "HDFC0009900" },
//   { id: "29", full_name: "Sneha Iyer", phone: "9345678901", email: "sneha@email.com", bank_name: "Canara", state: "Tamil Nadu", pincode: "600018", address: "Adyar", created_at: "2025-06-14", status: 1, ifsc: "CNRB0001122" },
//   { id: "30", full_name: "Prakash Rao", phone: "9871234560", email: "prakash@email.com", bank_name: "Kotak", state: "Telangana", pincode: "500082", address: "Banjara Hills", created_at: "2025-06-15", status: 1, ifsc: "KKBK0003344" },


// ];



// export default function ContactList() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [contactList, setContactList] = useState<Contact[]>(dummyContacts);
//   const [loading, setLoading] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);

//   // Filter States
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showActive, setShowActive] = useState(true);
//   const [showInactive, setShowInactive] = useState(true);
//   const [selectedState, setSelectedState] = useState("");
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
//       setContactList(dummyContacts);
//       showToast("Refreshed successfully");
//       setLoading(false);
//     }, 600);
//   };

//   const handleEdit = (id: string) => {
//     router.push(`${pathname}?edit-id=${id}`);
//   };

//   const handleStatusToggle = (contact_id: string) => {
//     setContactList((prev) =>
//       prev.map((item) =>
//         item.id === contact_id
//           ? { ...item, status: item.status === 1 ? 0 : 1 }
//           : item
//       )
//     );
//     showToast("Status updated");
//   };

//   // Real-time Filter Logic
//   const filteredContacts = useMemo(() => {
//     return contactList.filter((item) => {
//       // Search Filter
//       const matchesSearch =
//         !searchTerm ||
//         item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.phone.includes(searchTerm) ||
//         item.email.toLowerCase().includes(searchTerm.toLowerCase());

//       // Status Filter
//       const matchesStatus =
//         (showActive && item.status === 1) || (showInactive && item.status === 0);

//       // State Filter
//       const matchesState = !selectedState || item.state === selectedState;

//       // Date Range Filter
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

//       return matchesSearch && matchesStatus && matchesState && matchesDate;
//     });
//   }, [contactList, searchTerm, showActive, showInactive, selectedState, dateFrom, dateTo]);

//   const handleClearFilters = () => {
//     setSearchTerm("");
//     setShowActive(true);
//     setShowInactive(true);
//     setSelectedState("");
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
//       {toast && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <div className="bg-white">
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
//             <thead className="sticky top-0 bg-white z-10">
//               <tr>
//                 <th className="text-center">S.no</th>
//                 <th>Full Name</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>Address</th>
//                 <th className="text-center">Pincode</th>
//                 <th>State</th>
//                 <th>Status</th>
//                 <th className="text-center">Created At</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredContacts.length === 0 && (
//                 <tr>
//                   <td colSpan={9} className="text-center py-8 text-gray-500">
//                     No contacts found matching your filters
//                   </td>
//                 </tr>
//               )}

//               {filteredContacts.map((item, idx) => (
//                 <tr key={item.id} className="border-b hover:bg-gray-50">
//                   <td className="text-center">{idx + 1}</td>
//                   <td
//                     className="cursor-pointer hover:text-[#103BB5] font-medium"
//                     onClick={() => handleEdit(item.id)}
//                   >
//                     {item.full_name}
//                   </td>
//                   <td>{item.phone}</td>
//                   <td>{item.email}</td>
//                   <td className="max-w-xs truncate">{item.address}</td>
//                   <td className="text-center">{item.pincode}</td>
//                   <td>{item.state}</td>

//                   <td className="text-center">
//                     <button
//                       onClick={() => handleStatusToggle(item.id)}
//                       className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
//                         item.status === 1 ? "bg-[#103BB5]" : "bg-gray-300"
//                       }`}
//                     >
//                       <span
//                         className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
//                           item.status === 1 ? "translate-x-5" : "translate-x-1"
//                         }`}
//                       />
//                     </button>
//                   </td>

//                   <td className="text-center">
//                     {new Date(item.created_at).toLocaleDateString("en-GB")}
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
//                     <label className="text-sm font-medium mb-1.5 block">Search by Name / Phone / Email</label>
//                     <input
//                       type="text"
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       placeholder="Type to search..."
//                       className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#103BB5]"
//                     />
//                   </div>

//                   {/* Status */}
//                   <div>
//                     <label className="text-sm font-medium mb-2 block">Status</label>
//                     <div className="space-y-2">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={showActive}
//                           onChange={(e) => setShowActive(e.target.checked)}
//                           className="w-4 h-4"
//                         />
//                         <span>Active</span>
//                       </label>
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={showInactive}
//                           onChange={(e) => setShowInactive(e.target.checked)}
//                           className="w-4 h-4"
//                         />
//                         <span>Inactive</span>
//                       </label>
//                     </div>
//                   </div>

//                   {/* State */}
//                   <div>
//                     <label className="text-sm font-medium mb-2 block">State</label>
//                     <select
//                       value={selectedState}
//                       onChange={(e) => setSelectedState(e.target.value)}
//                       className="w-full border rounded-md px-3 py-2 text-sm"
//                     >
//                       <option value="">All States</option>
//                       <option value="Tamil Nadu">Tamil Nadu</option>
//                       <option value="Karnataka">Karnataka</option>
//                       <option value="Kerala">Kerala</option>
//                       <option value="Andhra Pradesh">Andhra Pradesh</option>
//                       <option value="Gujarat">Gujarat</option>
//                       <option value="Maharashtra">Maharashtra</option>
//                       <option value="Delhi">Delhi</option>
//                       <option value="Telangana">Telangana</option>
//                     </select>
//                   </div>

//                   {/* Date Range */}
//                   <div>
//                     <label className="text-sm font-medium mb-1.5 block">Created Date Range</label>
//                     <div className="grid grid-cols-2 gap-3">
//                       <input
//                         type="date"
//                         value={dateFrom}
//                         onChange={(e) => setDateFrom(e.target.value)}
//                         className="w-full border rounded-md px-3 py-2 text-sm"
//                       />
//                       <input
//                         type="date"
//                         value={dateTo}
//                         onChange={(e) => setDateTo(e.target.value)}
//                         className="w-full border rounded-md px-3 py-2 text-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>

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






"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { Filter, X, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

import { postAPI } from "@/app/utils/api";

// Define response type based on your API
type ApiResponse = {
  success?: boolean;
  status?: string;
  message?: string;
  count?: number;
  data?: any;
  limit?: number;
  page_no?: number;
};

type Contact = {
  id: string | number;
  contact_name: string;
  phone_number: string;
  email: string;
  bank_name?: string;
  state?: string;
  pincode?: string;
  address?: string;
  created_at?: string;
  status?: number;
  ifsc?: string;
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

export default function ContactList() {
  const router = useRouter();
  const pathname = usePathname();

  const [contactList, setContactList] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [showInactive, setShowInactive] = useState(true);
  const [selectedState, setSelectedState] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  // ==================== FETCH CONTACTS ====================
 const fetchContacts = useCallback(async (page: number = 1) => {
  setLoading(true);
  try {
    const payload = {
      data: {
        limit: limit,
        page_no: page,
      },
    };

    const response: ApiResponse = await postAPI("CONTACT_LIST", payload, true);
    
    console.log("🔍 Full API Response:", response);           // ← Check this
    console.log("🔍 response.data:", response.data);

    if (response?.success || response?.status === "success") {
      // Handle different possible response structures
      let rawContacts = [];

      if (Array.isArray(response.data)) {
        rawContacts = response.data;
      } else if (Array.isArray(response.data?.data)) {
        rawContacts = response.data.data;
      } else if (response.data) {
        rawContacts = [response.data]; // fallback
      }

      console.log("🔍 Extracted Contacts:", rawContacts);   // ← Important

      const mappedData = rawContacts.map((item: any) => ({
        ...item,
        full_name: item.contact_name || item.full_name,
        phone: item.phone_number || item.phone,
      }));

      setContactList(mappedData);
     
      setCurrentPage(page);
// In fetchContacts, replace the setTotalCount + setTotalPages lines:

const count = response.count ?? rawContacts.length;
setContactList(mappedData);
setTotalCount(count);
setCurrentPage(page);
setTotalPages(Math.ceil(count / limit) || 1);
    } else {
      showToast(response?.message || "Failed to load contacts", "error");
    }
  } catch (error: any) {
    console.error("Fetch error:", error);
    showToast("Failed to fetch contacts", "error");
  } finally {
    setLoading(false);
  }
}, [limit]);

  // Initial Load
  useEffect(() => {
    fetchContacts(1);
  }, [fetchContacts]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchContacts(page);
  };

  const handleRefresh = () => fetchContacts(currentPage);

  // Status Toggle
  const handleStatusToggle = async (contact_id: string | number) => {
    try {
      const payload = { data: { contact_id } };
      const response: ApiResponse = await postAPI("UPDATE_CONTACT_STATUS", payload, true);

      if (response?.success || response?.status === "success") {
        fetchContacts(currentPage);
        showToast("Status updated successfully");
      } else {
        showToast(response?.message || "Failed to update status", "error");
      }
    } catch (error: any) {
      showToast("Failed to update status", "error");
    }
  };

  const handleEdit = (id: string | number) => {
    router.push(`${pathname}?edit-id=${id}`);
  };

  // Client-side Filtering
  const filteredContacts = useMemo(() => {
    return contactList.filter((item) => {
      const matchesSearch =
        !searchTerm ||
        item.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone_number?.includes(searchTerm) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase());

      // const matchesStatus =
      //   (showActive && item.status === 1) || (showInactive && item.status === 0);


      // Replace matchesStatus logic:
const matchesStatus =
  item.status === undefined ||   // ← show contacts with no status field
  (showActive && item.status === 1) ||
  (showInactive && item.status === 0);

      const matchesState = !selectedState || item.state === selectedState;

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

      return matchesSearch && matchesStatus && matchesState && matchesDate;
    });
  }, [contactList, searchTerm, showActive, showInactive, selectedState, dateFrom, dateTo]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setShowActive(true);
    setShowInactive(true);
    setSelectedState("");
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

      <div className="bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pr-4">
          <div className="text-sm text-gray-500">
            Showing {filteredContacts.length} of {totalCount} contacts (Page {currentPage})
          </div>
          <div className="flex gap-3">
            <Button onClick={handleRefresh} disabled={loading} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a]">
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button onClick={() => setShowFilters(true)} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a]">
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
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th className="text-center">Pincode</th>
                <th>State</th>
                <th>Status</th>
                <th className="text-center">Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-500">Loading contacts...</td>
                </tr>
              ) : filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-500">
                    No contacts found
                  </td>
                </tr>
              ) : (
                filteredContacts.map((item, idx) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="text-center">{(currentPage - 1) * limit + idx + 1}</td>
                    <td className="cursor-pointer hover:text-[#103BB5] font-medium" onClick={() => handleEdit(item.id)}>
                      {item.contact_name}
                    </td>
                    <td>{item.phone_number}</td>
                    <td>{item.email}</td>
                    <td className="max-w-xs truncate">{item.address || "—"}</td>
                    <td className="text-center">{item.pincode || "—"}</td>
                    <td>{item.state || "—"}</td>

                    <td className="text-center">
                      <button
                        onClick={() => handleStatusToggle(item.id)}
                        className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${
                          item.status === 1 ? "bg-[#103BB5]" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            item.status === 1 ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </td>

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
              <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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

              <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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

                {/* Rest of your filter drawer remains the same */}
                <div className="space-y-6">
                  {/* ... (your existing filter fields) ... */}
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