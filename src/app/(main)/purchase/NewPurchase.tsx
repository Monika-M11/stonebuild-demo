


// "use client";

// import React, { useMemo, useState } from "react";
// import {
//   useForm,
//   FormProvider,
//   SubmitHandler,
//   useFieldArray,
//   useWatch,
// } from "react-hook-form";
// import { FormField } from "@/app/utils/dynamicField";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import ConfirmModal from "@/app/utils/confirmationModal";

// type Option = { label: string; value: string };

// type ItemRow = {
//   material: Option | string | null;
//   unit: Option | string | null;
//   quantity: string;
//   rate: string;
//   tax_amount: string;
//   tax_percent: string;
// };

// type ChargeRow = {
//   description: string;
//   amount: string;
// };

// type FormValues = {
//   supplier: Option | string | null;
//   date: string | null;
//   invoice_number: string;
//   items: ItemRow[];
//   additional_charges: ChargeRow[];
// };

// export default function PurchaseForm() {
//   const methods = useForm<FormValues>({
//     defaultValues: {
//       supplier: null,
//       date: null,
//       invoice_number: "",
//       items: [],
//       additional_charges: [],
//     },
//   });

//   const { control, handleSubmit, reset } = methods;

//   // Dummy Options
//   const supplierOptions: Option[] = [
//     { label: "UltraTech Cement Distributors", value: "sup1" },
//     { label: "Tata Steel Logistics", value: "sup2" },
//     { label: "L&T Heavy Machinery Rentals", value: "sup3" },
//     { label: "JSW Neo Steel Traders", value: "sup4" },
//     { label: "Ambuja ReadyMix Concrete", value: "sup5" },
//   ];

//   const materialOptions: Option[] = [
//     { label: "OPC 53 Grade Cement", value: "mat1" },
//     { label: "TMT Steel Rebars (Fe 550D)", value: "mat2" },
//     { label: "Crushed Coarse Aggregate (20mm)", value: "mat3" },
//     { label: "M-Sand (Manufacturing Sand)", value: "mat4" },
//     { label: "Ready-Mix Concrete (M25)", value: "mat5" },
//     { label: "Fly Ash Bricks", value: "mat6" },
//     { label: "PVC Conduit Pipes", value: "mat7" },
//   ];

//   const unitOptions: Option[] = [
//     { label: "Bag", value: "u1" },
//     { label: "Ton", value: "u2" },
//     { label: "Brass", value: "u3" },
//     { label: "Kg", value: "u4" },
//     { label: "Piece", value: "u5" },
//   ];


//   // Field Arrays
//   const {
//     fields: itemFields,
//     append: appendItem,
//     remove: removeItem,
//   } = useFieldArray({ control, name: "items" });

//   const {
//     fields: chargeFields,
//     append: appendCharge,
//     remove: removeCharge,
//   } = useFieldArray({ control, name: "additional_charges" });

//   // Live Watch
//   const watchedItems = useWatch({ control, name: "items" }) || [];
//   const watchedCharges = useWatch({ control, name: "additional_charges" }) || [];

//   const parseNumber = (v: any) => {
//     const n = parseFloat(String(v || "").replace(/,/g, ""));
//     return isNaN(n) ? 0 : n;
//   };

//   // Computed Values
//   const computedLines = useMemo(() => {
//     return watchedItems.map((it: ItemRow) => {
//       const qty = parseNumber(it.quantity);
//       const rate = parseNumber(it.rate);
//       const taxAmount = parseNumber(it.tax_amount);
//       const taxPercent = parseNumber(it.tax_percent);

//       const base = qty * rate;
//       const taxFromPercent = taxPercent ? (base * taxPercent) / 100 : 0;
//       const tax = taxAmount || taxFromPercent;
//       const totalLine = base + tax;

//       return { base, tax, totalLine };
//     });
//   }, [watchedItems]);

//   const subtotal = useMemo(() => computedLines.reduce((s, l) => s + l.base, 0), [computedLines]);
//   const totalTax = useMemo(() => computedLines.reduce((s, l) => s + l.tax, 0), [computedLines]);
//   const additionalTotal = useMemo(
//     () => watchedCharges.reduce((s: number, c: ChargeRow) => s + parseNumber(c.amount), 0),
//     [watchedCharges]
//   );
//   const grandTotal = subtotal + totalTax + additionalTotal;

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [loadingSubmit, setLoadingSubmit] = useState(false);
//   const [pendingPayload, setPendingPayload] = useState<FormValues | null>(null);

//   const onSubmit: SubmitHandler<FormValues> = (data) => {
//     setPendingPayload(data);
//     setShowConfirm(true);
//   };

//   const confirmSubmit = async () => {
//     if (!pendingPayload) return;
//     setLoadingSubmit(true);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       toast.success("Purchase saved successfully ✅");
//       reset(); // Clear form
//     } catch (err) {
//       toast.error("Something went wrong ❌");
//     } finally {
//       setLoadingSubmit(false);
//       setShowConfirm(false);
//       setPendingPayload(null);
//     }
//   };

//   const handleAddItem = () => {
//     appendItem({
//       material: null,
//       unit: null,
//       quantity: "",
//       rate: "",
//       tax_amount: "",
//       tax_percent: "",
//     });
//   };

//   const handleAddCharge = () => {
//     appendCharge({ description: "", amount: "" });
//   };

//   const RowLabel = ({ children }: { children: React.ReactNode }) => (
//     <div className="font-medium text-sm text-gray-700 mb-1">{children}</div>
//   );

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div>
//             <RowLabel>Supplier</RowLabel>
//             <FormField
//               type="typeahead"
//               name="supplier"
//               placeholder="Select supplier"
//               options={supplierOptions}
//             />
//           </div>

//           <div>
//             <RowLabel>Date</RowLabel>
//             <FormField type="datepicker" name="date" placeholder="Select date" />
//           </div>

//           <div>
//             <RowLabel>Invoice Number</RowLabel>
//             <FormField type="input" name="invoice_number" placeholder="Invoice #" />
//           </div>
//         </div>

//         {/* Materials Table */}
//         <div className="mt-8">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-medium text-[#103BB5]">Materials</h3>
//             <Button type="button" variant="secondary" onClick={handleAddItem}>
//               + Add Item
//             </Button>
//           </div>

//           <div className="overflow-x-auto border rounded-lg">
//             <table className="w-full table-auto border-collapse">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="p-3 text-left">S.no</th>
//                   <th className="p-3 text-left">Material</th>
//                   <th className="p-3 text-left">Unit</th>
//                   <th className="p-3 text-left">Quantity</th>
//                   <th className="p-3 text-left">Rate</th>
//                   <th className="p-3 text-left">Tax Amount</th>
//                   <th className="p-3 text-left">Tax %</th>
//                   <th className="p-3 text-left">Line Total</th>
//                   <th className="p-3 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {itemFields.map((field, idx) => (
//                   <tr key={field.id} className="border-t hover:bg-gray-50">
//                     <td className="p-3">{idx + 1}</td>
//                     <td className="p-3">
//                       <FormField
//                         type="typeahead"
//                         name={`items.${idx}.material`}
//                         options={materialOptions}
//                         placeholder="Select material"
//                       />
//                     </td>
//                     <td className="p-3">
//                       <FormField
//                         type="typeahead"
//                         name={`items.${idx}.unit`}
//                         options={unitOptions}
//                         placeholder="Unit"
//                       />
//                     </td>
//                     <td className="p-3">
//                       <FormField
//                         type="input"
//                         name={`items.${idx}.quantity`}
//                         placeholder="0"
//                         className="numbers-decimal"
//                       />
//                     </td>
//                     <td className="p-3">
//                       <FormField
//                         type="input"
//                         name={`items.${idx}.rate`}
//                         placeholder="0.00"
//                         className="numbers-decimal"
//                       />
//                     </td>
//                     <td className="p-3">
//                       <FormField
//                         type="input"
//                         name={`items.${idx}.tax_amount`}
//                         placeholder="0.00"
//                         className="numbers-decimal"
//                       />
//                     </td>
//                     <td className="p-3">
//                       <FormField
//                         type="input"
//                         name={`items.${idx}.tax_percent`}
//                         placeholder="%"
//                         className="numbers-decimal"
//                       />
//                     </td>
//                     <td className="p-3 font-medium">
//                       {computedLines[idx]?.totalLine.toFixed(2) || "0.00"}
//                     </td>
//                     <td className="p-3 text-center">
//                       <Button
//                         type="button"
//                         variant="outline"
//                         size="sm"
//                         onClick={() => removeItem(idx)}
//                       >
//                         Remove
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}

//                 {itemFields.length === 0 && (
//                   <tr>
//                     <td colSpan={9} className="p-8 text-center text-gray-500">
//                       No items added yet. Click "Add Item" to begin.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Additional Charges */}
//         <div className="mt-8">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="text-lg font-medium text-[#103BB5]">Additional Charges</h3>
//             <Button type="button" variant="secondary" onClick={handleAddCharge}>
//               + Add Charge
//             </Button>
//           </div>

//           <div className="space-y-3">
//             {chargeFields.map((field, i) => (
//               <div key={field.id} className="flex gap-4 items-center">
//                 <div className="flex-1">
//                   <FormField
//                     type="input"
//                     name={`additional_charges.${i}.description`}
//                     placeholder="Description (e.g. Shipping, Packing)"
//                   />
//                 </div>
//                 <div className="w-48">
//                   <FormField
//                     type="input"
//                     name={`additional_charges.${i}.amount`}
//                     placeholder="Amount"
//                     className="numbers-decimal"
//                   />
//                 </div>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => removeCharge(i)}
//                 >
//                   Remove
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Totals */}
//         <div className="mt-8 flex justify-end">
//           <div className="w-full max-w-md bg-gray-50 p-5 rounded-lg border">
//             <div className="flex justify-between py-1.5">
//               <span>Subtotal</span>
//               <span className="font-medium">{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between py-1.5">
//               <span>Tax Charges</span>
//               <span className="font-medium">{totalTax.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between py-1.5">
//               <span>Additional Charges</span>
//               <span className="font-medium">{additionalTotal.toFixed(2)}</span>
//             </div>
//             <div className="border-t pt-3 mt-2 flex justify-between text-lg font-bold">
//               <span>Grand Total</span>
//               <span>₹ {grandTotal.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 flex justify-end gap-4">
//           <Button type="button" variant="outline" onClick={() => reset()}>
//             Cancel
//           </Button>
//           <Button type="submit" disabled={loadingSubmit}>
//             {loadingSubmit ? "Saving..." : "Save Purchase"}
//           </Button>
//         </div>
//       </form>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loadingSubmit}
//         title="Confirm Purchase"
//         message={`Are you sure you want to save this purchase?\nGrand Total: ₹ ${grandTotal.toFixed(2)}`}
//       />
//     </FormProvider>
//   );
// }

//API

"use client";

import React, { useMemo, useState } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ConfirmModal from "@/app/utils/confirmationModal";

import { postAPI } from "@/app/utils/api";

type Option = { label: string; value: string };

type ItemRow = {
  material: Option | string | null;
  unit: Option | string | null;
  quantity: string;
  rate: string;
  tax_amount: string;
  tax_percent: string;
};

type ChargeRow = {
  description: string;
  amount: string;
};

type FormValues = {
  supplier: Option | string | null;
  date: string | null;
  invoice_number: string;
  items: ItemRow[];
  additional_charges: ChargeRow[];
};

export default function PurchaseForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      supplier: null,
      date: null,
      invoice_number: "",
      items: [],
      additional_charges: [],
    },
  });

  const { control, handleSubmit, reset } = methods;

  // Dummy Options (keep your original options)
  const supplierOptions: Option[] = [
    { label: "UltraTech Cement Distributors", value: "sup1" },
    { label: "Tata Steel Logistics", value: "sup2" },
    { label: "L&T Heavy Machinery Rentals", value: "sup3" },
    { label: "JSW Neo Steel Traders", value: "sup4" },
    { label: "Ambuja ReadyMix Concrete", value: "sup5" },
  ];

  const materialOptions: Option[] = [
    { label: "OPC 53 Grade Cement", value: "mat1" },
    { label: "TMT Steel Rebars (Fe 550D)", value: "mat2" },
    { label: "Crushed Coarse Aggregate (20mm)", value: "mat3" },
    { label: "M-Sand (Manufacturing Sand)", value: "mat4" },
    { label: "Ready-Mix Concrete (M25)", value: "mat5" },
    { label: "Fly Ash Bricks", value: "mat6" },
    { label: "PVC Conduit Pipes", value: "mat7" },
  ];

  const unitOptions: Option[] = [
    { label: "Bag", value: "u1" },
    { label: "Ton", value: "u2" },
    { label: "Brass", value: "u3" },
    { label: "Kg", value: "u4" },
    { label: "Piece", value: "u5" },
  ];

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({ control, name: "items" });

  const {
    fields: chargeFields,
    append: appendCharge,
    remove: removeCharge,
  } = useFieldArray({ control, name: "additional_charges" });

  const watchedItems = useWatch({ control, name: "items" }) || [];
  const watchedCharges = useWatch({ control, name: "additional_charges" }) || [];

  const parseNumber = (v: any) => {
    const n = parseFloat(String(v || "").replace(/,/g, ""));
    return isNaN(n) ? 0 : n;
  };

  const getValue = (val: Option | string | null): string => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val.value || "";
  };

  const computedLines = useMemo(() => {
    return watchedItems.map((it: ItemRow) => {
      const qty = parseNumber(it.quantity);
      const rate = parseNumber(it.rate);
      const taxAmount = parseNumber(it.tax_amount);
      const taxPercent = parseNumber(it.tax_percent);

      const base = qty * rate;
      const taxFromPercent = taxPercent ? (base * taxPercent) / 100 : 0;
      const tax = taxAmount || taxFromPercent;
      const totalLine = base + tax;

      return { base, tax, totalLine };
    });
  }, [watchedItems]);

  const subtotal = useMemo(() => computedLines.reduce((s, l) => s + l.base, 0), [computedLines]);
  const totalTax = useMemo(() => computedLines.reduce((s, l) => s + l.tax, 0), [computedLines]);
  const additionalTotal = useMemo(
    () => watchedCharges.reduce((s: number, c: ChargeRow) => s + parseNumber(c.amount), 0),
    [watchedCharges]
  );
  const grandTotal = subtotal + totalTax + additionalTotal;

  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [pendingPayload, setPendingPayload] = useState<FormValues | null>(null);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setPendingPayload(data);
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    if (!pendingPayload) return;
    setLoadingSubmit(true);

    try {
      const payload = {
        supplier: getValue(pendingPayload.supplier),
        date: pendingPayload.date,
        invoice_number: pendingPayload.invoice_number,
        items: pendingPayload.items.map((item) => ({
          material: getValue(item.material),
          unit: getValue(item.unit),
          quantity: parseNumber(item.quantity),
          rate: parseNumber(item.rate),
          tax_amount: parseNumber(item.tax_amount),
          tax_percent: parseNumber(item.tax_percent),
        })),
        additional_charges: pendingPayload.additional_charges.map((c) => ({
          description: c.description,
          amount: parseNumber(c.amount),
        })),
      };

      const response = await postAPI("ADD_PURCHASE", payload, true);

      if (response.status === "success") {
        toast.success("Purchase saved successfully ✅");
        reset();
      } else {
        toast.error(response.message || "Failed to save purchase");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoadingSubmit(false);
      setShowConfirm(false);
      setPendingPayload(null);
    }
  };

  const handleAddItem = () => {
    appendItem({
      material: null,
      unit: null,
      quantity: "",
      rate: "",
      tax_amount: "",
      tax_percent: "",
    });
  };

  const handleAddCharge = () => {
    appendCharge({ description: "", amount: "" });
  };

  const RowLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="font-medium text-sm text-gray-700 mb-1">{children}</div>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <RowLabel>Supplier</RowLabel>
            <FormField
              type="typeahead"
              name="supplier"
              placeholder="Select supplier"
              options={supplierOptions}
            />
          </div>

          <div>
            <RowLabel>Date</RowLabel>
            <FormField type="datepicker" name="date" placeholder="Select date" />
          </div>

          <div>
            <RowLabel>Invoice Number</RowLabel>
            <FormField type="input" name="invoice_number" placeholder="Invoice #" />
          </div>
        </div>

        {/* Materials Table - unchanged */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-[#103BB5]">Materials</h3>
            <Button type="button" variant="secondary" onClick={handleAddItem}>
              + Add Item
            </Button>
          </div>

          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">S.no</th>
                  <th className="p-3 text-left">Material</th>
                  <th className="p-3 text-left">Unit</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Rate</th>
                  <th className="p-3 text-left">Tax Amount</th>
                  <th className="p-3 text-left">Tax %</th>
                  <th className="p-3 text-left">Line Total</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {itemFields.map((field, idx) => (
                  <tr key={field.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">
                      <FormField
                        type="typeahead"
                        name={`items.${idx}.material`}
                        options={materialOptions}
                        placeholder="Select material"
                      />
                    </td>
                    <td className="p-3">
                      <FormField
                        type="typeahead"
                        name={`items.${idx}.unit`}
                        options={unitOptions}
                        placeholder="Unit"
                      />
                    </td>
                    <td className="p-3">
                      <FormField
                        type="input"
                        name={`items.${idx}.quantity`}
                        placeholder="0"
                        className="numbers-decimal"
                      />
                    </td>
                    <td className="p-3">
                      <FormField
                        type="input"
                        name={`items.${idx}.rate`}
                        placeholder="0.00"
                        className="numbers-decimal"
                      />
                    </td>
                    <td className="p-3">
                      <FormField
                        type="input"
                        name={`items.${idx}.tax_amount`}
                        placeholder="0.00"
                        className="numbers-decimal"
                      />
                    </td>
                    <td className="p-3">
                      <FormField
                        type="input"
                        name={`items.${idx}.tax_percent`}
                        placeholder="%"
                        className="numbers-decimal"
                      />
                    </td>
                    <td className="p-3 font-medium">
                      {computedLines[idx]?.totalLine.toFixed(2) || "0.00"}
                    </td>
                    <td className="p-3 text-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(idx)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}

                {itemFields.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-gray-500">
                      No items added yet. Click "Add Item" to begin.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Charges - unchanged */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium text-[#103BB5]">Additional Charges</h3>
            <Button type="button" variant="secondary" onClick={handleAddCharge}>
              + Add Charge
            </Button>
          </div>

          <div className="space-y-3">
            {chargeFields.map((field, i) => (
              <div key={field.id} className="flex gap-4 items-center">
                <div className="flex-1">
                  <FormField
                    type="input"
                    name={`additional_charges.${i}.description`}
                    placeholder="Description (e.g. Shipping, Packing)"
                  />
                </div>
                <div className="w-48">
                  <FormField
                    type="input"
                    name={`additional_charges.${i}.amount`}
                    placeholder="Amount"
                    className="numbers-decimal"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeCharge(i)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Totals - unchanged */}
        <div className="mt-8 flex justify-end">
          <div className="w-full max-w-md bg-gray-50 p-5 rounded-lg border">
            <div className="flex justify-between py-1.5">
              <span>Subtotal</span>
              <span className="font-medium">{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span>Tax Charges</span>
              <span className="font-medium">{totalTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span>Additional Charges</span>
              <span className="font-medium">{additionalTotal.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 mt-2 flex justify-between text-lg font-bold">
              <span>Grand Total</span>
              <span>₹ {grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Cancel
          </Button>
          <Button type="submit" disabled={loadingSubmit}>
            {loadingSubmit ? "Saving..." : "Save Purchase"}
          </Button>
        </div>
      </form>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        loading={loadingSubmit}
        title="Confirm Purchase"
        message={`Are you sure you want to save this purchase?\nGrand Total: ₹ ${grandTotal.toFixed(2)}`}
      />
    </FormProvider>
  );
}