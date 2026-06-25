// "use client";

// import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
// import { FormField } from "@/app/utils/dynamicField";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { Toaster } from "@/components/ui/toaster";

// type FormValues = {
//   client_name: string;
//   phone: string;
//   address: string;
//   plot_size: string;
//   plot_address: string;
//   remarks: string;
// };

// export default function NewQuotation() {
//   const methods = useForm<FormValues>({
//     defaultValues: {
//       client_name: "",
//       phone: "",
//       address: "",
//       plot_size: "",
//       plot_address: "",
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
//       showToast("Quotation created successfully");
//       methods.reset();
//     } catch (err) {
//       showToast("Something went wrong", "error");
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
//             <h2 className="text-lg font-medium text-[#103BB5]">New Quotation</h2>

//             <Row label="Client Name" required>
//               <FormField
//                 type="input"
//                 name="client_name"
//                 placeholder="Enter client name"
//                 validation={{ required: "Client name is required" }}
//               />
//             </Row>

//             <Row label="Phone Number" required>
//               <FormField
//                 type="input"
//                 name="phone"
//                 placeholder="Enter 10-digit phone number"
//                 className="only-number limit-10"
//                 validation={{ required: "Phone number is required" }}
//               />
//             </Row>

//             <Row label="Address" required>
//               <FormField
//                 type="textarea"
//                 name="address"
//                 placeholder="Enter full address"
//                 validation={{ required: "Address is required" }}
//               />
//             </Row>

//             <Row label="Plot Size" required>
//               <FormField
//                 type="input"
//                 name="plot_size"
//                 placeholder="e.g. 30x40 ft"
//                 validation={{ required: "Plot size is required" }}
//               />
//             </Row>

//             <Row label="Plot Address" required>
//               <FormField
//                 type="textarea"
//                 name="plot_address"
//                 placeholder="Enter plot address"
//                 validation={{ required: "Plot address is required" }}
//               />
//             </Row>

//             <Row label="Remarks">
//               <FormField
//                 type="textarea"
//                 name="remarks"
//                 placeholder="Additional remarks or notes"
//               />
//             </Row>
//           </div>
//         </div>

//         <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
//           <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
//             Cancel
//           </Button>
//           <Button variant="default" type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Create Quotation"}
//           </Button>
//         </footer>
//       </form>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Quotation"
//         message="Are you sure you want to create this quotation?"
//       />
//     </FormProvider>
//   );
// }


"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ConfirmModal from "@/app/utils/confirmationModal";
import { Toaster } from "@/components/ui/toaster";

import { postAPI } from "@/app/utils/api";

type FormValues = {
  client_name: string;
  phone: string;
  address: string;
  plot_size: string;
  plot_address: string;
  remarks: string;
};

export default function NewQuotation() {
  const methods = useForm<FormValues>({
    defaultValues: {
      client_name: "",
      phone: "",
      address: "",
      plot_size: "",
      plot_address: "",
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

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData(data);
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    if (!formData) return;
    setLoading(true);

    try {
      const payload = {
        client_name: formData.client_name,
        phone: formData.phone,
        address: formData.address,
        plot_size: formData.plot_size,
        plot_address: formData.plot_address,
        remarks: formData.remarks || "",
      };

      const response = await postAPI("ADD_QUOTATION", payload, true); 
      if (response.status === "success") {
        showToast("Quotation created successfully");
        methods.reset();
      } else {
        showToast(response.message || "Failed to create quotation", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setFormData(null);
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
            <h2 className="text-lg font-medium text-[#103BB5]">New Quotation</h2>

            <Row label="Client Name" required>
              <FormField
                type="input"
                name="client_name"
                placeholder="Enter client name"
                validation={{ required: "Client name is required" }}
              />
            </Row>

            <Row label="Phone Number" required>
              <FormField
                type="input"
                name="phone"
                placeholder="Enter 10-digit phone number"
                className="only-number limit-10"
                validation={{ required: "Phone number is required" }}
              />
            </Row>

            <Row label="Address" required>
              <FormField
                type="textarea"
                name="address"
                placeholder="Enter full address"
                validation={{ required: "Address is required" }}
              />
            </Row>

            <Row label="Plot Size" required>
              <FormField
                type="input"
                name="plot_size"
                placeholder="e.g. 30x40 ft"
                validation={{ required: "Plot size is required" }}
              />
            </Row>

            <Row label="Plot Address" required>
              <FormField
                type="textarea"
                name="plot_address"
                placeholder="Enter plot address"
                validation={{ required: "Plot address is required" }}
              />
            </Row>

            <Row label="Remarks">
              <FormField
                type="textarea"
                name="remarks"
                placeholder="Additional remarks or notes"
              />
            </Row>
          </div>
        </div>

        <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant="default" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Create Quotation"}
          </Button>
        </footer>
      </form>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        loading={loading}
        title="Confirm Quotation"
        message="Are you sure you want to create this quotation?"
      />
    </FormProvider>
  );
}