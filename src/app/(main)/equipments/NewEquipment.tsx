// "use client";

// import { useForm, FormProvider, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
// import { FormField } from "@/app/utils/dynamicField";
// import { Button } from "@/components/ui/button";
// import { useState, useMemo } from "react";
// import { format } from "date-fns";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { Toaster } from "@/components/ui/toaster";
// import DynamicField from "@/components/ui/fields/dynamicField";

// type FormValues = {
//   equipment_name: string;
//   equipment_codes: { value: string }[];
//   brand: string;
//   model: string;
//   status: "active" | "inactive";
//   purchase_date: string;
//   last_service_date: string;
//   next_service_date: string;
// };

// export default function EquipmentForm() {
//   const todayStr = format(new Date(), "dd/MM/yyyy");

//   const methods = useForm<FormValues>({
//     defaultValues: {
//       equipment_name: "",
//       equipment_codes: [{ value: "" }],
//       brand: "",
//       model: "",
//       status: "active",
//       purchase_date: todayStr,
//       last_service_date: todayStr,
//       next_service_date: todayStr,
//     },
//   });

//   const { control, watch, reset } = methods;

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "equipment_codes",
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

//       showToast("Equipment added successfully ");

//       reset(); // Reset form to default values
//     } catch (err) {
//       showToast("Something went wrong ❌", "error");
//     } finally {
//       setLoading(false);
//       setShowConfirm(false);
//       setFormData(null);
//     }
//   };

//   const handleCancel = () => {
//     reset();
//     setFormData(null);
//     setShowConfirm(false);
//   };

//   // Watch codes for live count
//   const watchedCodes = watch("equipment_codes") || [];
//   const totalCount = useMemo(
//     () => watchedCodes.filter((c) => (c?.value || "").trim() !== "").length,
//     [watchedCodes]
//   );

// const Row = ({
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
//       {/* Custom Toast */}
//       {toast && (
//         <Toaster
//           message={toast.message}
//           type={toast.type}
//           onClose={() => setToast(null)}
//         />
//       )}

//       <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="flex flex-col bg-white py-6">
//         <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {/* LEFT COLUMN */}
//             <div className="space-y-6">
//               <h2 className="text-lg font-medium text-[#103BB5] mb-2">Equipment Details</h2>
//               <div className="space-y-4">
//                 <Row label="Equipment Name" required>
//                   <DynamicField
//                     type="input"
//                     name="equipment_name"
//                     placeholder="Enter equipment name"
//                     className="capitalize"
//                     validation={{ required: "Equipment Name is required" }}
//                   />
//                 </Row>

//                 <Row label="Brand">
//                   <FormField type="input" name="brand" placeholder="Enter brand" />
//                 </Row>

//                 <Row label="Model">
//                   <FormField type="input" name="model" placeholder="Enter model" />
//                 </Row>

//                 <Row label="Status">
//                   <div className="flex items-center gap-6">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         {...methods.register("status")}
//                         value="active"
//                         className="accent-[#103BB5]"
//                       />
//                       Active
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         {...methods.register("status")}
//                         value="inactive"
//                         className="accent-[#103BB5]"
//                       />
//                       Inactive
//                     </label>
//                   </div>
//                 </Row>

//                 <Row label="Purchase Date">
//                   <FormField type="datepicker" name="purchase_date" placeholder="Select purchase date" />
//                 </Row>

//                 <Row label="Last Service Date">
//                   <FormField type="datepicker" name="last_service_date" placeholder="Select last service date" />
//                 </Row>

//                 <Row label="Next Service Date">
//                   <FormField type="datepicker" name="next_service_date" placeholder="Select next service date" />
//                 </Row>
//               </div>
//             </div>

//             {/* RIGHT COLUMN - Codes */}
//             <div className="space-y-6">
//               <h2 className="text-lg font-medium text-[#103BB5] mt-6">Equipment Codes</h2>
//               <div className="space-y-4">
//                 {fields.map((field, idx) => (
//                   <div key={field.id} className="flex items-center gap-3">
//                     <div className="flex-1">
//                       <FormField
//                         type="input"
//                         name={`equipment_codes.${idx}.value`}
//                         placeholder={`Enter equipment code #${idx + 1}`}
//                       />
//                     </div>
//                     {fields.length > 1 && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => remove(idx)}
//                         className="h-9"
//                       >
//                         Remove
//                       </Button>
//                     )}
//                   </div>
//                 ))}

//                 <div className="flex justify-end">
//                   <Button
//                     type="button"
//                     variant="secondary"
//                     onClick={() => append({ value: "" })}
//                   >
//                     + Add Code
//                   </Button>
//                 </div>

//                 <div className="pt-2">
//                   <p className="text-sm text-gray-600">
//                     Total Count: <span className="font-semibold">{totalCount}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
//           <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
//             Cancel
//           </Button>
//           <Button variant="default" type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </footer>
//       </form>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Submission"
//         message="Are you sure you want to add this equipment?"
//       />
//     </FormProvider>
//   );
// }


// "use client";

// import { useForm, FormProvider, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
// import { FormField } from "@/app/utils/dynamicField";
// import { Button } from "@/components/ui/button";
// import { useState, useMemo } from "react";
// import { format } from "date-fns";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { Toaster } from "@/components/ui/toaster";
// import DynamicField from "@/components/ui/fields/dynamicField";

// import { postAPI } from "@/app/utils/api";

// type FormValues = {
//   equipment_name: string;
//   equipment_codes: { value: string }[];
//   brand: string;
//   model: string;
//   status: "active" | "inactive";
//   purchase_date: string;
//   last_service_date: string;
//   next_service_date: string;
// };

// export default function EquipmentForm() {
//   const todayStr = format(new Date(), "dd/MM/yyyy");

//   const methods = useForm<FormValues>({
//     defaultValues: {
//       equipment_name: "",
//       equipment_codes: [{ value: "" }],
//       brand: "",
//       model: "",
//       status: "active",
//       purchase_date: todayStr,
//       last_service_date: todayStr,
//       next_service_date: todayStr,
//     },
//   });

//   const { control, watch, reset } = methods;
//   const { fields, append, remove } = useFieldArray({ control, name: "equipment_codes" });

//   const [loading, setLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [formData, setFormData] = useState<FormValues | null>(null);
//   const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

//   const showToast = (message: string, type: "success" | "error" = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 2500);
//   };

//   const watchedCodes = watch("equipment_codes") || [];
//   const totalCount = useMemo(
//     () => watchedCodes.filter((c) => (c?.value || "").trim() !== "").length,
//     [watchedCodes]
//   );

//   const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
//     setFormData(data);
//     setShowConfirm(true);
//   };

//   const confirmSubmit = async () => {
//     if (!formData) return;
//     setLoading(true);

//     try {
//       // Transform codes array
//       const payload = {
//         equipment_name: formData.equipment_name,
//         brand: formData.brand,
//         model: formData.model,
//         status: formData.status,
//         purchase_date: formData.purchase_date,
//         last_service_date: formData.last_service_date,
//         next_service_date: formData.next_service_date,
//         equipment_codes: formData.equipment_codes
//           .filter((c) => (c.value || "").trim() !== "")
//           .map((c) => c.value.trim()),
//       };

//       const response = await postAPI("ADD_EQUIPMENT", payload, true); // ← Add this endpoint in api.ts

//       if (response.status === "success") {
//         showToast("Equipment added successfully");
//         reset();
//         setTimeout(() => {
//           window.location.href = "/equipment"; // Change to your list route
//         }, 1200);
//       } else {
//         showToast(response.message || "Failed to add equipment", "error");
//       }
//     } catch (err: any) {
//       showToast(err.message || "Something went wrong", "error");
//     } finally {
//       setLoading(false);
//       setShowConfirm(false);
//       setFormData(null);
//     }
//   };

//   const handleCancel = () => {
//     reset();
//     setShowConfirm(false);
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

//       <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="flex flex-col bg-white py-6">
//         <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {/* LEFT COLUMN */}
//             <div className="space-y-6">
//               <h2 className="text-lg font-medium text-[#103BB5] mb-2">Equipment Details</h2>
//               <div className="space-y-4">
//                 <Row label="Equipment Name" required>
//                   <DynamicField
//                     type="input"
//                     name="equipment_name"
//                     placeholder="Enter equipment name"
//                     className="capitalize"
//                     validation={{ required: "Equipment Name is required" }}
//                   />
//                 </Row>

//                 <Row label="Brand">
//                   <FormField type="input" name="brand" placeholder="Enter brand" />
//                 </Row>

//                 <Row label="Model">
//                   <FormField type="input" name="model" placeholder="Enter model" />
//                 </Row>

//                 <Row label="Status" required>
//                   <div className="flex items-center gap-6">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         {...methods.register("status")}
//                         value="active"
//                         className="accent-[#103BB5]"
//                       />
//                       Active
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         {...methods.register("status")}
//                         value="inactive"
//                         className="accent-[#103BB5]"
//                       />
//                       Inactive
//                     </label>
//                   </div>
//                 </Row>

//                 <Row label="Purchase Date">
//                   <FormField type="datepicker" name="purchase_date" placeholder="Select purchase date" />
//                 </Row>

//                 <Row label="Last Service Date">
//                   <FormField type="datepicker" name="last_service_date" placeholder="Select last service date" />
//                 </Row>

//                 <Row label="Next Service Date">
//                   <FormField type="datepicker" name="next_service_date" placeholder="Select next service date" />
//                 </Row>
//               </div>
//             </div>

//             {/* RIGHT COLUMN - Codes */}
//             <div className="space-y-6">
//               <h2 className="text-lg font-medium text-[#103BB5] mt-6">Equipment Codes</h2>
//               <div className="space-y-4">
//                 {fields.map((field, idx) => (
//                   <div key={field.id} className="flex items-center gap-3">
//                     <div className="flex-1">
//                       <FormField
//                         type="input"
//                         name={`equipment_codes.${idx}.value`}
//                         placeholder={`Enter equipment code #${idx + 1}`}
//                       />
//                     </div>
//                     {fields.length > 1 && (
//                       <Button
//                         type="button"
//                         variant="outline"
//                         onClick={() => remove(idx)}
//                         className="h-9"
//                       >
//                         Remove
//                       </Button>
//                     )}
//                   </div>
//                 ))}

//                 <div className="flex justify-end">
//                   <Button
//                     type="button"
//                     variant="secondary"
//                     onClick={() => append({ value: "" })}
//                   >
//                     + Add Code
//                   </Button>
//                 </div>

//                 <div className="pt-2">
//                   <p className="text-sm text-gray-600">
//                     Total Count: <span className="font-semibold">{totalCount}</span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
//           <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
//             Cancel
//           </Button>
//           <Button variant="default" type="submit" disabled={loading}>
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </footer>
//       </form>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Submission"
//         message="Are you sure you want to add this equipment?"
//       />
//     </FormProvider>
//   );
// }


//API
"use client";

import { useForm, FormProvider, SubmitHandler, useFieldArray } from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/app/utils/confirmationModal";
import { Toaster } from "@/components/ui/toaster";
import DynamicField from "@/components/ui/fields/dynamicField";

import { postAPI } from "@/app/utils/api";

type FormValues = {
  equipment_name: string;
  equipment_codes: { value: string }[];
  brand: string;
  model: string;
  status: "active" | "inactive";
  purchase_date: string;
  last_service_date: string;
  next_service_date: string;
};

type EquipmentFormProps = {
  editId: string | null;
};

export default function EquipmentForm({ editId }: EquipmentFormProps) {
  const router = useRouter();
  const todayStr = format(new Date(), "dd/MM/yyyy");

  const methods = useForm<FormValues>({
    defaultValues: {
      equipment_name: "",
      equipment_codes: [{ value: "" }],
      brand: "",
      model: "",
      status: "active",
      purchase_date: todayStr,
      last_service_date: todayStr,
      next_service_date: todayStr,
    },
  });

  const { control, watch, reset } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "equipment_codes" });

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const watchedCodes = watch("equipment_codes") || [];
  const totalCount = useMemo(
    () => watchedCodes.filter((c) => (c?.value || "").trim() !== "").length,
    [watchedCodes]
  );

  // ==================== FETCH FOR EDIT ====================
  useEffect(() => {
    if (!editId) return;

    const fetchEquipment = async () => {
      setLoading(true);
      try {
        const response = await postAPI("GET_EQUIPMENT_BY_ID", { data: { equipment_id: editId } }, true);

        if (response.success === true && response.data) {
          const e = response.data;
          methods.reset({
            equipment_name: e.equipment_name || "",
            brand: e.brand || "",
            model: e.model || "",
            status: e.status === "inactive" ? "inactive" : "active",
            purchase_date: e.purchase_date || todayStr,
            last_service_date: e.last_service_date || todayStr,
            next_service_date: e.next_service_date || todayStr,
            equipment_codes:
              Array.isArray(e.equipment_codes) && e.equipment_codes.length > 0
                ? e.equipment_codes.map((code: string) => ({ value: code }))
                : [{ value: "" }],
          });
        } else {
          showToast(response.message || "Failed to load equipment", "error");
        }
      } catch (err: any) {
        showToast(err.message || "Failed to load equipment data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
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
        equipment_name: formData.equipment_name,
        brand: formData.brand,
        model: formData.model,
        status: formData.status,
        purchase_date: formData.purchase_date,
        last_service_date: formData.last_service_date,
        next_service_date: formData.next_service_date,
        equipment_codes: formData.equipment_codes
          .filter((c) => (c.value || "").trim() !== "")
          .map((c) => c.value.trim()),
        ...(editId && { equipment_id: editId }),
      };

      const response = await postAPI("ADD_EQUIPMENT", { data: payload }, true);

      if (response.success === true) {
        showToast(editId ? "Equipment updated successfully" : "Equipment added successfully", "success");
        reset();
        setTimeout(() => {
          router.push("/equipment"); // Change to your list route
        }, 1200);
      } else {
        showToast(response.message || "Failed to add equipment", "error");
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
    reset();
    setShowConfirm(false);
    router.push("/equipment");
  };

  const onInvalid = () => {
    showToast("Please fill all mandatory fields ❗", "error");
  };

  const Row = ({
    label,
    required = false,
    children,
  }: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between gap-4">
      <label className="w-1/3 font-medium text-gray-600 text-[14px]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="w-2/3">{children}</div>
    </div>
  );

  return (
    <FormProvider {...methods}>
      {toast && (
        <Toaster
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <form onSubmit={methods.handleSubmit(handleFormSubmit, onInvalid)} className="flex flex-col bg-white py-6">
        <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-[#103BB5] mb-2">Equipment Details</h2>
              <div className="space-y-4">
                <Row label="Equipment Name" required>
                  <DynamicField
                    type="input"
                    name="equipment_name"
                    placeholder="Enter equipment name"
                    className="capitalize"
                    validation={{ required: "Equipment Name is required" }}
                  />
                </Row>

                <Row label="Brand">
                  <FormField type="input" name="brand" placeholder="Enter brand" />
                </Row>

                <Row label="Model">
                  <FormField type="input" name="model" placeholder="Enter model" />
                </Row>

                <Row label="Status" required>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...methods.register("status")}
                        value="active"
                        className="accent-[#103BB5]"
                      />
                      Active
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        {...methods.register("status")}
                        value="inactive"
                        className="accent-[#103BB5]"
                      />
                      Inactive
                    </label>
                  </div>
                </Row>

                <Row label="Purchase Date">
                  <FormField type="datepicker" name="purchase_date" placeholder="Select purchase date" />
                </Row>

                <Row label="Last Service Date">
                  <FormField type="datepicker" name="last_service_date" placeholder="Select last service date" />
                </Row>

                <Row label="Next Service Date">
                  <FormField type="datepicker" name="next_service_date" placeholder="Select next service date" />
                </Row>
              </div>
            </div>

            {/* RIGHT COLUMN - Codes */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-[#103BB5] mt-6">Equipment Codes</h2>
              <div className="space-y-4">
                {fields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <FormField
                        type="input"
                        name={`equipment_codes.${idx}.value`}
                        placeholder={`Enter equipment code #${idx + 1}`}
                      />
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => remove(idx)}
                        className="h-9"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => append({ value: "" })}
                  >
                    + Add Code
                  </Button>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    Total Count: <span className="font-semibold">{totalCount}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant="default" type="submit" disabled={loading}>
            {loading ? "Submitting..." : editId ? "Update Equipment" : "Submit"}
          </Button>
        </footer>
      </form>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        loading={loading}
        title="Confirm Submission"
        message={editId ? "Are you sure you want to update this equipment?" : "Are you sure you want to add this equipment?"}
      />
    </FormProvider>
  );
}