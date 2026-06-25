


// "use client";

// import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { postAPI } from "@/app/utils/api";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import ConfirmModal from "@/app/utils/confirmationModal";
// import { useRouter, usePathname } from "next/navigation";
// import DynamicField from "@/components/ui/fields/dynamicField";   // ← Default import

// type FormValues = {
//   warehouse_name: string;
//   phone: string;
//   address: string;
//   pincode: string;
//   state: string;
// };

// type WarehouseFormProps = {
//   editId?: string | null;
// };

// export default function WarehouseForm({ editId }: WarehouseFormProps) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const methods = useForm<FormValues>({
//     defaultValues: {
//       warehouse_name: "",
//       phone: "",
//       address: "",
//       pincode: "",
//       state: "",
//     },
//   });

//   const [loading, setLoading] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [formData, setFormData] = useState<FormValues | null>(null);

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
//         toast.success("Warehouse updated successfully 👍");
//       } else {
//         toast.success("Warehouse added successfully ✅");
//       }

//       methods.reset();
//       router.push(pathname);
//     } catch (err: any) {
//       toast.error(err?.message || "Something went wrong ❌");
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

//     const fetchWarehouse = async () => {
//       try {
//         const res = await postAPI("/get-warehouse-by-id", {
//           data: { warehouse_id: editId },
//         }, true);

//         if (res?.status === "success" && res.data) {
//           fillFormValues(res.data);
//         }
//       } catch (err) {
//         toast.error("Failed to load warehouse data");
//       }
//     };

//     fetchWarehouse();
//   }, [editId]);

//   const handleCancel = () => {
//     methods.reset();
//     setFormData(null);
//     setShowConfirm(false);
//     router.push(pathname);
//   };

//   const onInvalid = () => {
//     toast.error("Please fill all mandatory fields ❗");
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
//       <form className="flex flex-col bg-white py-6">
//         <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             <div className="space-y-6">
//               <h3 className="text-lg font-medium text-[#103BB5] mb-2">
//                 Warehouse Details
//               </h3>
//               <div className="space-y-4">
//                 <Row label="Warehouse Name" required>
//                   <DynamicField
//                     type="input"
//                     name="warehouse_name"
//                     placeholder="Enter Warehouse name"
//                     className="capitalize"
//                     validation={{ required: "Warehouse Name is required" }}
//                   />
//                 </Row>

//                 <Row label="Phone Number" required>
//                   <DynamicField
//                     type="input"
//                     name="phone"
//                     placeholder="Enter 10 Digit Phone number"
//                     className="only-number no-space limit-10"
//                     validation={{ required: "Phone Number is required" }}
//                   />
//                 </Row>

//                 <Row label="Address" required>
//                   <DynamicField
//                     type="textarea"
//                     name="address"
//                     placeholder="Enter full address"
//                     validation={{ required: "Address is required" }}
//                   />
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
//           </div>
//         </div>

//         <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
//           <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
//             Cancel
//           </Button>

//           <Button
//             variant="default"
//             type="submit"
//             disabled={loading}
//             onClick={methods.handleSubmit(handleFormSubmit, onInvalid)}
//           >
//             {loading ? "Submitting..." : editId ? "Update Warehouse" : "Add Warehouse"}
//           </Button>
//         </footer>
//       </form>

//       <ConfirmModal
//         open={showConfirm}
//         onCancel={() => setShowConfirm(false)}
//         onConfirm={confirmSubmit}
//         loading={loading}
//         title="Confirm Submission"
//         message={`Are you sure you want to ${editId ? "update" : "add"} this warehouse?`}
//       />
//     </FormProvider>
//   );
// }




"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { postAPI } from "@/app/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "@/app/utils/confirmationModal";
import { useRouter, usePathname } from "next/navigation";
import DynamicField from "@/components/ui/fields/dynamicField";

type FormValues = {
  warehouse_name: string;
  phone: string;
  address: string;
  pincode: string;
  state: string;
};

type WarehouseFormProps = {
  editId?: string | null;
};

export default function WarehouseForm({ editId }: WarehouseFormProps) {
  const router = useRouter();
  const pathname = usePathname();

  const methods = useForm<FormValues>({
    defaultValues: {
      warehouse_name: "",
      phone: "",
      address: "",
      pincode: "",
      state: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    setFormData(data);
    setShowConfirm(true);
  };

  // ==================== FETCH FOR EDIT ====================
  useEffect(() => {
    if (!editId) return;

    const fetchWarehouse = async () => {
      setLoading(true);
      try {
        const res = await postAPI("GET_WAREHOUSE_BY_ID", { warehouse_id: editId }, true);

        if (res?.status === "success" && res.data) {
          const w = res.data;
          methods.reset({
            warehouse_name: w.warehouse_name || "",
            phone: w.phone || "",
            address: w.address || "",
            pincode: w.pincode || "",
            state: w.state || "",
          });
        } else {
          toast.error(res?.message || "Failed to load warehouse");
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load warehouse data");
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouse();
  }, [editId, methods]);

  // ==================== SUBMIT ====================
  const confirmSubmit = async () => {
    if (!formData) return;
    setLoading(true);

    try {
      const payload = {
        ...formData,
        ...(editId && { warehouse_id: editId }),
      };

      const response = await postAPI("ADD_WAREHOUSE", payload, true);

      if (response.status === "success") {
        toast.success(editId ? "Warehouse updated successfully 👍" : "Warehouse added successfully ✅");
        methods.reset();
        setTimeout(() => {
          router.push("/warehouses"); // Adjust route if needed
        }, 1200);
      } else {
        toast.error(response.message || "Operation failed");
      }
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  const handleCancel = () => {
    methods.reset();
    setShowConfirm(false);
    router.push("/warehouses");
  };

  const onInvalid = () => {
    toast.error("Please fill all mandatory fields ❗");
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
      <form className="flex flex-col bg-white py-6" onSubmit={methods.handleSubmit(handleFormSubmit, onInvalid)}>
        <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-[#103BB5] mb-2">Warehouse Details</h3>
              <div className="space-y-4">
                <Row label="Warehouse Name" required>
                  <DynamicField
                    type="input"
                    name="warehouse_name"
                    placeholder="Enter Warehouse name"
                    className="capitalize"
                    validation={{ required: "Warehouse Name is required" }}
                  />
                </Row>

                <Row label="Phone Number" required>
                  <DynamicField
                    type="input"
                    name="phone"
                    placeholder="Enter 10 Digit Phone number"
                    className="only-number no-space limit-10"
                    validation={{ required: "Phone Number is required" }}
                  />
                </Row>

                <Row label="Address" required>
                  <DynamicField
                    type="textarea"
                    name="address"
                    placeholder="Enter full address"
                    validation={{ required: "Address is required" }}
                  />
                </Row>

                <Row label="Pincode">
                  <DynamicField
                    type="input"
                    name="pincode"
                    placeholder="Enter 6-Digit Pincode"
                    className="only-number no-space limit-6"
                  />
                </Row>

                <Row label="State">
                  <DynamicField
                    type="input"
                    name="state"
                    placeholder="Enter State"
                    className="uppercase"
                  />
                </Row>
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
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : editId ? "Update Warehouse" : "Add Warehouse"}
          </Button>
        </footer>
      </form>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        loading={loading}
        title="Confirm Submission"
        message={`Are you sure you want to ${editId ? "update" : "add"} this warehouse?`}
      />
    </FormProvider>
  );
}