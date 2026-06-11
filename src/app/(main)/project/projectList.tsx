//  "use client";
// import { useEffect, useState, useCallback, useRef } from "react";
// import { postRequest } from "../utils/api";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import BigModal from "../utils/BigModal";
// import SimpleTabs from "../utils/tabs";

// // tab components
// import TransactionsTab from "../project-tabs/transactions";
// import MaterialsTab from "../project-tabs/materials";
// import EquipmentsTab from "../project-tabs/equipments";
// import AttendanceTab from "../project-tabs/attendance";
// import TasksTab from "../project-tabs/tasks";
// import FilesTab from "../project-tabs/files";

// type Project = {
//   id: string;
//   project_name: string;
//   project_address: string;
//   start_date: string;
//   end_date: string;
//   created_at: string;
// };

// export default function ProjectList() {
//   const LIMIT = 10;

//   const [projectList, setProjectList] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingMore, setFetchingMore] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);

//   const observer = useRef<IntersectionObserver | null>(null);
//   const didInitialFetchRef = useRef(false);

//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
// const [isModalOpen, setIsModalOpen] = useState(false);

// const handleRowClick = (project: Project) => {
//   setSelectedProject(project);
//   setIsModalOpen(true);
// };

//   const fetchProjects = useCallback(
//     async (opts: { offset?: number; limit?: number; reset?: boolean } = {}) => {
//       const off = typeof opts.offset === "number" ? opts.offset : offset;
//       const lim = opts.limit ?? LIMIT;
//       const resetFlag = opts.reset ?? false;

//       try {
//         if (resetFlag) {
//           setLoading(true);
//         } else {
//           setFetchingMore(true);
//         }

//         const res = await postRequest({
//           token: "getProjects", // 🔴 changed from getWarehouses
//           data: { offset: off, limit: lim },
//         });

//         if (res && res.success && Array.isArray(res.data)) {
//           if (resetFlag) {
//             setProjectList(res.data);
//             setOffset(off + res.data.length);
//             setHasMore(res.data.length === lim);
//           } else {
//             setProjectList((prev) => {
//               const existingIds = new Set(prev.map((p) => p.id));
//               const newItems = res.data.filter(
//                 (r: Project) => !existingIds.has(r.id)
//               );
//               const next = [...prev, ...newItems];

//               setOffset(off + newItems.length);

//               if (typeof res.meta?.has_more === "boolean") {
//                 setHasMore(res.meta.has_more);
//               } else {
//                 setHasMore(newItems.length === lim);
//               }

//               return next;
//             });
//           }
//         } else {
//           if (resetFlag) setProjectList([]);
//           setHasMore(false);
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to fetch projects ❌");
//       } finally {
//         setLoading(false);
//         setFetchingMore(false);
//       }
//     },
//     [offset]
//   );

//   // initial load (guarded)
//   useEffect(() => {
//     if (didInitialFetchRef.current) return;
//     didInitialFetchRef.current = true;

//     setOffset(0);
//     setHasMore(true);
//     fetchProjects({ offset: 0, limit: LIMIT, reset: true });
//   }, [fetchProjects]);

//   // Intersection observer callback - when last row visible, fetch next page
//   const lastRowRef = useCallback(
//     (node: HTMLElement | null) => {
//       if (fetchingMore) return;
//       if (observer.current) {
//         observer.current.disconnect();
//       }

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore && !loading && !fetchingMore) {
//           fetchProjects({ offset, limit: LIMIT });
//         }
//       });

//       if (node) observer.current.observe(node);
//     },
//     [fetchProjects, hasMore, offset, loading, fetchingMore]
//   );

//   // manual refresh
//   const handleRefresh = () => {
//     setOffset(0);
//     setHasMore(true);
//     fetchProjects({ offset: 0, limit: LIMIT, reset: true });
//   };

//   return (
//     <div className="bg-white p-6">
//       <div className="flex justify-between items-center mb-4">
//         <Button
//           onClick={handleRefresh}
//           variant="default"
//           disabled={loading || fetchingMore}
//         >
//           {loading ? "Refreshing..." : "↻ Refresh"}
//         </Button>
//       </div>

//       <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
//         <table className="table-default w-full">
//           <thead className="sticky top-0 z-10 bg-white">
//             <tr>
//               <th className="text-center">S.no</th>
//               <th>Project Name</th>
//               <th>Address</th>
//               <th className="text-center">Start Date</th>
//               <th className="text-center">End Date</th>
//               <th className="text-center">Created At</th>
//             </tr>
//           </thead>

//           <tbody>
//             {projectList.length === 0 && !loading && (
//               <tr>
//                 <td colSpan={6} className="text-center py-4 text-gray-500">
//                   No projects found
//                 </td>
//               </tr>
//             )}

//             {projectList.map((item, idx) => {
//               const isLast = idx === projectList.length - 1;
//               return (
//                 <tr
//                   key={`${item.id}-${idx}`}
//                   className="border-b"
//                   ref={isLast ? lastRowRef : null}
//                       onClick={() => handleRowClick(item)}
//                 >
//                   <td className="text-center">{idx + 1}</td>
//                   <td>{item.project_name}</td>
//                   <td>{item.project_address}</td>
//                   <td className="text-center">{item.start_date || "-"}</td>
//                   <td className="text-center">{item.end_date || "-"}</td>
//                   <td className="text-center">{item.created_at}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {/* Loading indicator for fetching more */}
//         {fetchingMore && (
//           <div className="p-3 text-center text-sm text-gray-600">
//             Loading more...
//           </div>
//         )}

//         {/* End message */}
//         {!hasMore && projectList.length > 0 && (
//           <div className="p-3 text-center text-sm text-gray-600">
//             No more projects
//           </div>
//         )}
//       </div>
//       <BigModal
//   open={isModalOpen}
//   onClose={() => setIsModalOpen(false)}
//   title={selectedProject?.project_name || "Project"}
// >
//   {selectedProject && (
//     <SimpleTabs
//       tabs={[
//         {
//           key: "transactions",
//           label: "Transactions",
//           content: (
//             <TransactionsTab
//               projectId={selectedProject.id}
//               projectName={selectedProject.project_name}
//             />
//           ),
//         },
//         {
//           key: "materials",
//           label: "Material",
//           content: (
//             <MaterialsTab
//               projectId={selectedProject.id}
//               projectName={selectedProject.project_name}
//             />
//           ),
//         },
//         {
//           key: "equipment",
//           label: "Equipment",
//           content: (
//             <EquipmentsTab
//               projectId={selectedProject.id}
//               projectName={selectedProject.project_name}
//             />
//           ),
//         },
//         {
//           key: "attendance",
//           label: "Attendance",
//           content: (
//             <AttendanceTab
//               projectId={selectedProject.id}
//               projectName={selectedProject.project_name}
//             />
//           ),
//         },
//         {
//           key: "tasks",
//           label: "Task",
//           content: (
//             <TasksTab
//               projectId={selectedProject.id}
//               projectName={selectedProject.project_name}
//             />
//           ),
//         },
//         {
//           key: "files",
//           label: "Files",
//           content: (
//             <FilesTab
//               projectId={selectedProject.id}
//               projectName={selectedProject.project_name}
//             />
//           ),
//         },
//       ]}
//     />
//   )}
// </BigModal>

//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import BigModal from "@/app/utils/BigModal";
import SimpleTabs from "@/app/utils/tabs";

// Tab Components
import TransactionsTab from "../project-tabs/transactions";
import MaterialsTab from "../project-tabs/materials";
import EquipmentsTab from "../project-tabs/equipments";
import AttendanceTab from "../project-tabs/attendance";
import TasksTab from "../project-tabs/tasks";
import FilesTab from "../project-tabs/files";

type Project = {
  id: string;
  project_name: string;
  project_address: string;
  start_date: string;
  end_date: string;
  created_at: string;
};

const dummyProjects: Project[] = [
  { id: "P001", project_name: "Villa Garden Project", project_address: "123 MG Road, Chennai", start_date: "2025-06-01", end_date: "2025-12-15", created_at: "2025-06-01" },
  { id: "P002", project_name: "Luxury Apartment Complex", project_address: "45 Brigade Road, Bangalore", start_date: "2025-06-05", end_date: "2026-01-20", created_at: "2025-06-05" },
  { id: "P003", project_name: "Modern Villa - Phase 1", project_address: "78 Anna Nagar, Chennai", start_date: "2025-06-10", end_date: "2025-11-30", created_at: "2025-06-10" },
];

export default function ProjectList() {
  const [projectList] = useState<Project[]>(dummyProjects);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      toast.success("Project list refreshed successfully");
      setLoading(false);
    }, 600);
  };

  const handleRowClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="max-h-[calc(100vh-230px)] overflow-y-auto border rounded-lg">
        <table className="table-default w-full">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <th className="text-center">S.no</th>
              <th>Project Name</th>
              <th>Address</th>
              <th className="text-center">Start Date</th>
              <th className="text-center">End Date</th>
              <th className="text-center">Created At</th>
            </tr>
          </thead>
          <tbody>
            {projectList.map((item, idx) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(item)}
              >
                <td className="text-center">{idx + 1}</td>
                <td className="font-medium">{item.project_name}</td>
                <td className="max-w-xs truncate">{item.project_address}</td>
                <td className="text-center">{item.start_date}</td>
                <td className="text-center">{item.end_date}</td>
                <td className="text-center">
                  {new Date(item.created_at).toLocaleDateString("en-GB")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Big Modal with Tabs */}
      <BigModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProject?.project_name || "Project Details"}
      >
        {selectedProject && (
          <SimpleTabs
            tabs={[
              { 
                key: "transactions", 
                label: "Transactions", 
                content: <TransactionsTab projectId={selectedProject.id} projectName={selectedProject.project_name} /> 
              },
              { 
                key: "materials", 
                label: "Materials", 
                content: <MaterialsTab projectId={selectedProject.id} projectName={selectedProject.project_name} /> 
              },
              { 
                key: "equipment", 
                label: "Equipment", 
                content: <EquipmentsTab projectId={selectedProject.id} projectName={selectedProject.project_name} /> 
              },
              { 
                key: "attendance", 
                label: "Attendance", 
                content: <AttendanceTab projectId={selectedProject.id} projectName={selectedProject.project_name} /> 
              },
              { 
                key: "tasks", 
                label: "Tasks", 
                content: <TasksTab projectId={selectedProject.id} projectName={selectedProject.project_name} /> 
              },
              { 
                key: "files", 
                label: "Files", 
                content: <FilesTab projectId={selectedProject.id} projectName={selectedProject.project_name} /> 
              },
            ]}
          />
        )}
      </BigModal>
    </div>
  );
}