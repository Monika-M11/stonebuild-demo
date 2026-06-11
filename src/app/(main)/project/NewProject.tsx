"use client";

import {
  useForm,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import ConfirmModal from "@/app/utils/confirmationModal";
import { Toaster } from "@/components/ui/toaster";
import { format } from "date-fns";

type Option = { label: string; value: string };

type Phase = {
  phase_name: string;
  phase_description: string;
  budget: string;
};

type Member = {
  contact_id: string;
  designation_id: string;
};

type FormValues = {
  project_name: string;
  project_address: string;
  start_date: string;
  end_date: string;
  members: Member[];
  phases: Phase[];
};

// Dummy Data
const dummyContacts: Option[] = [
  { label: "Ramesh Kumar", value: "C001" },
  { label: "Priya Sharma", value: "C002" },
  { label: "Suresh Babu", value: "C003" },
  { label: "Lakshmi Narayanan", value: "C004" },
  { label: "Vijay Kumar", value: "C005" },
];

const dummyDesignations: Option[] = [
  { label: "Project Manager", value: "D001" },
  { label: "Site Engineer", value: "D002" },
  { label: "Supervisor", value: "D003" },
  { label: "Architect", value: "D004" },
  { label: "Labour Contractor", value: "D005" },
];

export default function ProjectForm() {
  const todayStr = format(new Date(), "dd/MM/yyyy");

  const methods = useForm<FormValues>({
    defaultValues: {
      project_name: "",
      project_address: "",
      start_date: todayStr,
      end_date: todayStr,
      members: [{ contact_id: "", designation_id: "" }],
      phases: [{ phase_name: "", phase_description: "", budget: "" }],
    },
  });

  const { control, reset, watch } = methods;

  const { fields: memberFields, append: appendMember, remove: removeMember } = useFieldArray({
    control,
    name: "members",
  });

  const { fields: phaseFields, append: appendPhase, remove: removePhase } = useFieldArray({
    control,
    name: "phases",
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
      await new Promise((resolve) => setTimeout(resolve, 800));
      showToast("Project added successfully ✅");
      reset();
    } catch (err) {
      showToast("Something went wrong ❌", "error");
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setFormData(null);
    }
  };

  const handleCancel = () => {
    reset();
    setFormData(null);
    setShowConfirm(false);
  };

  // Total Budget Calculation
  const phases = watch("phases") || [];
  const totalBudget = phases.reduce((sum, phase) => {
    const value = parseFloat(phase?.budget || "0");
    return sum + (isNaN(value) ? 0 : value);
  }, 0);

  const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4">
      <label className="w-1/3 font-medium text-gray-700 text-[15px]">{label}</label>
      <div className="w-2/3">{children}</div>
    </div>
  );

  return (
    <FormProvider {...methods}>
      {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <form onSubmit={methods.handleSubmit(handleFormSubmit)} className="flex flex-col bg-white py-6">
        <div className="flex-1 max-h-[calc(100vh-180px)] overflow-y-auto px-3 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* LEFT SIDE - Basic Info */}
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-[#103BB5] mb-2">Project Details</h2>
              <div className="space-y-4">
                <Row label="Project Name">
                  <FormField
                    type="input"
                    name="project_name"
                    placeholder="Enter Project Name"
                    validation={{ required: "Project Name is required" }}
                  />
                </Row>

                <Row label="Project Address">
                  <FormField
                    type="textarea"
                    name="project_address"
                    placeholder="Enter full address"
                    validation={{ required: "Project Address is required" }}
                  />
                </Row>

                <Row label="Start Date">
                  <FormField type="datepicker" name="start_date" />
                </Row>

                <Row label="End Date (Approx)">
                  <FormField type="datepicker" name="end_date" />
                </Row>
              </div>
            </div>

            {/* RIGHT SIDE - Members */}
            <div className="space-y-6">
              <div className="flex justify-between items-center mt-6">
                <h2 className="text-lg font-semibold text-gray-800">Project Members</h2>
                <Button type="button" variant="outline" onClick={() => appendMember({ contact_id: "", designation_id: "" })}>
                  + Add Member
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="table-default w-full">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Member Name</th>
                      <th>Designation</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberFields.map((field, index) => (
                      <tr key={field.id}>
                        <td>{index + 1}</td>
                        <td>
                          <FormField
                            type="typeahead"
                            name={`members.${index}.contact_id`}
                            options={dummyContacts}
                            placeholder="Select Member"
                          />
                        </td>
                        <td>
                          <FormField
                            type="typeahead"
                            name={`members.${index}.designation_id`}
                            options={dummyDesignations}
                            placeholder="Select Designation"
                          />
                        </td>
                        <td>
                          <Button type="button" variant="outline" size="sm" onClick={() => removeMember(index)}>
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Phases Section */}
          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Project Phases</h2>
              <Button type="button" variant="outline" onClick={() => appendPhase({ phase_name: "", phase_description: "", budget: "" })}>
                + Add Phase
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <table className="table-default w-full">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Phase Name</th>
                    <th>Description</th>
                    <th>Budget (₹)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {phaseFields.map((field, index) => (
                    <tr key={field.id}>
                      <td>{index + 1}</td>
                      <td>
                        <FormField type="input" name={`phases.${index}.phase_name`} placeholder="Phase Name" />
                      </td>
                      <td>
                        <FormField type="input" name={`phases.${index}.phase_description`} placeholder="Description" />
                      </td>
                      <td>
                        <FormField type="input" name={`phases.${index}.budget`} placeholder="Budget" className="numbers-decimal" />
                      </td>
                      <td>
                        <Button type="button" variant="outline" size="sm" onClick={() => removePhase(index)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="border-t px-4 py-3 flex justify-end bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-700">Total Budget:</span>
                  <span className="font-bold text-lg">₹ {totalBudget.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="fixed bottom-0 left-68 w-[calc(100%-16rem)] bg-white border-t py-2 px-6 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
          <Button variant="default" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Project"}
          </Button>
        </footer>
      </form>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        loading={loading}
        title="Confirm Submission"
        message="Are you sure you want to add this project?"
      />
    </FormProvider>
  );
}