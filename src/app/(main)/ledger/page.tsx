


// "use client";

// import { useForm, FormProvider, SubmitHandler} from "react-hook-form";
// import { FormField } from "@/app/utils/dynamicField";
// import { Button } from "@/components/ui/button";
// import { useState, useMemo } from "react";
// import toast from "react-hot-toast";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { PenIcon } from "lucide-react";

// type LedgerType = {
//   id?: string;
//   ledger_type: string;
//   ledger_name: string;
//   status: string;
// };

// export default function LedgerTypeForm() {
//   const methods = useForm<LedgerType>({
//     defaultValues: {
//       ledger_type: "",
//       ledger_name: "",
//       status: "1",
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [formData, setFormData] = useState<LedgerType | null>(null);
//   const [editId, setEditId] = useState<string | null>(null);

//   // Dummy Data
//   const [ledgerList, setLedgerList] = useState<LedgerType[]>([
//     { id: "1", ledger_type: "accounts_ledger", ledger_name: "Cash in Hand", status: "1" },
//     { id: "2", ledger_type: "accounts_ledger", ledger_name: "Bank Account", status: "1" },
//     { id: "3", ledger_type: "expense_ledger", ledger_name: "Electricity Bill", status: "1" },
//     { id: "4", ledger_type: "expense_ledger", ledger_name: "Rent Expense", status: "0" },
//     { id: "5", ledger_type: "unit_ledger", ledger_name: "Gram Unit", status: "1" },
//     { id: "6", ledger_type: "unit_ledger", ledger_name: "Tola Unit", status: "1" },
//     { id: "7", ledger_type: "contact_ledger", ledger_name: "Supplier A", status: "1" },
//     { id: "8", ledger_type: "contact_ledger", ledger_name: "Customer B", status: "0" },
//     { id: "9", ledger_type: "accounts_ledger", ledger_name: "Gold Stock", status: "1" },
//     { id: "10", ledger_type: "expense_ledger", ledger_name: "Salary Expense", status: "1" },
//     { id: "11", ledger_type: "unit_ledger", ledger_name: "Carat Unit", status: "1" },
//     { id: "12", ledger_type: "accounts_ledger", ledger_name: "Petty Cash", status: "1" },
//     { id: "13", ledger_type: "contact_ledger", ledger_name: "Vendor C", status: "0" },
//     { id: "14", ledger_type: "expense_ledger", ledger_name: "Transportation", status: "1" },
//     { id: "15", ledger_type: "unit_ledger", ledger_name: "Pound Unit", status: "1" },
//   ]);

//   const [selectedLedgerType, setSelectedLedgerType] = useState<string>("");

//   const ledgerTypeOptions = [
//     { label: "All Types", value: "" },
//     { label: "Accounts Ledger", value: "accounts_ledger" },
//     { label: "Expense Ledger", value: "expense_ledger" },
//     { label: "Unit Ledger", value: "unit_ledger" },
//     { label: "Contact Ledger", value: "contact_ledger" },
//   ];

//   // Filtered List
//   const filteredList = useMemo(() => {
//     if (!selectedLedgerType) return ledgerList;
//     return ledgerList.filter((item) => item.ledger_type === selectedLedgerType);
//   }, [ledgerList, selectedLedgerType]);

//   const handleFormSubmit: SubmitHandler<LedgerType> = (data) => {
//     setFormData(data);
//     setShowConfirm(true);
//   };

//   const confirmSubmit = async () => {
//     if (!formData) return;
//     setLoading(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 800));

//       const newItem: LedgerType = {
//         id: editId || Date.now().toString(),
//         ledger_type: formData.ledger_type,
//         ledger_name: formData.ledger_name,
//         status: formData.status,
//       };

//       if (editId) {
//         setLedgerList((prev) =>
//           prev.map((item) => (item.id === editId ? newItem : item))
//         );
//         toast.success("Ledger type updated successfully ✅");
//       } else {
//         setLedgerList((prev) => [...prev, newItem]);
//         toast.success("Ledger type added successfully ✅");
//       }

//       methods.reset({ ledger_type: "", ledger_name: "", status: "1" });
//       setEditId(null);
//     } catch (err) {
//       toast.error("Something went wrong ❌");
//     } finally {
//       setLoading(false);
//       setShowConfirm(false);
//     }
//   };

//   const handleEdit = (item: LedgerType) => {
//     methods.reset({
//       ledger_type: item.ledger_type,
//       ledger_name: item.ledger_name,
//       status: item.status,
//     });
//     setEditId(item.id || null);
//     toast.success("Editing mode activated");
//   };

//   const handleCancel = () => {
//     methods.reset({ ledger_type: "", ledger_name: "", status: "1" });
//     setEditId(null);
//   };

//   const Row = ({
//     label,
//     children,
//   }: {
//     label: string;
//     children: React.ReactNode;
//   }) => (
//     <div className="flex items-center justify-between gap-4">
//       <label className="w-1/3 font-medium text-gray-700 text-[15px]">{label}</label>
//       <div className="w-2/3">{children}</div>
//     </div>
//   );

//   return (
//     <FormProvider {...methods}>
//       <div className="bg-white">
//         <form
//           onSubmit={methods.handleSubmit(handleFormSubmit)}
//           className="flex flex-col pt-6 px-6"
//         >
//           <div className="space-y-6">
//             <Row label="Ledger Type">
//               <FormField
//                 type="typeahead"
//                 name="ledger_type"
//                 placeholder="Select ledger type"
//                 options={ledgerTypeOptions.slice(1)}
//                 validation={{ required: "Ledger type is required" }}
//               />
//             </Row>

//             <Row label="Ledger Name">
//               <FormField
//                 type="input"
//                 name="ledger_name"
//                 placeholder="Enter ledger name"
//                 validation={{ required: "Ledger name is required" }}
//               />
//             </Row>

//             <Row label="Status">
//               <div className="flex gap-6">
//                 {[
//                   { label: "Active", value: "1" },
//                   { label: "Inactive", value: "0" },
//                 ].map((opt) => (
//                   <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       value={opt.value}
//                       {...methods.register("status")}
//                       className="text-[#103BB5] focus:ring-[#103BB5]"
//                     />
//                     {opt.label}
//                   </label>
//                 ))}
//               </div>
//             </Row>

//             <div className="flex gap-3 pt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={handleCancel}
//                 disabled={loading}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={loading} variant="default">
//                 {loading ? "Saving..." : editId ? "Update Ledger" : "Add Ledger"}
//               </Button>
//             </div>
//           </div>
//         </form>

//         {/* Filter Section */}
//         <div className="mt-6 px-6 flex items-center gap-4 border-t pt-4">
//           <label className="font-medium text-gray-700">Filter by Type:</label>
//           <select
//             className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-[#103BB5]"
//             value={selectedLedgerType}
//             onChange={(e) => setSelectedLedgerType(e.target.value)}
//           >
//             {ledgerTypeOptions.map((opt) => (
//               <option key={opt.value} value={opt.value}>
//                 {opt.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Table Section */}
//         <div className="p-6">
//           <div className="max-h-[calc(100vh-420px)] overflow-y-auto border rounded-lg">
//             <table className="table-default w-full">
//               <thead className="sticky top-0 z-10 bg-white">
//                 <tr>
//                   <th className="text-center">#</th>
//                   <th className="text-left">Ledger Type</th>
//                   <th className="text-left">Ledger Name</th>
//                   <th className="text-center">Status</th>
//                   <th className="text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredList.length > 0 ? (
//                   filteredList.map((item, index) => (
//                     <tr key={item.id} className="border-t hover:bg-gray-50">
//                       <td className="text-center">{index + 1}</td>
//                       <td>
//                         {ledgerTypeOptions.find((opt) => opt.value === item.ledger_type)?.label ||
//                           item.ledger_type}
//                       </td>
//                       <td className="font-medium">{item.ledger_name}</td>
//                       <td className="text-center">
//                         {item.status === "1" ? (
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
//                             Active
//                           </span>
//                         ) : (
//                           <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
//                             Inactive
//                           </span>
//                         )}
//                       </td>
//                       <td className="text-center">
//                         <span
//                           className="cursor-pointer text-[#103BB5] hover:underline flex items-center justify-center gap-1"
//                           onClick={() => handleEdit(item)}
//                         >
//                           <PenIcon size={16} />
//                           Edit
//                         </span>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="text-center py-8 text-gray-500">
//                       No ledger types found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Confirmation Modal */}
//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Submission"
//         message={
//           editId
//             ? "Are you sure you want to update this ledger type?"
//             : "Are you sure you want to add this ledger type?"
//         }
//       />
//     </FormProvider>
//   );
// }

"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import { useState, useMemo, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "@/app/utils/confirmationModal";
import { PenIcon } from "lucide-react";

import { postAPI } from "@/app/utils/api";

type LedgerType = {
  id?: string;
  ledger_type: string;
  ledger_name: string;
  ledger_description?: string;
  status: string;
};


type ApiResponse = {
  success?: boolean;
  status?: string;
  message?: string;
  data?: any;
  count?: number;
};

export default function LedgerTypeForm() {
  const methods = useForm<LedgerType>({
    defaultValues: {
      ledger_type: "",
      ledger_name: "",
      ledger_description: "",
      status: "1",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<LedgerType | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [ledgerList, setLedgerList] = useState<LedgerType[]>([]);
  const [selectedLedgerType, setSelectedLedgerType] = useState<string>("");

  const ledgerTypeOptions = [
    { label: "All Types", value: "" },
    { label: "Accounts Ledger", value: "accounts_ledger" },
    { label: "Expense Ledger", value: "expense_ledger" },
    { label: "Unit Ledger", value: "unit_ledger" },
    { label: "Contact Ledger", value: "contact_ledger" },
  ];

// ==================== FETCH LEDGERS ====================
const fetchLedgers = useCallback(async () => {
  setLoading(true);
  try {
    const payload = {
      data: {
       
      },
    };

    const response: ApiResponse = await postAPI("LEDGER_LIST", payload, true);

    console.log("🔍 LEDGER_LIST Full Response:", response);

    let rawData: any[] = [];

    if (Array.isArray(response.data)) {
      rawData = response.data;
    } else if (Array.isArray(response.data?.data)) {
      rawData = response.data.data;
    }

    console.log("🔍 Extracted Ledgers:", rawData);

    setLedgerList(rawData);
  } catch (err: any) {
    console.error(err);
    toast.error(err.message || "Failed to fetch ledgers");
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchLedgers();
  }, [fetchLedgers]);

  // Filtered List
  const filteredList = useMemo(() => {
    if (!selectedLedgerType) return ledgerList;
    return ledgerList.filter((item) => item.ledger_type === selectedLedgerType);
  }, [ledgerList, selectedLedgerType]);

  // ==================== SUBMIT (Create / Update) ====================
  const handleFormSubmit: SubmitHandler<LedgerType> = (data) => {
    setFormData(data);
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    if (!formData) return;
    setLoading(true);

    try {
      const payload = {
        data: {
          ledgerType: formData.ledger_type,       
          ledgerName: formData.ledger_name,
          ledgerDescription: formData.ledger_description || "",
          ...(editId && { id: editId }),           
        },
      };

      const response: ApiResponse = await postAPI("NEW_LEDGER", payload, true);

      if (response?.success || response?.status === "success") {
        toast.success(editId ? "Ledger updated successfully ✅" : "Ledger created successfully ✅");
        
        await fetchLedgers();           // Refresh list
        methods.reset();                // Reset form
        setEditId(null);
      } else {
        toast.error(response?.message || "Operation failed");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const handleEdit = (item: LedgerType) => {
    methods.reset({
      ledger_type: item.ledger_type,
      ledger_name: item.ledger_name,
      ledger_description: item.ledger_description || "",
      status: item.status,
    });
    setEditId(item.id || null);
    toast.success("Editing mode activated");
  };

  const handleCancel = () => {
    methods.reset({
      ledger_type: "",
      ledger_name: "",
      ledger_description: "",
      status: "1",
    });
    setEditId(null);
  };

  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4">
      <label className="w-1/3 font-medium text-gray-700 text-[15px]">{label}</label>
      <div className="w-2/3">{children}</div>
    </div>
  );

  return (
    <FormProvider {...methods}>
      <div className="bg-white">
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="flex flex-col pt-6 px-6">
          <div className="space-y-6">
            <Row label="Ledger Type">
              <FormField
                type="typeahead"
                name="ledger_type"
                placeholder="Select ledger type"
                options={ledgerTypeOptions.slice(1)}
                validation={{ required: "Ledger type is required" }}
              />
            </Row>

            <Row label="Ledger Name">
              <FormField
                type="input"
                name="ledger_name"
                placeholder="Enter ledger name"
                validation={{ required: "Ledger name is required" }}
              />
            </Row>

            <Row label="Description">
              <FormField
                type="textarea"
                name="ledger_description"
                placeholder="Enter description (optional)"
              />
            </Row>

            <Row label="Status">
              <div className="flex gap-6">
                {[
                  { label: "Active", value: "1" },
                  { label: "Inactive", value: "0" },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value={opt.value}
                      {...methods.register("status")}
                      className="text-[#103BB5] focus:ring-[#103BB5]"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </Row>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : editId ? "Update Ledger" : "Add Ledger"}
              </Button>
            </div>
          </div>
        </form>

        {/* Filter & Table Section - unchanged */}
        <div className="mt-6 px-6 flex items-center gap-4 border-t pt-4">
          <label className="font-medium text-gray-700">Filter by Type:</label>
          <select
            className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-[#103BB5]"
            value={selectedLedgerType}
            onChange={(e) => setSelectedLedgerType(e.target.value)}
          >
            {ledgerTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="p-6">
          <div className="max-h-[calc(100vh-420px)] overflow-y-auto border rounded-lg">
            <table className="table-default w-full">
              <thead className="sticky top-0 z-10 bg-white">
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-left">Ledger Type</th>
                  <th className="text-left">Ledger Name</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && ledgerList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">Loading ledgers...</td>
                  </tr>
                ) : filteredList.length > 0 ? (
  filteredList.map((item, index) => (
    <tr key={item.id || item.id} className="border-t hover:bg-gray-50">
      <td className="text-center">{index + 1}</td>
      <td>{item.ledger_type || item.ledger_type}</td>
      <td className="font-medium">{item.ledger_name || item.ledger_name}</td>
      <td className="text-center">
        {String(item.status) === "1" ? (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">Inactive</span>
        )}
      </td>
      <td className="text-center">
        <span
          className="cursor-pointer text-[#103BB5] hover:underline flex items-center justify-center gap-1"
          onClick={() => handleEdit(item)}
        >
          <PenIcon size={16} /> Edit
        </span>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={5} className="text-center py-8 text-gray-500">No ledger types found</td>
  </tr>
)}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        loading={loading}
        title="Confirm Submission"
        message={editId ? "Update this ledger?" : "Add this new ledger?"}
      />
    </FormProvider>
  );
}