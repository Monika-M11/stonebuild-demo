// "use client";

// import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
// import { FormField } from "@/app/utils/dynamicField";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { format } from "date-fns";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { Toaster } from "@/components/ui/toaster";

// type Option = { label: string; value: string };

// type FormValues = {
//   date: string;
//   expense_category: Option | string | null;
//   bank_account: Option | string | null;
//   mode: "cash" | "upi" | "neft";
//   amount: string;
//   remarks?: string;
// };

// const dummyCategories: Option[] = [
//   { label: "Electricity Bill", value: "cat1" },
//   { label: "Rent", value: "cat2" },
//   { label: "Salary", value: "cat3" },
//   { label: "Transportation", value: "cat4" },
//   { label: "Internet", value: "cat5" },
//   { label: "Maintenance", value: "cat6" },
//   { label: "Office Supplies", value: "cat7" },
// ];

// const dummyBankAccounts: Option[] = [
//   { label: "HDFC - 501002345678", value: "bank1" },
//   { label: "SBI - 12345678901", value: "bank2" },
//   { label: "ICICI - 0987654321", value: "bank3" },
//   { label: "Axis - 9876543210", value: "bank4" },
// ];

// export default function NewExpense() {
//   const todayStr = format(new Date(), "dd/MM/yyyy");

//   const methods = useForm<FormValues>({
//     defaultValues: {
//       date: todayStr,
//       expense_category: null,
//       bank_account: null,
//       mode: "cash",
//       amount: "",
//       remarks: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [formData, setFormData] = useState<FormValues | null>(null);
//   const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

//   const showToast = (message: string, type: "success" | "error" = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 2500);
//   };

//   const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
//     setFormData(data);
//     setShowConfirm(true);
//   };

//   const confirmSubmit = async () => {
//     if (!formData) return;
//     setLoading(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 800));
//       showToast("Expense added successfully ");
//       methods.reset();
//     } catch (err) {
//       showToast("Something went wrong ", "error");
//     } finally {
//       setLoading(false);
//       setShowConfirm(false);
//       setFormData(null);
//     }
//   };

//   const handleCancel = () => {
//     methods.reset();
//     setFormData(null);
//     setShowConfirm(false);
//   };

//   const Row = ({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
//     <div className="flex items-center justify-between gap-4">
//       <label className="w-1/3 font-medium text-gray-700 text-[15px]">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <div className="w-2/3">{children}</div>
//     </div>
//   );

//   return (
//     <FormProvider {...methods}>
//       {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

//       <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="flex flex-col bg-white py-6">
//         <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
//           <div className="space-y-6">
//             <h2 className="text-lg font-medium text-[#103BB5]">New Expense</h2>

//             <Row label="Date" required>
//               <FormField type="datepicker" name="date" placeholder="Select date" />
//             </Row>

//             <Row label="Expense Category" required>
//               <FormField
//                 type="typeahead"
//                 name="expense_category"
//                 placeholder="Select category"
//                 options={dummyCategories}
//                 validation={{ required: "Expense category is required" }}
//               />
//             </Row>

//             <Row label="Bank Account" required>
//               <FormField
//                 type="typeahead"
//                 name="bank_account"
//                 placeholder="Select bank account"
//                 options={dummyBankAccounts}
//                 validation={{ required: "Bank account is required" }}
//               />
//             </Row>

//             <Row label="Payment Mode" required>
//               <div className="flex gap-6">
//                 {[
//                   { label: "Cash", value: "cash" },
//                   { label: "UPI", value: "upi" },
//                   { label: "NEFT", value: "neft" },
//                 ].map((opt) => (
//                   <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       value={opt.value}
//                       {...methods.register("mode")}
//                       className="accent-[#103BB5]"
//                     />
//                     <span>{opt.label}</span>
//                   </label>
//                 ))}
//               </div>
//             </Row>

//             <Row label="Amount" required>
//               <FormField
//                 type="input"
//                 name="amount"
//                 placeholder="Enter amount"
//                 className="numbers-decimal"
//                 validation={{ required: "Amount is required" }}
//               />
//             </Row>

//             <Row label="Remarks">
//               <FormField type="textarea" name="remarks" placeholder="Additional remarks (optional)" />
//             </Row>
//           </div>
//         </div>

//         <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
//           <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
//             Cancel
//           </Button>
//           <Button variant="default" type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Save Expense"}
//           </Button>
//         </footer>
//       </form>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Expense"
//         message="Are you sure you want to add this expense?"
//       />
//     </FormProvider>
//   );
// }

"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import ConfirmModal from "@/app/utils/confirmationModal";
import { Toaster } from "@/components/ui/toaster";

import { postAPI } from "@/app/utils/api";

type Option = { label: string; value: string };

type FormValues = {
  date: string;
  expense_category: Option | string | null;
  bank_account: Option | string | null;
  mode: "cash" | "upi" | "neft";
  amount: string;
  remarks?: string;
};


const dummyCategories: Option[] = [
  { label: "Electricity Bill", value: "cat1" },
  { label: "Rent", value: "cat2" },
  { label: "Salary", value: "cat3" },
  { label: "Transportation", value: "cat4" },
  { label: "Internet", value: "cat5" },
  { label: "Maintenance", value: "cat6" },
  { label: "Office Supplies", value: "cat7" },
];

const dummyBankAccounts: Option[] = [
  { label: "HDFC - 501002345678", value: "bank1" },
  { label: "SBI - 12345678901", value: "bank2" },
  { label: "ICICI - 0987654321", value: "bank3" },
  { label: "Axis - 9876543210", value: "bank4" },
];

export default function NewExpense() {
  const todayStr = format(new Date(), "dd/MM/yyyy");

  const methods = useForm<FormValues>({
    defaultValues: {
      date: todayStr,
      expense_category: null,
      bank_account: null,
      mode: "cash",
      amount: "",
      remarks: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const getValue = (val: Option | string | null): string => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val.value || "";
  };

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData(data);
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    if (!formData) return;
    setLoading(true);

    try {
      const payload = {
        date: formData.date,
        expense_category: getValue(formData.expense_category),
        bank_account: getValue(formData.bank_account),
        mode: formData.mode,
        amount: parseFloat(formData.amount) || 0,
        remarks: formData.remarks || "",
      };

      const response = await postAPI("ADD_EXPENSE", payload, true); // ← Add this endpoint

      if (response.status === "success") {
        showToast("Expense added successfully");
        methods.reset();
      } else {
        showToast(response.message || "Failed to add expense", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const handleCancel = () => {
    methods.reset();
    setShowConfirm(false);
  };

  const Row = ({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4">
      <label className="w-1/3 font-medium text-gray-700 text-[15px]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="w-2/3">{children}</div>
    </div>
  );

  return (
    <FormProvider {...methods}>
      {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="flex flex-col bg-white py-6">
        <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-[#103BB5]">New Expense</h2>

            <Row label="Date" required>
              <FormField type="datepicker" name="date" placeholder="Select date" />
            </Row>

            <Row label="Expense Category" required>
              <FormField
                type="typeahead"
                name="expense_category"
                placeholder="Select category"
                options={dummyCategories} // Keep your dummy options or fetch from API
                validation={{ required: "Expense category is required" }}
              />
            </Row>

            <Row label="Bank Account" required>
              <FormField
                type="typeahead"
                name="bank_account"
                placeholder="Select bank account"
                options={dummyBankAccounts}
                validation={{ required: "Bank account is required" }}
              />
            </Row>

            <Row label="Payment Mode" required>
              <div className="flex gap-6">
                {[
                  { label: "Cash", value: "cash" },
                  { label: "UPI", value: "upi" },
                  { label: "NEFT", value: "neft" },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value={opt.value}
                      {...methods.register("mode")}
                      className="accent-[#103BB5]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </Row>

            <Row label="Amount" required>
              <FormField
                type="input"
                name="amount"
                placeholder="Enter amount"
                className="numbers-decimal"
                validation={{ required: "Amount is required" }}
              />
            </Row>

            <Row label="Remarks">
              <FormField type="textarea" name="remarks" placeholder="Additional remarks (optional)" />
            </Row>
          </div>
        </div>

        <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant="default" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Save Expense"}
          </Button>
        </footer>
      </form>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        loading={loading}
        title="Confirm Expense"
        message="Are you sure you want to add this expense?"
      />
    </FormProvider>
  );
}