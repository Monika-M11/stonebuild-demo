//  "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { postRequest } from "../utils/api";
// import toast from "react-hot-toast";

// export default function TasksTab({ projectId }: any) {
//   const [tasks, setTasks] = useState<any[]>([]);
//   const [title, setTitle] = useState("");

//   const fetchTasks = async () => {
//     const res = await postRequest({
//       token: "getTasks",
//       data: { project_id: projectId },
//     });
//     if (res.success) setTasks(res.data);
//   };

//   const addTask = async () => {
//     if (!title) return;
//     await postRequest({
//       token: "addTask",
//       data: {
//         project_id: projectId,
//         task_title: title,
//         assigned_to: null,
//         due_date: null,
//       },
//     });
//     setTitle("");
//     fetchTasks();
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="space-y-4">
//       <div className="flex gap-3">
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="input"
//           placeholder="New task"
//         />
//         <Button onClick={addTask}>Add</Button>
//       </div>

//       <table className="table-default w-full">
//         <thead>
//           <tr>
//             <th>Task</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((t) => (
//             <tr key={t.id}>
//               <td>{t.task_title}</td>
//               <td className="capitalize">{t.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { FormField } from "@/app/utils/dynamicField";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";

type FormValues = {
  task_name: string;
  assigned_to: string;
  due_date: string;
  priority: string;
};

const dummyTasks = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  task_name: ["Foundation Work", "Plumbing", "Electrical Wiring", "Painting", "Flooring", "Roofing", "Door Installation"][i % 7],
  assigned_to: ["John", "Priya", "Rahul", "Meena", "Arun"][i % 5],
  due_date: `2025-07-${String(5 + i).padStart(2, '0')}`,
  priority: i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low",
}));

type Props = { projectId: string; projectName: string };

export default function TasksTab({ projectName }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: { task_name: "", assigned_to: "", due_date: "", priority: "Medium" },
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
    showToast("Task added successfully ✅");
    methods.reset();
    setLoading(false);
  };

  return (
    <FormProvider {...methods}>
      {toast && <Toaster message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Add New Task - {projectName}</h3>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1 block">Task Name</label><FormField type="input" name="task_name" /></div>
            <div><label className="text-sm font-medium mb-1 block">Assigned To</label><FormField type="input" name="assigned_to" /></div>
            <div><label className="text-sm font-medium mb-1 block">Due Date</label><FormField type="datepicker" name="due_date" /></div>
            <div><label className="text-sm font-medium mb-1 block">Priority</label><FormField type="typeahead" name="priority" options={[{label:"High", value:"High"}, {label:"Medium", value:"Medium"}, {label:"Low", value:"Low"}]} /></div>

            <div className="md:col-span-2">
              <Button type="submit" disabled={loading} className="w-full">{loading ? "Adding..." : "Add Task"}</Button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Project Tasks</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="table-default w-full">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Assigned To</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {dummyTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.task_name}</td>
                    <td>{task.assigned_to}</td>
                    <td>{task.due_date}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs ${task.priority === "High" ? "bg-red-100 text-red-700" : task.priority === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                        {task.priority}
                      </span>
                    </td>
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