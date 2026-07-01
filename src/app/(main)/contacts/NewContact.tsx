// "use client";

// import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { useRouter, usePathname } from "next/navigation";
// import DynamicField from "@/components/ui/fields/dynamicField";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { Toaster } from "@/components/ui/toaster";

// type FormValues = {
//   full_name: string;
//   dob: string;
//   phone: string;
//   alternate_phone: string;
//   email: string;
//   address: string;
//   pincode: string;
//   state: string;
//   bank_account: string;
//   ifsc: string;
//   branch_name: string;
//   bank_name: string;
//   aadhaar: string;
//   pan: string;
//   registeration_id?: string;
//   gst_no?: string;
// };

// type ContactFormProps = {
//   editId: string | null;
// };

// export default function ContactForm({ editId }: ContactFormProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const todayStr = format(new Date(), "dd/MM/yyyy");

//   const methods = useForm<FormValues>({
//     defaultValues: {
//       full_name: "",
//       dob: todayStr,
//       phone: "",
//       alternate_phone: "",
//       email: "",
//       address: "",
//       pincode: "",
//       state: "",
//       bank_account: "",
//       ifsc: "",
//       branch_name: "",
//       bank_name: "",
//       aadhaar: "",
//       pan: "",
//       registeration_id: "",
//       gst_no: "",
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

//       if (editId) {
//         showToast("Contact updated successfully ", "success");
//       } else {
//         showToast("Contact added successfully ", "success");
//       }

//       methods.reset();
//       setTimeout(() => {
//         router.push(pathname);
//       }, 1200);

//     } catch (err: any) {
//       showToast("Something went wrong ", "error");
//     } finally {
//       setLoading(false);
//       setShowConfirm(false);
//     }
//   };

//   const fillFormValues = (data: any) => {
//     Object.keys(data).forEach((key) => {
//       if (key in methods.getValues()) {
//         methods.setValue(key as keyof FormValues, data[key] ?? "");
//       }
//     });
//   };

//   useEffect(() => {
//     if (!editId) return;

//     const fetchContact = async () => {
//       try {
//         // Simulate fetch
//         await new Promise(resolve => setTimeout(resolve, 600));
//         // In real app: await postAPI(...)
//         // fillFormValues(res.data);
//       } catch (err) {
//         showToast("Failed to load contact data", "error");
//       }
//     };

//     fetchContact();
//   }, [editId]);

//   const handleCancel = () => {
//     methods.reset();
//     setFormData(null);
//     setShowConfirm(false);
//     router.push(pathname);
//   };

//   const onInvalid = () => {
//     showToast("Please fill all mandatory fields ❗", "error");
//   };

//   const Row = ({
//     label,
//     required = false,
//     children,
//   }: {
//     label: string;
//     required?: boolean;
//     children: React.ReactNode;
//   }) => (
//     <div className="flex items-center justify-between gap-4">
//       <label className="w-1/3 font-medium text-gray-600 text-[14px]">
//         {label}
//         {required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <div className="w-2/3">{children}</div>
//     </div>
//   );

//   return (
//     <FormProvider {...methods}>
//       {toast && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <form className="flex flex-col bg-white py-6">
//         <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {/* LEFT COLUMN — Basic Details */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-medium text-[#103BB5] mb-2">
//                 Basic Details
//               </h3>
//               <div className="space-y-4">
//                 <Row label="Full Name" required>
//                   <DynamicField
//                     type="input"
//                     name="full_name"
//                     placeholder="Enter Full name"
//                     className="capitalize"
//                     validation={{ required: "Contact Name is required" }}
//                   />
//                 </Row>

//                 <Row label="Phone Number" required>
//                   <DynamicField
//                     type="input"
//                     name="phone"
//                     placeholder="Enter 10 Digit Phone number"
//                     className="only-number limit-10"
//                     validation={{ required: "Phone Number is required" }}
//                   />
//                 </Row>

//                 <Row label="Alternate Number">
//                   <DynamicField
//                     type="input"
//                     name="alternate_phone"
//                     placeholder="Enter Alternate number"
//                     className="only-number no-space limit-10"
//                   />
//                 </Row>

//                 <Row label="Email">
//                   <DynamicField type="input" name="email" placeholder="Enter Email" />
//                 </Row>

//                 <Row label="Address">
//                   <DynamicField type="textarea" name="address" placeholder="Enter address" />
//                 </Row>

//                 <Row label="Pincode">
//                   <DynamicField
//                     type="input"
//                     name="pincode"
//                     placeholder="Enter 6-Digit Pincode"
//                     className="only-number no-space limit-6"
//                   />
//                 </Row>

//                 <Row label="State">
//                   <DynamicField
//                     type="input"
//                     name="state"
//                     placeholder="Enter State"
//                     className="uppercase"
//                   />
//                 </Row>
//               </div>
//             </div>

//             {/* RIGHT COLUMN */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-medium text-[#103BB5] mt-6">Bank Details</h3>
//               <div className="space-y-4">
//                 <Row label="Bank Account Number">
//                   <DynamicField
//                     type="input"
//                     name="bank_account"
//                     placeholder="Enter Account number"
//                     className="only-number no-space"
//                   />
//                 </Row>
//                 <Row label="IFSC Code">
//                   <DynamicField
//                     type="input"
//                     name="ifsc"
//                     placeholder="Enter 11-Digit IFSC code"
//                     className="alphanumeric-uppercase no-space limit-11"
//                   />
//                 </Row>
//                 <Row label="Branch Name">
//                   <DynamicField
//                     type="input"
//                     name="branch_name"
//                     placeholder="Enter Branch name"
//                     className="uppercase only-alphabets"
//                   />
//                 </Row>
//                 <Row label="Bank Name">
//                   <DynamicField
//                     type="input"
//                     name="bank_name"
//                     placeholder="Enter Bank name"
//                     className="uppercase only-alphabets"
//                   />
//                 </Row>
//               </div>

//               <h3 className="text-lg font-medium text-[#103BB5] mt-6">Proof Details</h3>
//               <div className="space-y-4">
//                 <Row label="Aadhaar Number">
//                   <DynamicField
//                     type="input"
//                     name="aadhaar"
//                     placeholder="Enter 12-Digit Aadhaar number"
//                     className="only-number no-space limit-12"
//                   />
//                 </Row>
//                 <Row label="PAN Number">
//                   <DynamicField
//                     type="input"
//                     name="pan"
//                     placeholder="Enter 10-Digit PAN number"
//                     className="alphanumeric-uppercase no-space limit-10"
//                   />
//                 </Row>
//                 <Row label="Registeration ID">
//                   <DynamicField
//                     type="input"
//                     name="registeration_id"
//                     placeholder="Enter Registeration ID"
//                     className="alphanumeric-uppercase"
//                   />
//                 </Row>
//                 <Row label="GST Number">
//                   <DynamicField
//                     type="input"
//                     name="gst_no"
//                     placeholder="Enter GST Number"
//                     className="alphanumeric-uppercase"
//                   />
//                 </Row>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={handleCancel}
//             disabled={loading}
//           >
//             Cancel
//           </Button>

//           <Button
//             variant="default"
//             type="submit"
//             disabled={loading}
//             onClick={methods.handleSubmit(handleFormSubmit, onInvalid)}
//           >
//             {loading ? "Submitting..." : editId ? "Update Contact" : "Add Contact"}
//           </Button>
//         </footer>
//       </form>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Submission"
//         message={editId ? "Are you sure you want to update this contact?" : "Are you sure you want to add this contact?"}
//       />
//     </FormProvider>
//   );
// }


//API
"use client";

// import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import { useRouter, usePathname } from "next/navigation";
// import DynamicField from "@/components/ui/fields/dynamicField";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { Toaster } from "@/components/ui/toaster";

// type FormValues = {
//   full_name: string;
//   dob: string;
//   phone: string;
//   alternate_phone: string;
//   email: string;
//   address: string;
//   pincode: string;
//   state: string;
//   bank_account: string;
//   ifsc: string;
//   branch_name: string;
//   bank_name: string;
//   aadhaar: string;
//   pan: string;
//   registeration_id?: string;
//   gst_no?: string;
// };

// type ContactFormProps = {
//   editId: string | null;
// };

// export default function ContactForm({ editId }: ContactFormProps) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const todayStr = format(new Date(), "dd/MM/yyyy");

//   const methods = useForm<FormValues>({
//     defaultValues: {
//       full_name: "",
//       dob: todayStr,
//       phone: "",
//       alternate_phone: "",
//       email: "",
//       address: "",
//       pincode: "",
//       state: "",
//       bank_account: "",
//       ifsc: "",
//       branch_name: "",
//       bank_name: "",
//       aadhaar: "",
//       pan: "",
//       registeration_id: "",
//       gst_no: "",
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

//       if (editId) {
//         showToast("Contact updated successfully ", "success");
//       } else {
//         showToast("Contact added successfully ", "success");
//       }

//       methods.reset();
//       setTimeout(() => {
//         router.push(pathname);
//       }, 1200);

//     } catch (err: any) {
//       showToast("Something went wrong ", "error");
//     } finally {
//       setLoading(false);
//       setShowConfirm(false);
//     }
//   };

//   const fillFormValues = (data: any) => {
//     Object.keys(data).forEach((key) => {
//       if (key in methods.getValues()) {
//         methods.setValue(key as keyof FormValues, data[key] ?? "");
//       }
//     });
//   };

//   useEffect(() => {
//     if (!editId) return;

//     const fetchContact = async () => {
//       try {
//         // Simulate fetch
//         await new Promise(resolve => setTimeout(resolve, 600));
//         // In real app: await postAPI(...)
//         // fillFormValues(res.data);
//       } catch (err) {
//         showToast("Failed to load contact data", "error");
//       }
//     };

//     fetchContact();
//   }, [editId]);

//   const handleCancel = () => {
//     methods.reset();
//     setFormData(null);
//     setShowConfirm(false);
//     router.push(pathname);
//   };

//   const onInvalid = () => {
//     showToast("Please fill all mandatory fields ❗", "error");
//   };

//   const Row = ({
//     label,
//     required = false,
//     children,
//   }: {
//     label: string;
//     required?: boolean;
//     children: React.ReactNode;
//   }) => (
//     <div className="flex items-center justify-between gap-4">
//       <label className="w-1/3 font-medium text-gray-600 text-[14px]">
//         {label}
//         {required && <span className="text-red-500 ml-1">*</span>}
//       </label>
//       <div className="w-2/3">{children}</div>
//     </div>
//   );

//   return (
//     <FormProvider {...methods}>
//       {toast && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <form className="flex flex-col bg-white py-6">
//         <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {/* LEFT COLUMN — Basic Details */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-medium text-[#103BB5] mb-2">
//                 Basic Details
//               </h3>
//               <div className="space-y-4">
//                 <Row label="Full Name" required>
//                   <DynamicField
//                     type="input"
//                     name="full_name"
//                     placeholder="Enter Full name"
//                     className="capitalize"
//                     validation={{ required: "Contact Name is required" }}
//                   />
//                 </Row>

//                 <Row label="Phone Number" required>
//                   <DynamicField
//                     type="input"
//                     name="phone"
//                     placeholder="Enter 10 Digit Phone number"
//                     className="only-number limit-10"
//                     validation={{ required: "Phone Number is required" }}
//                   />
//                 </Row>

//                 <Row label="Alternate Number">
//                   <DynamicField
//                     type="input"
//                     name="alternate_phone"
//                     placeholder="Enter Alternate number"
//                     className="only-number no-space limit-10"
//                   />
//                 </Row>

//                 <Row label="Email">
//                   <DynamicField type="input" name="email" placeholder="Enter Email" />
//                 </Row>

//                 <Row label="Address">
//                   <DynamicField type="textarea" name="address" placeholder="Enter address" />
//                 </Row>

//                 <Row label="Pincode">
//                   <DynamicField
//                     type="input"
//                     name="pincode"
//                     placeholder="Enter 6-Digit Pincode"
//                     className="only-number no-space limit-6"
//                   />
//                 </Row>

//                 <Row label="State">
//                   <DynamicField
//                     type="input"
//                     name="state"
//                     placeholder="Enter State"
//                     className="uppercase"
//                   />
//                 </Row>
//               </div>
//             </div>

//             {/* RIGHT COLUMN */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-medium text-[#103BB5] mt-6">Bank Details</h3>
//               <div className="space-y-4">
//                 <Row label="Bank Account Number">
//                   <DynamicField
//                     type="input"
//                     name="bank_account"
//                     placeholder="Enter Account number"
//                     className="only-number no-space"
//                   />
//                 </Row>
//                 <Row label="IFSC Code">
//                   <DynamicField
//                     type="input"
//                     name="ifsc"
//                     placeholder="Enter 11-Digit IFSC code"
//                     className="alphanumeric-uppercase no-space limit-11"
//                   />
//                 </Row>
//                 <Row label="Branch Name">
//                   <DynamicField
//                     type="input"
//                     name="branch_name"
//                     placeholder="Enter Branch name"
//                     className="uppercase only-alphabets"
//                   />
//                 </Row>
//                 <Row label="Bank Name">
//                   <DynamicField
//                     type="input"
//                     name="bank_name"
//                     placeholder="Enter Bank name"
//                     className="uppercase only-alphabets"
//                   />
//                 </Row>
//               </div>

//               <h3 className="text-lg font-medium text-[#103BB5] mt-6">Proof Details</h3>
//               <div className="space-y-4">
//                 <Row label="Aadhaar Number">
//                   <DynamicField
//                     type="input"
//                     name="aadhaar"
//                     placeholder="Enter 12-Digit Aadhaar number"
//                     className="only-number no-space limit-12"
//                   />
//                 </Row>
//                 <Row label="PAN Number">
//                   <DynamicField
//                     type="input"
//                     name="pan"
//                     placeholder="Enter 10-Digit PAN number"
//                     className="alphanumeric-uppercase no-space limit-10"
//                   />
//                 </Row>
//                 <Row label="Registeration ID">
//                   <DynamicField
//                     type="input"
//                     name="registeration_id"
//                     placeholder="Enter Registeration ID"
//                     className="alphanumeric-uppercase"
//                   />
//                 </Row>
//                 <Row label="GST Number">
//                   <DynamicField
//                     type="input"
//                     name="gst_no"
//                     placeholder="Enter GST Number"
//                     className="alphanumeric-uppercase"
//                   />
//                 </Row>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={handleCancel}
//             disabled={loading}
//           >
//             Cancel
//           </Button>

//           <Button
//             variant="default"
//             type="submit"
//             disabled={loading}
//             onClick={methods.handleSubmit(handleFormSubmit, onInvalid)}
//           >
//             {loading ? "Submitting..." : editId ? "Update Contact" : "Add Contact"}
//           </Button>
//         </footer>
//       </form>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Submission"
//         message={editId ? "Are you sure you want to update this contact?" : "Are you sure you want to add this contact?"}
//       />
//     </FormProvider>
//   );
// }

"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter, usePathname } from "next/navigation";

import DynamicField from "@/components/ui/fields/dynamicField";
import ConfirmModal from "@/app/utils/confirmationModal";
import { Toaster } from "@/components/ui/toaster";

import { postAPI } from "@/app/utils/api";

type FormValues = {
  full_name: string;
  phone: string;
  email: string;
  address: string;       // → addressLine1
  city: string;          // ← add this
  pincode: string;
  bank_name: string;
  branch_name: string;
  bank_account: string;
  ifsc: string;
  gst_no: string;
  aadhaar: string;
  pan: string;
};

type ContactFormProps = {
  editId: string | null;
};

export default function ContactForm({ editId }: ContactFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const todayStr = format(new Date(), "dd/MM/yyyy");

  const methods = useForm<FormValues>({
    defaultValues: {
      full_name: "",
      // dob: todayStr,
      phone: "",
      // alternate_phone: "",
      email: "",
      address: "",
      pincode: "",
      // state: "",
      bank_account: "",
      ifsc: "",
      branch_name: "",
      bank_name: "",
      aadhaar: "",
      pan: "",
      // registeration_id: "",
      gst_no: "",
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

  // Fetch for Edit
  useEffect(() => {
    if (!editId) return;

    const fetchContact = async () => {
      setLoading(true);
      try {
       const response = await postAPI("GET_CONTACT_BY_ID", { data: { contact_id: editId } }, true)

        if (response.status === "success" && response.data) {
          const c = response.data;
          methods.reset({
            full_name: c.full_name || c.contact_name || "",
            // dob: c.dob || todayStr,
            phone: c.phone || "",
            // alternate_phone: c.alternate_phone || "",
            email: c.email || "",
            address: c.address || "",
            pincode: c.pincode || "",
            // state: c.state || "",
            bank_account: c.bank_account || "",
            ifsc: c.ifsc || "",
            branch_name: c.branch_name || "",
            bank_name: c.bank_name || "",
            aadhaar: c.aadhaar || "",
            pan: c.pan || "",
            // registeration_id: c.registeration_id || "",
            gst_no: c.gst_no || "",
          });
        } else {
          showToast(response.message || "Failed to load contact", "error");
        }
      } catch (err: any) {
        showToast(err.message || "Failed to load contact data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [editId, methods, todayStr]);

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData(data);
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    if (!formData) return;
    setLoading(true);

    try {
     const payload = {
  contactName: formData.full_name,
  phoneNumber: formData.phone,
  email: formData.email,
  addressLine1: formData.address,
  addressLine2: "",          // you can add a separate field later
  city: formData.city ?? "", // add city to FormValues if needed
  pincode: formData.pincode,
  bankName: formData.bank_name,
  branchName: formData.branch_name,
  bankAccountNumber: formData.bank_account,
  ifscCode: formData.ifsc,
  gstin: formData.gst_no,
  aadhaarNumber: formData.aadhaar,
  panNumber: formData.pan,
  ...(editId && { contact_id: editId }),
};

      const response = await postAPI("ADD_CONTACT",{ data: payload }, true);
      console.log(response)
     if (response.success === true) {
  showToast(editId ? "Contact updated successfully" : "Contact added successfully", "success");
  methods.reset();
  setTimeout(() => router.push("/contacts"), 1200);
} else {
  showToast(response.message || "Operation failed", "error");
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
    router.push("/contacts");
  };

  const onInvalid = () => {
    showToast("Please fill all mandatory fields ❗", "error");
  };

  const Row = ({ label, required = false, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4">
      <label className="w-1/3 font-medium text-gray-600 text-[14px]">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="w-2/3">{children}</div>
    </div>
  );

  return (
    <FormProvider {...methods}>
      {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <form className="flex flex-col bg-white py-6" onSubmit={methods.handleSubmit(handleFormSubmit, onInvalid)}>
        <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Basic Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-[#103BB5] mb-2">Basic Details</h3>
              <div className="space-y-4">
                <Row label="Full Name" required>
                  <DynamicField
                    type="input"
                    name="full_name"
                    placeholder="Enter Full name"
                    className="capitalize"
                    validation={{ required: "Contact Name is required" }}
                  />
                </Row>

                <Row label="Phone Number" required>
                  <DynamicField
                    type="input"
                    name="phone"
                    placeholder="Enter 10 Digit Phone number"
                    className="only-number limit-10"
                    validation={{ required: "Phone Number is required" }}
                  />
                </Row>

                <Row label="Alternate Number">
                  <DynamicField type="input" name="alternate_phone" placeholder="Enter Alternate number" className="only-number no-space limit-10" />
                </Row>

                <Row label="Email">
                  <DynamicField type="input" name="email" placeholder="Enter Email" />
                </Row>

                <Row label="Address">
                  <DynamicField type="textarea" name="address" placeholder="Enter address" />
                </Row>

                <Row label="Pincode">
                  <DynamicField type="input" name="pincode" placeholder="Enter 6-Digit Pincode" className="only-number no-space limit-6" />
                </Row>

                <Row label="State">
                  <DynamicField type="input" name="state" placeholder="Enter State" className="uppercase" />
                </Row>
              </div>
            </div>

            {/* Bank & Proof Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-[#103BB5] mt-6">Bank Details</h3>
              <div className="space-y-4">
                <Row label="Bank Account Number">
                  <DynamicField type="input" name="bank_account" placeholder="Enter Account number" className="only-number no-space" />
                </Row>
                <Row label="IFSC Code">
                  <DynamicField type="input" name="ifsc" placeholder="Enter 11-Digit IFSC code" className="alphanumeric-uppercase no-space limit-11" />
                </Row>
                <Row label="Branch Name">
                  <DynamicField type="input" name="branch_name" placeholder="Enter Branch name" className="uppercase only-alphabets" />
                </Row>
                <Row label="Bank Name">
                  <DynamicField type="input" name="bank_name" placeholder="Enter Bank name" className="uppercase only-alphabets" />
                </Row>
              </div>

              <h3 className="text-lg font-medium text-[#103BB5] mt-6">Proof Details</h3>
              <div className="space-y-4">
                <Row label="Aadhaar Number">
                  <DynamicField type="input" name="aadhaar" placeholder="Enter 12-Digit Aadhaar number" className="only-number no-space limit-12" />
                </Row>
                <Row label="PAN Number">
                  <DynamicField type="input" name="pan" placeholder="Enter 10-Digit PAN number" className="alphanumeric-uppercase no-space limit-10" />
                </Row>
                <Row label="Registration ID">
                  <DynamicField type="input" name="registeration_id" placeholder="Enter Registration ID" className="alphanumeric-uppercase" />
                </Row>
                <Row label="GST Number">
                  <DynamicField type="input" name="gst_no" placeholder="Enter GST Number" className="alphanumeric-uppercase" />
                </Row>
              </div>
            </div>
          </div>
        </div>

        <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : editId ? "Update Contact" : "Add Contact"}
          </Button>
        </footer>
      </form>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        loading={loading}
        title="Confirm Submission"
        message={editId ? "Are you sure you want to update this contact?" : "Are you sure you want to add this contact?"}
      />
    </FormProvider>
  );
}