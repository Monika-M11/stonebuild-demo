"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

type FormValues = {
  file_name: string;
  file_type: string;
  description: string;
};

const fileTypeOptions = [
  { label: "Drawing", value: "Drawing" },
  { label: "Contract", value: "Contract" },
  { label: "Photo", value: "Photo" },
  { label: "Report", value: "Report" },
  { label: "Bill", value: "Bill" },
];

const dummyFiles = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  file_name: `Drawing_${String(i+1).padStart(2,'0')}.pdf`,
  file_type: ["Drawing", "Contract", "Photo", "Report", "Bill"][i % 5],
  description: "Uploaded on site",
  upload_date: `2025-06-${String(1 + i).padStart(2, '0')}`,
}));

type Props = { projectId: string; projectName: string };

export default function FilesTab({ projectName }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: { file_name: "", file_type: "", description: "" },
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
    showToast("File uploaded successfully ✅");
    methods.reset();
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Upload Document - {projectName}</h3>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">File Name</label>
              <FormField type="input" name="file_name" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">File Type</label>
              <FormField
                type="typeahead"
                name="file_type"
                placeholder="Select file type"
                options={fileTypeOptions}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-1 block">Description</label>
              <FormField type="textarea" name="description" />
            </div>

            <div className="md:col-span-2">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Uploading..." : "Upload File"}
              </Button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Project Documents</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="table-default w-full">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Upload Date</th>
                </tr>
              </thead>
              <tbody>
                {dummyFiles.map((file) => (
                  <tr key={file.id}>
                    <td>{file.file_name}</td>
                    <td>{file.file_type}</td>
                    <td>{file.description}</td>
                    <td>{file.upload_date}</td>
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