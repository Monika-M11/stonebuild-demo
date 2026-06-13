"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ConfirmModal from "@/app/utils/confirmationModal";
import { Toaster } from "@/components/ui/toaster";

type FormValues = {
  customer_name: string;
  company_name: string;
  contact_person: string;
  mobile_number: string;
  alternate_mobile_number: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gst_number: string;
  lead_date: string;
  lead_source: string;
  lead_status: string;
};

export default function LeadForm() {
  const methods = useForm<FormValues>({
    defaultValues: {
      customer_name: "",
      company_name: "",
      contact_person: "",
      mobile_number: "",
      alternate_mobile_number: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      gst_number: "",
      lead_date: new Date().toISOString().split("T")[0],
      lead_source: "",
      lead_status: "",
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
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      showToast("Lead added successfully ✅");
      methods.reset({
        lead_date: new Date().toISOString().split("T")[0],
        lead_source: "",
        lead_status: "",
      });
    } catch (err) {
      showToast("Something went wrong ❌", "error");
    } finally {
      setLoading(false);
      setShowConfirm(false);
      setFormData(null);
    }
  };

  const handleCancel = () => {
    methods.reset({
      lead_date: new Date().toISOString().split("T")[0],
    });
    setFormData(null);
    setShowConfirm(false);
  };

  // Static Dummy Options (since no API)
  const leadSources = [
    { label: "Website", value: "website" },
    { label: "Referral", value: "referral" },
    { label: "Call", value: "call" },
    { label: "Social Media", value: "social_media" },
    { label: "Walk-in", value: "walkin" },
    { label: "Advertisement", value: "advertisement" },
  ];

  const leadStatuses = [
    { label: "New", value: "new" },
    { label: "Contacted", value: "contacted" },
    { label: "Follow Up", value: "follow_up" },
    { label: "Interested", value: "interested" },
    { label: "Not Interested", value: "not_interested" },
    { label: "Converted", value: "converted" },
  ];

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
      <label className="w-1/3 font-medium text-gray-700 text-[15px]">
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

      <div className="bg-white p-6">
        {/* <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Add New Lead</h1>
        </div> */}

        <form
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className="max-w-5xl"
        >
          <div className="bg-gray-50 border rounded-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Customer Details */}
              <div>
                <h2 className="text-lg font-semibold mb-5 border-b pb-2 text-[#103BB5]">
                  Customer Details
                </h2>
                <div className="space-y-5">
                  <Row label="Customer Name" required>
                    <FormField
                      type="input"
                      name="customer_name"
                      placeholder="Enter Customer Name"
                      validation={{ required: "Customer Name is required" }}
                    />
                  </Row>

                  <Row label="Company Name">
                    <FormField
                      type="input"
                      name="company_name"
                      placeholder="Enter Company Name"
                    />
                  </Row>

                  <Row label="Contact Person" required>
                    <FormField
                      type="input"
                      name="contact_person"
                      placeholder="Enter Contact Person"
                      validation={{ required: "Contact Person is required" }}
                    />
                  </Row>

                  <Row label="Mobile Number" required>
                    <FormField
                      type="input"
                      name="mobile_number"
                      placeholder="Enter Mobile Number"
                      className="only-number no-space limit-10"
                      validation={{ required: "Mobile Number is required" }}
                    />
                  </Row>

                  <Row label="Alternate Mobile">
                    <FormField
                      type="input"
                      name="alternate_mobile_number"
                      placeholder="Enter Alternate Mobile"
                      className="only-number no-space limit-10"
                    />
                  </Row>

                  <Row label="Email">
                    <FormField type="input" name="email" placeholder="Enter Email" />
                  </Row>

                  <Row label="Address">
                    <FormField
                      type="textarea"
                      name="address"
                      placeholder="Enter Full Address"
                    />
                  </Row>

                  <Row label="City">
                    <FormField type="input" name="city" placeholder="Enter City" />
                  </Row>

                  <Row label="State">
                    <FormField type="input" name="state" placeholder="Enter State" />
                  </Row>

                  <Row label="Pincode">
                    <FormField
                      type="input"
                      name="pincode"
                      placeholder="Enter Pincode"
                      className="only-number no-space limit-6"
                    />
                  </Row>

                  <Row label="GST Number">
                    <FormField
                      type="input"
                      name="gst_number"
                      placeholder="Enter GST Number"
                      className="uppercase"
                    />
                  </Row>
                </div>
              </div>

              {/* Lead Information */}
              <div>
                <h2 className="text-lg font-semibold mb-5 border-b pb-2 text-[#103BB5]">
                  Lead Information
                </h2>
                <div className="space-y-5">
                  <Row label="Lead Date" required>
                    <FormField
                      type="datepicker"
                      name="lead_date"
                      validation={{ required: "Lead Date is required" }}
                    />
                  </Row>

                  <Row label="Lead Source" required>
                    <FormField
                      type="select"
                      name="lead_source"
                      placeholder="Select Lead Source"
                      options={leadSources}
                      validation={{ required: "Lead Source is required" }}
                    />
                  </Row>

                  <Row label="Lead Status" required>
                    <FormField
                      type="select"
                      name="lead_status"
                      placeholder="Select Lead Status"
                      options={leadStatuses}
                      validation={{ required: "Lead Status is required" }}
                    />
                  </Row>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              variant="default"
              type="submit"
              disabled={loading}
              className="bg-[#103BB5] hover:bg-[#0f2e8a] px-8"
            >
              {loading ? "Submitting..." : "Submit Lead"}
            </Button>
          </div>
        </form>
      </div>

      <ConfirmModal
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmSubmit}
        loading={loading}
        title="Confirm Submission"
        message="Are you sure you want to add this lead?"
      />
    </FormProvider>
  );
}