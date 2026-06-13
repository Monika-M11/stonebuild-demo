"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Filter } from "lucide-react";
import toast from "react-hot-toast";
  // Adjust path if needed

type HelpForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function SupportPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HelpForm>();

//   const onSubmit: SubmitHandler<HelpForm> = async (formData) => {
//     try {
//       const res = await postRequest({
//         token: "submitHelpQuery",        // Change token if your backend uses different one
//         data: formData,
//       });

//       if (res.success) {
//         toast.success("Your query has been submitted successfully! We'll get back to you soon.");
//         reset();
//       } else {
//         toast.error(res.message || "Failed to submit query");
//       }
//     } catch (error: any) {
//       toast.error(error.message || "Something went wrong. Please try again.");
//     }
//   };

  const handleRefresh = () => {
    toast.success("Page refreshed");
    // You can add any refresh logic here if needed
  };

  return (
    <div className="bg-white p-6 min-h-screen">
      {/* Header with buttons on right - Consistent with LeadList */}
      <div className="flex justify-between items-center mb-6">
      

        
      </div>

      <div className="max-w-4xl mx-auto">
        <p className="mb-6 text-gray-700">
          Welcome to the Support Center. Get help with your queries, track issues, or contact our team directly.
        </p>

        {/* Common Topics */}
        <div className="bg-gray-50 p-6 rounded-xl mb-8 border">
          <h2 className="font-semibold text-lg mb-4">Common Topics</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>How to add and manage new leads</li>
            <li>Understanding lead statuses and follow-ups</li>
            <li>Troubleshooting login or access issues</li>
            <li>How to export leads or generate reports</li>
            <li>Updating your profile and user permissions</li>
            <li>Billing and subscription related queries</li>
          </ul>

          <p className="mt-6 text-gray-700">
            Can&apos;t find what you&apos;re looking for? Use the form below to reach our support team.
            We typically respond within 24 hours.
          </p>
        </div>

        {/* Contact Support Form */}
        <div className="bg-white border rounded-xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-6">Submit a Support Request</h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Your Name</label>
                <Input
                  placeholder="Enter your full name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Subject</label>
              <Input
                placeholder="Brief subject of your query"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Message</label>
              <textarea
                placeholder="Please describe your issue or question in detail..."
                rows={6}
                className="w-full rounded-md border border-input bg-background px-3 py-3 text-sm focus-visible:ring-2 focus-visible:ring-[#103BB5]"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#103BB5] hover:bg-[#0f2e8a] px-8"
              >
                {isSubmitting ? "Sending Request..." : "Send Support Request"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}