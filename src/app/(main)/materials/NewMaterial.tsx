

// "use client";

// import { useForm, FormProvider, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
// import { FormField } from "@/app/utils/dynamicField";
// import { Button } from "@/components/ui/button";
// import { useState, useMemo, useEffect } from "react";
// import { format } from "date-fns";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { Toaster } from "@/components/ui/toaster";

// type Option = { label: string; value: string };

// type AdditionalUnit = {
//   unit: Option | null | string;
//   quantity: string;
// };

// type FormValues = {
//   material_name: string;
//   short_code: string;
//   hsn: string;
//   main_unit: Option | string | null;
//   additional_units: AdditionalUnit[];
// };

// const dummyUnitOptions: Option[] = [
//   { label: "Gram", value: "1" },
//   { label: "Kilogram", value: "2" },
//   { label: "Piece", value: "3" },
//   { label: "Tola", value: "4" },
//   { label: "Carat", value: "5" },
//   { label: "Ounce", value: "6" },
// ];

// export default function MaterialForm() {
//   const methods = useForm<FormValues>({
//     defaultValues: {
//       material_name: "",
//       short_code: "",
//       hsn: "",
//       main_unit: null,
//       additional_units: [],
//     },
//     mode: "onSubmit",
//   });

//   const [unitOptions] = useState<Option[]>(dummyUnitOptions);
//   const [loading, setLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [formData, setFormData] = useState<FormValues | null>(null);
//   const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

//   const showToast = (message: string, type: "success" | "error" = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 2500);
//   };

//   const { control, watch, setValue, reset } = methods;

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "additional_units",
//   });

//   const watchedMainUnit = watch("main_unit");
//   const watchedAdditional = watch("additional_units") || [];

//   const getUnitValue = (u: Option | string | null | undefined): string | null => {
//     if (!u) return null;
//     if (typeof u === "string") return u;
//     return (u as Option).value ?? null;
//   };

//   const watchedMainUnitVal = getUnitValue(watchedMainUnit);

//   // Clear duplicate units
//   useEffect(() => {
//     if (!watchedMainUnitVal) return;

//     watchedAdditional.forEach((a: AdditionalUnit, i: number) => {
//       if (getUnitValue(a?.unit) === watchedMainUnitVal) {
//         setValue(`additional_units.${i}.unit`, null);
//       }
//     });
//   }, [watchedMainUnitVal, watchedAdditional, setValue]);

//   const getOptionsForRow = (rowIndex: number): Option[] => {
//     const exclude = new Set<string>();
//     if (watchedMainUnitVal) exclude.add(watchedMainUnitVal);

//     watchedAdditional.forEach((a: AdditionalUnit, i: number) => {
//       const v = getUnitValue(a?.unit);
//       if (v && i !== rowIndex) exclude.add(v);
//     });

//     return unitOptions.filter((u) => !exclude.has(u.value));
//   };

//   const canAddMoreUnits = () => {
//     const selected = new Set<string>();
//     if (watchedMainUnitVal) selected.add(watchedMainUnitVal);

//     watchedAdditional.forEach((a: AdditionalUnit) => {
//       const v = getUnitValue(a?.unit);
//       if (v) selected.add(v);
//     });

//     return selected.size < unitOptions.length;
//   };

//   const handleAppendUnit = () => {
//     if (!canAddMoreUnits()) return;
//     append({ unit: null, quantity: "" });
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

//       showToast("Material added successfully");

//       reset(); // Reset form after success
//     } catch (err) {
//       showToast("Something went wrongS", "error");
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

//   const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
//     <div className="flex items-center justify-between gap-4">
//       <label className="w-1/3 font-medium text-gray-700 text-[15px]">{label}</label>
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

//       <div className="flex flex-col bg-white py-6">
//         <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {/* Left Column */}
//             <div className="space-y-6">
//               <h2 className="text-lg font-medium text-[#103BB5] mb-2">Material Details</h2>
//               <div className="space-y-4">
//                 <Row label="Material Name">
//                   <FormField
//                     type="input"
//                     name="material_name"
//                     placeholder="Enter material name"
//                     validation={{ required: "Material name is required" }}
//                   />
//                 </Row>

//                 <Row label="Short Code">
//                   <FormField
//                     type="input"
//                     name="short_code"
//                     placeholder="Enter short code"
//                     className="uppercase no-space"
//                   />
//                 </Row>

//                 <Row label="HSN">
//                   <FormField
//                     type="input"
//                     name="hsn"
//                     placeholder="Enter HSN"
//                     className="only-numbers limit-10"
//                   />
//                 </Row>

//                 <Row label="Main Unit">
//                   <FormField
//                     type="typeahead"
//                     name="main_unit"
//                     placeholder="Select main unit"
//                     options={unitOptions}
//                     validation={{ required: "Main unit is required" }}
//                   />
//                 </Row>
//               </div>
//             </div>

//             {/* Right Column - Additional Units */}
//             <div className="space-y-6">
//               <h2 className="text-lg font-medium text-[#103BB5] mt-6">Additional Units</h2>
//               <div className="space-y-4">
//                 {fields.map((field, idx) => (
//                   <div key={field.id} className="flex items-center gap-3">
//                     <div className="flex-1 grid grid-cols-2 gap-3">
//                       <FormField
//                         type="typeahead"
//                         name={`additional_units.${idx}.unit`}
//                         placeholder={`Select unit #${idx + 1}`}
//                         options={getOptionsForRow(idx)}
//                       />
//                       <FormField
//                         type="input"
//                         name={`additional_units.${idx}.quantity`}
//                         placeholder="Quantity"
//                         className="numbers-decimal"
//                       />
//                     </div>
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => remove(idx)}
//                     >
//                       Remove
//                     </Button>
//                   </div>
//                 ))}

//                 <Button
//                   type="button"
//                   variant="secondary"
//                   onClick={handleAppendUnit}
//                   disabled={!canAddMoreUnits()}
//                 >
//                   + Add Unit
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
//           <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
//             Cancel
//           </Button>

//           <Button
//             variant="default"
//             type="submit"
//             onClick={methods.handleSubmit(handleFormSubmit)}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </footer>
//       </div>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Submission"
//         message="Are you sure you want to add this material?"
//       />
//     </FormProvider>
//   );
// }


//API
"use client";

// import { useForm, FormProvider, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
// import { FormField } from "@/app/utils/dynamicField";
// import { Button } from "@/components/ui/button";
// import { useState, useMemo, useEffect } from "react";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { Toaster } from "@/components/ui/toaster";

// import { postAPI } from "@/app/utils/api"; 

// type Option = { label: string; value: string };

// type AdditionalUnit = {
//   unit: Option | null | string;
//   quantity: string;
// };

// type FormValues = {
//   material_name: string;
//   short_code: string;
//   hsn: string;
//   main_unit: Option | string | null;
//   additional_units: AdditionalUnit[];
// };

// const dummyUnitOptions: Option[] = [
//   { label: "Gram", value: "1" },
//   { label: "Kilogram", value: "2" },
//   { label: "Piece", value: "3" },
//   { label: "Tola", value: "4" },
//   { label: "Carat", value: "5" },
//   { label: "Ounce", value: "6" },
// ];

// export default function MaterialForm() {
//   const methods = useForm<FormValues>({
//     defaultValues: {
//       material_name: "",
//       short_code: "",
//       hsn: "",
//       main_unit: null,
//       additional_units: [],
//     },
//     mode: "onSubmit",
//   });

//   const [unitOptions] = useState<Option[]>(dummyUnitOptions);
//   const [loading, setLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [formData, setFormData] = useState<FormValues | null>(null);
//   const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

//   const showToast = (message: string, type: "success" | "error" = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 2500);
//   };

//   const { control, watch, setValue, reset } = methods;
//   const { fields, append, remove } = useFieldArray({ control, name: "additional_units" });

//   const watchedMainUnit = watch("main_unit");
//   const watchedAdditional = watch("additional_units") || [];

//   const getUnitValue = (u: any): string | null => {
//     if (!u) return null;
//     if (typeof u === "string") return u;
//     return u.value ?? null;
//   };

//   const watchedMainUnitVal = getUnitValue(watchedMainUnit);

//   // Prevent duplicate units
//   useEffect(() => {
//     if (!watchedMainUnitVal) return;
//     watchedAdditional.forEach((a: AdditionalUnit, i: number) => {
//       if (getUnitValue(a?.unit) === watchedMainUnitVal) {
//         setValue(`additional_units.${i}.unit`, null);
//       }
//     });
//   }, [watchedMainUnitVal, watchedAdditional, setValue]);

//   const getOptionsForRow = (rowIndex: number): Option[] => {
//     const exclude = new Set<string>();
//     if (watchedMainUnitVal) exclude.add(watchedMainUnitVal);

//     watchedAdditional.forEach((a: AdditionalUnit, i: number) => {
//       const v = getUnitValue(a?.unit);
//       if (v && i !== rowIndex) exclude.add(v);
//     });

//     return unitOptions.filter((u) => !exclude.has(u.value));
//   };

//   const canAddMoreUnits = () => {
//     const selected = new Set<string>();
//     if (watchedMainUnitVal) selected.add(watchedMainUnitVal);
//     watchedAdditional.forEach((a) => {
//       const v = getUnitValue(a?.unit);
//       if (v) selected.add(v);
//     });
//     return selected.size < unitOptions.length;
//   };

//   const handleAppendUnit = () => {
//     if (!canAddMoreUnits()) return;
//     append({ unit: null, quantity: "" });
//   };

//   // ==================== SUBMIT ====================
//   const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
//     setFormData(data);
//     setShowConfirm(true);
//   };

//   const confirmSubmit = async () => {
//     if (!formData) return;
//     setLoading(true);

//     try {
//       // Transform data for backend
//       const payload = {
//         material_name: formData.material_name,
//         short_code: formData.short_code,
//         hsn: formData.hsn,
//         main_unit: getUnitValue(formData.main_unit),
//         additional_units: formData.additional_units
//           .filter((u) => u.unit)
//           .map((u) => ({
//             unit: getUnitValue(u.unit),
//             quantity: u.quantity,
//           })),
//       };

//       const response = await postAPI("NEW_MATERIAL", payload, true); // Add this endpoint in API_ENDPOINTS

//       if (response.status === "success") {
//         showToast("Material added successfully");
//         reset();
//         setTimeout(() => {
//           window.location.href = "/materials"; // or use router.push
//         }, 1200);
//       } else {
//         showToast(response.message || "Failed to add material", "error");
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
//     setFormData(null);
//     setShowConfirm(false);
//   };

//   const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
//     <div className="flex items-center justify-between gap-4">
//       <label className="w-1/3 font-medium text-gray-700 text-[15px]">{label}</label>
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

//       <div className="flex flex-col bg-white py-6">
//         <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {/* Left Column */}
//             <div className="space-y-6">
//               <h2 className="text-lg font-medium text-[#103BB5] mb-2">Material Details</h2>
//               <div className="space-y-4">
//                 <Row label="Material Name">
//                   <FormField
//                     type="input"
//                     name="material_name"
//                     placeholder="Enter material name"
//                     validation={{ required: "Material name is required" }}
//                   />
//                 </Row>

//                 <Row label="Short Code">
//                   <FormField
//                     type="input"
//                     name="short_code"
//                     placeholder="Enter short code"
//                     className="uppercase no-space"
//                   />
//                 </Row>

//                 <Row label="HSN">
//                   <FormField
//                     type="input"
//                     name="hsn"
//                     placeholder="Enter HSN"
//                     className="only-numbers limit-10"
//                   />
//                 </Row>

//                 <Row label="Main Unit">
//                   <FormField
//                     type="typeahead"
//                     name="main_unit"
//                     placeholder="Select main unit"
//                     options={unitOptions}
//                     validation={{ required: "Main unit is required" }}
//                   />
//                 </Row>
//               </div>
//             </div>

//             {/* Right Column - Additional Units */}
//             <div className="space-y-6">
//               <h2 className="text-lg font-medium text-[#103BB5] mt-6">Additional Units</h2>
//               <div className="space-y-4">
//                 {fields.map((field, idx) => (
//                   <div key={field.id} className="flex items-center gap-3">
//                     <div className="flex-1 grid grid-cols-2 gap-3">
//                       <FormField
//                         type="typeahead"
//                         name={`additional_units.${idx}.unit`}
//                         placeholder={`Select unit #${idx + 1}`}
//                         options={getOptionsForRow(idx)}
//                       />
//                       <FormField
//                         type="input"
//                         name={`additional_units.${idx}.quantity`}
//                         placeholder="Quantity"
//                         className="numbers-decimal"
//                       />
//                     </div>
//                     <Button type="button" variant="outline" onClick={() => remove(idx)}>
//                       Remove
//                     </Button>
//                   </div>
//                 ))}

//                 <Button
//                   type="button"
//                   variant="secondary"
//                   onClick={handleAppendUnit}
//                   disabled={!canAddMoreUnits()}
//                 >
//                   + Add Unit
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
//           <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
//             Cancel
//           </Button>

//           <Button
//             variant="default"
//             type="submit"
//             onClick={methods.handleSubmit(handleFormSubmit)}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </footer>
//       </div>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Submission"
//         message="Are you sure you want to add this material?"
//       />
//     </FormProvider>
//   );
// }

// "use client";

// import { useForm, FormProvider, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
// import { FormField } from "@/app/utils/dynamicField";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { Toaster } from "@/components/ui/toaster";
// import { postAPI } from "@/app/utils/api"; 

// type Option = { label: string; value: string };

// type AdditionalUnit = {
//   unit: Option | string | null;
//   quantity: string;
// };

// type FormValues = {
//   material_name: string;
//   short_code: string;
//   hsn: string;
//   main_unit: Option | string | null;
//   additional_units: AdditionalUnit[];
// };

// export default function MaterialForm() {
//   const methods = useForm<FormValues>({
//     defaultValues: {
//       material_name: "",
//       short_code: "",
//       hsn: "",
//       main_unit: null,
//       additional_units: [],
//     },
//     mode: "onSubmit",
//   });

//   const [unitOptions, setUnitOptions] = useState<Option[]>([
//     { label: "Gram", value: "1" },
//     { label: "Kilogram", value: "2" },
//     { label: "Piece", value: "3" },
//     { label: "Tola", value: "4" },
//     { label: "Carat", value: "5" },
//     { label: "Ounce", value: "6" },
//     { label: "Bag", value: "7" },
//   ]);

//   const [loading, setLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [formData, setFormData] = useState<FormValues | null>(null);
//   const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

//   const showToast = (message: string, type: "success" | "error" = "success") => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 2500);
//   };

//   const { control, watch, setValue, reset } = methods;
//   const { fields, append, remove } = useFieldArray({ control, name: "additional_units" });

//   const watchedMainUnit = watch("main_unit");
//   const watchedAdditional = watch("additional_units") || [];

//   // Robust label extractor
//   const getUnitLabel = (unit: any): string | null => {
//     if (!unit) return null;
//     if (typeof unit === "string") {
//       // If it's a value (number string), find corresponding label
//       const option = unitOptions.find(opt => opt.value === unit);
//       return option?.label || unit; // fallback to value if not found
//     }
//     return unit.label || unit.value || String(unit);
//   };

//   const watchedMainUnitLabel = getUnitLabel(watchedMainUnit);

//   // Prevent duplicate units
//   useEffect(() => {
//     if (!watchedMainUnitLabel) return;

//     watchedAdditional.forEach((_, i) => {
//       const unitValue = watchedAdditional[i]?.unit;
//       if (getUnitLabel(unitValue) === watchedMainUnitLabel) {
//         setValue(`additional_units.${i}.unit`, null);
//       }
//     });
//   }, [watchedMainUnitLabel, watchedAdditional, setValue, unitOptions]);

//   const getOptionsForRow = (rowIndex: number): Option[] => {
//     const exclude = new Set<string>();
//     if (watchedMainUnitLabel) exclude.add(watchedMainUnitLabel);

//     watchedAdditional.forEach((a, i) => {
//       const label = getUnitLabel(a?.unit);
//       if (label && i !== rowIndex) exclude.add(label);
//     });

//     return unitOptions.filter((u) => !exclude.has(u.label));
//   };

//   const canAddMoreUnits = () => {
//     const selected = new Set<string>();
//     if (watchedMainUnitLabel) selected.add(watchedMainUnitLabel);
//     watchedAdditional.forEach((a) => {
//       const label = getUnitLabel(a?.unit);
//       if (label) selected.add(label);
//     });
//     return selected.size < unitOptions.length;
//   };

//   const handleAppendUnit = () => {
//     if (!canAddMoreUnits()) return;
//     append({ unit: null, quantity: "" });
//   };

//   // ==================== SUBMIT ====================
//   const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
//     setFormData(data);
//     setShowConfirm(true);
//   };

//   const confirmSubmit = async () => {
//     if (!formData) return;
//     setLoading(true);

//     try {
//       const payload = {
//         data: {
//           material_name: formData.material_name,
//           short_code: formData.short_code,
//           hsn: formData.hsn,
//           main_unit: getUnitLabel(formData.main_unit),
//           additional_units: formData.additional_units
//             .filter((u) => getUnitLabel(u.unit))
//             .map((u) => ({
//               unit_name: getUnitLabel(u.unit),
//               quantity: Number(u.quantity) || 0,
//             })),
//         },
//       };

//       console.log("🚀 Final Payload:", JSON.stringify(payload, null, 2));

//       const response = await postAPI("NEW_MATERIAL", payload, true);

//       if (response?.success || response?.status === "success") {
//         showToast("Material added successfully");
//         reset();
//       } else {
//         showToast(response?.message || "Failed to add material", "error");
//       }
//     } catch (err: any) {
//       console.error(err);
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

//   const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
//     <div className="flex items-center justify-between gap-4">
//       <label className="w-1/3 font-medium text-gray-700 text-[15px]">{label}</label>
//       <div className="w-2/3">{children}</div>
//     </div>
//   );

//   return (
//     <FormProvider {...methods}>
//       {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

//       <div className="flex flex-col bg-white py-6">
//         <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             <div className="space-y-6">
//               <h2 className="text-lg font-medium text-[#103BB5] mb-2">Material Details</h2>
//               <div className="space-y-4">
//                 <Row label="Material Name">
//                   <FormField type="input" name="material_name" placeholder="Enter material name" validation={{ required: "Material name is required" }} />
//                 </Row>
//                 <Row label="Short Code">
//                   <FormField type="input" name="short_code" placeholder="Enter short code" className="uppercase no-space" />
//                 </Row>
//                 <Row label="HSN">
//                   <FormField type="input" name="hsn" placeholder="Enter HSN" className="only-numbers limit-10" />
//                 </Row>
//                 <Row label="Main Unit">
//                   <FormField 
//                     type="typeahead" 
//                     name="main_unit" 
//                     placeholder="Select main unit" 
//                     options={unitOptions} 
//                     validation={{ required: "Main unit is required" }} 
//                   />
//                 </Row>
//               </div>
//             </div>

//             <div className="space-y-6">
//               <h2 className="text-lg font-medium text-[#103BB5] mt-6">Additional Units</h2>
//               <div className="space-y-4">
//                 {fields.map((field, idx) => (
//                   <div key={field.id} className="flex items-center gap-3">
//                     <div className="flex-1 grid grid-cols-2 gap-3">
//                       <FormField
//                         type="typeahead"
//                         name={`additional_units.${idx}.unit`}
//                         placeholder={`Select unit #${idx + 1}`}
//                         options={getOptionsForRow(idx)}
//                       />
//                       <FormField
//                         type="input"
//                         name={`additional_units.${idx}.quantity`}
//                         placeholder="Quantity"
//                         className="numbers-decimal"
//                       />
//                     </div>
//                     <Button type="button" variant="outline" onClick={() => remove(idx)}>
//                       Remove
//                     </Button>
//                   </div>
//                 ))}

//                 <Button 
//                   type="button" 
//                   variant="secondary" 
//                   onClick={handleAppendUnit} 
//                   disabled={!canAddMoreUnits()}
//                 >
//                   + Add Unit
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
//           <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
//             Cancel
//           </Button>
//           <Button 
//             variant="default" 
//             onClick={methods.handleSubmit(handleFormSubmit)} 
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit"}
//           </Button>
//         </footer>
//       </div>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Submission"
//         message="Are you sure you want to add this material?"
//       />
//     </FormProvider>
//   );
// }




"use client";

import { useForm, FormProvider, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import ConfirmModal from "@/app/utils/confirmationModal";
import { Toaster } from "@/components/ui/toaster";
import { postAPI } from "@/app/utils/api";

type Option = { label: string; value: string };

type AdditionalUnit = {
  unit: Option | string | null;
  quantity: string;
};

type FormValues = {
  material_name: string;
  short_code: string;
  hsn: string;
  main_unit: Option | string | null;
  additional_units: AdditionalUnit[];
};

export default function MaterialForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      material_name: "",
      short_code: "",
      hsn: "",
      main_unit: null,
      additional_units: [],
    },
    mode: "onSubmit",
  });

  const [unitOptions, setUnitOptions] = useState<Option[]>([]);
  const [loadingUnits, setLoadingUnits] = useState(true);

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const { control, watch, setValue, reset } = methods;
  const { fields, append, remove } = useFieldArray({ control, name: "additional_units" });

  const watchedMainUnit = watch("main_unit");
  const watchedAdditional = watch("additional_units") || [];

  // ==================== FETCH UNITS ====================
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await postAPI("LEDGER_LIST", {
          data: { ledger_type: "unit_ledger" }
        }, true);

        let rawUnits = [];
        if (Array.isArray(response.data)) rawUnits = response.data;
        else if (Array.isArray(response.data?.data)) rawUnits = response.data.data;

        const formatted = rawUnits.map((item: any) => ({
          label: item.ledgerName || item.name || "Unknown",
          value: String(item.ID || item.id)
        }));

        setUnitOptions(formatted);
      } catch (err) {
        console.error(err);
        showToast("Failed to load units", "error");
      } finally {
        setLoadingUnits(false);
      }
    };

    fetchUnits();
  }, []);

  // Get display name from ID
const getUnitLabel = (unit: any): string | null => {
  if (!unit) return null;
  
  if (typeof unit === "string") {
    const found = unitOptions.find(opt => opt.value === unit);
    return found?.label || unit;
  }
  
  if (typeof unit === "object" && unit !== null) {
    return unit.label || unit.ledgerName || "Unknown";
  }
  
  return String(unit);
};

  const watchedMainUnitLabel = getUnitLabel(watchedMainUnit);

  // Prevent duplicate unit selection
  useEffect(() => {
    if (!watchedMainUnitLabel) return;
    watchedAdditional.forEach((_, i) => {
      if (getUnitLabel(watchedAdditional[i]?.unit) === watchedMainUnitLabel) {
        setValue(`additional_units.${i}.unit`, null);
      }
    });
  }, [watchedMainUnitLabel, watchedAdditional, setValue]);

  const getOptionsForRow = (rowIndex: number): Option[] => {
    const exclude = new Set<string>();
    if (watchedMainUnitLabel) exclude.add(watchedMainUnitLabel);

    watchedAdditional.forEach((a, i) => {
      const label = getUnitLabel(a?.unit);
      if (label && i !== rowIndex) exclude.add(label);
    });

    return unitOptions.filter(u => !exclude.has(u.label));
  };

  const canAddMoreUnits = () => unitOptions.length > 0 && 
    (watchedAdditional.length + (watchedMainUnit ? 1 : 0)) < unitOptions.length;

  const handleAppendUnit = () => {
    if (canAddMoreUnits()) append({ unit: null, quantity: "" });
  };

  // ==================== SUBMIT ====================
  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData(data);
    setShowConfirm(true);
  };

  

    const confirmSubmit = async () => {
  if (!formData) return;
  setLoading(true);

  try {
    // Safely extract unit ID
    const getUnitId = (unit: Option | string | null): string | null => {
      if (!unit) return null;
      if (typeof unit === "string") return unit;
      return unit.value || null;
    };

    const mainUnitId = getUnitId(formData.main_unit);

    const payload = {
      data: {
        material_name: formData.material_name.trim(),
        short_code: formData.short_code.trim().toUpperCase(),
        hsn: formData.hsn.trim(),
        main_unit: mainUnitId,                    // Send ID as string
        additional_units: formData.additional_units
          .filter((u) => u.unit)
          .map((u) => ({
            unit_id: getUnitId(u.unit),           // Send ID
            quantity: Number(u.quantity) || 0,
          })),
      },
    };

    console.log("🚀 Final Payload:", JSON.stringify(payload, null, 2));

    const response = await postAPI("NEW_MATERIAL", payload, true);

    if (response?.success || response?.status === "success") {
      showToast("Material added successfully", "success");
      reset();
    } else {
      showToast(response?.message || "Failed to add material", "error");
    }
  } catch (err: any) {
    console.error(err);
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
  };

  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4">
      <label className="w-1/3 font-medium text-gray-700 text-[15px]">{label}</label>
      <div className="w-2/3">{children}</div>
    </div>
  );

  return (
    <FormProvider {...methods}>
      {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex flex-col bg-white py-6">
        <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-[#103BB5] mb-2">Material Details</h2>
              <div className="space-y-4">
                <Row label="Material Name">
                  <FormField type="input" name="material_name" placeholder="Enter material name" validation={{ required: "Material name is required" }} />
                </Row>
                <Row label="Short Code">
                  <FormField type="input" name="short_code" placeholder="Enter short code" className="uppercase no-space" />
                </Row>
                <Row label="HSN">
                  <FormField type="input" name="hsn" placeholder="Enter HSN" className="only-numbers limit-10" />
                </Row>
                <Row label="Main Unit">
                  <FormField 
                    type="typeahead" 
                    name="main_unit" 
                    placeholder={loadingUnits ? "Loading units..." : "Select main unit"} 
                    options={unitOptions} 
                    validation={{ required: "Main unit is required" }} 
                    disabled={loadingUnits}
                  />
                </Row>
              </div>
            </div>

            {/* Additional Units Section remains same */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-[#103BB5] mt-6">Additional Units</h2>
              <div className="space-y-4">
                {fields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <FormField
                        type="typeahead"
                        name={`additional_units.${idx}.unit`}
                        placeholder={`Select unit #${idx + 1}`}
                        options={getOptionsForRow(idx)}
                        disabled={loadingUnits}
                      />
                      <FormField
                        type="input"
                        name={`additional_units.${idx}.quantity`}
                        placeholder="Quantity"
                        className="numbers-decimal"
                      />
                    </div>
                    <Button type="button" variant="outline" onClick={() => remove(idx)}>
                      Remove
                    </Button>
                  </div>
                ))}

                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleAppendUnit} 
                  disabled={!canAddMoreUnits() || loadingUnits}
                >
                  + Add Unit
                </Button>
              </div>
            </div>
          </div>
        </div>

        <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={methods.handleSubmit(handleFormSubmit)} 
            disabled={loading || loadingUnits}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </footer>
      </div>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        loading={loading}
        title="Confirm Submission"
        message="Are you sure you want to add this material?"
      />
    </FormProvider>
  );
}