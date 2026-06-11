"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

type FormValues = {
  equipment_name: string;
  quantity: string;
  status: string;
  remarks: string;
};

const statusOptions = [
  { label: "Working", value: "Working" },
  { label: "Under Maintenance", value: "Under Maintenance" },
];

const dummyEquipments = Array.from({ length: 32 }, (_, i) => ({
  id: i + 1,
  equipment_name: ["Concrete Mixer", "Excavator", "JCB", "Vibrator", "Scaffolding", "Crane", "Welding Machine", "Power Generator"][i % 8],
  quantity: (1 + i % 5).toString(),
  status: i % 3 === 0 ? "Working" : "Under Maintenance",
  remarks: i % 4 === 0 ? "Good condition" : "",
}));

type Props = { projectId: string; projectName: string };

export default function EquipmentsTab({ projectName }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: { equipment_name: "", quantity: "", status: "Working", remarks: "" },
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const onSubmit: SubmitHandler<FormValues> = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    showToast("Equipment added successfully ✅");
    methods.reset();
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Add Equipment - {projectName}</h3>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Equipment Name</label>
              <FormField type="input" name="equipment_name" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Quantity</label>
              <FormField type="input" name="quantity" className="numbers-decimal" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <FormField
                type="typeahead"
                name="status"
                placeholder="Select status"
                options={statusOptions}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Remarks</label>
              <FormField type="input" name="remarks" />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Adding..." : "Add Equipment"}
              </Button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Equipment List</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="table-default w-full">
              <thead>
                <tr>
                  <th>Equipment</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {dummyEquipments.map((eq) => (
                  <tr key={eq.id}>
                    <td>{eq.equipment_name}</td>
                    <td>{eq.quantity}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs ${eq.status === "Working" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {eq.status}
                      </span>
                    </td>
                    <td>{eq.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}