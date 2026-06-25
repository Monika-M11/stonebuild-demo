// "use client";

// import { useState, useMemo } from "react";
// import {
//   Users,
//   UserCheck,
//   UserX,
//   Search,
//   CalendarDays,
// } from "lucide-react";

// type Attendance = {
//   id: number;
//   employeeName: string;
//   department: string;
//   checkIn: string;
//   checkOut: string;
//   status: "Present" | "Absent";
// };

// const attendanceData: Attendance[] = [
//   {
//     id: 1,
//     employeeName: "John David",
//     department: "Sales",
//     checkIn: "09:00 AM",
//     checkOut: "06:00 PM",
//     status: "Present",
//   },
//   {
//     id: 2,
//     employeeName: "Sophia Thomas",
//     department: "Accounts",
//     checkIn: "08:55 AM",
//     checkOut: "06:05 PM",
//     status: "Present",
//   },
//   {
//     id: 3,
//     employeeName: "Michael Raj",
//     department: "Operations",
//     checkIn: "-",
//     checkOut: "-",
//     status: "Absent",
//   },
//   {
//     id: 4,
//     employeeName: "Priya Kumar",
//     department: "HR",
//     checkIn: "09:10 AM",
//     checkOut: "06:10 PM",
//     status: "Present",
//   },
//   {
//     id: 5,
//     employeeName: "Arun Prakash",
//     department: "Marketing",
//     checkIn: "-",
//     checkOut: "-",
//     status: "Absent",
//   },
//   {
//     id: 6,
//     employeeName: "Divya Sharma",
//     department: "Admin",
//     checkIn: "08:45 AM",
//     checkOut: "05:50 PM",
//     status: "Present",
//   },
//   {
//     id: 7,
//     employeeName: "Karthik Kumar",
//     department: "Production",
//     checkIn: "09:05 AM",
//     checkOut: "06:15 PM",
//     status: "Present",
//   },
//   {
//     id: 8,
//     employeeName: "Rahul Sharma",
//     department: "Finance",
//     checkIn: "-",
//     checkOut: "-",
//     status: "Absent",
//   },
// ];

// export default function AttendancePage() {
//   const [search, setSearch] = useState("");

//   const filteredEmployees = useMemo(() => {
//     return attendanceData.filter(
//       (item) =>
//         item.employeeName
//           .toLowerCase()
//           .includes(search.toLowerCase()) ||
//         item.department
//           .toLowerCase()
//           .includes(search.toLowerCase())
//     );
//   }, [search]);

//   const totalEmployees = attendanceData.length;

//   const presentCount = attendanceData.filter(
//     (item) => item.status === "Present"
//   ).length;

//   const absentCount = attendanceData.filter(
//     (item) => item.status === "Absent"
//   ).length;

//   const attendancePercentage = Math.round(
//     (presentCount / totalEmployees) * 100
//   );

//   return (
//     <div className="min-h-screen bg-slate-50 p-5">
//       {/* Header */}

//       <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-[#103BB5]">
//             Attendance
//           </h1>
//           <p className="text-gray-500">
//             Employee Attendance Overview
//           </p>
//         </div>

//         <div className="bg-white border rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
//           <CalendarDays size={18} />
//           <span>
//             {new Date().toLocaleDateString("en-GB")}
//           </span>
//         </div>
//       </div>

//       {/* Cards */}

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white rounded-xl border p-5 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 p-3 rounded-lg">
//               <Users className="text-[#103BB5]" />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Total Employees
//               </p>
//               <h2 className="text-3xl font-bold">
//                 {totalEmployees}
//               </h2>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border p-5 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="bg-green-100 p-3 rounded-lg">
//               <UserCheck className="text-green-600" />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Present
//               </p>
//               <h2 className="text-3xl font-bold text-green-600">
//                 {presentCount}
//               </h2>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border p-5 shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="bg-red-100 p-3 rounded-lg">
//               <UserX className="text-red-600" />
//             </div>

//             <div>
//               <p className="text-sm text-gray-500">
//                 Absent
//               </p>
//               <h2 className="text-3xl font-bold text-red-600">
//                 {absentCount}
//               </h2>
//             </div>
//           </div>
//         </div>

//         <div className="bg-[#103BB5] rounded-xl p-5 text-white">
//           <p className="text-sm opacity-80">
//             Attendance Rate
//           </p>

//           <h2 className="text-4xl font-bold">
//             {attendancePercentage}%
//           </h2>

//           <div className="mt-4 h-3 bg-white/20 rounded-full">
//             <div
//               className="h-3 bg-white rounded-full"
//               style={{
//                 width: `${attendancePercentage}%`,
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Search */}

//       <div className="bg-white rounded-xl border p-4 shadow-sm mb-6">
//         <div className="relative max-w-md">
//           <Search
//             size={18}
//             className="absolute left-3 top-3 text-gray-400"
//           />

//           <input
//             type="text"
//             placeholder="Search employee..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-[#103BB5]"
//           />
//         </div>
//       </div>

//       {/* Table */}

//       <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
//         <div className="overflow-auto">
//           <table className="table-default">
//             <thead>
//               <tr>
//                 <th className="text-center">#</th>
//                 <th>Employee</th>
//                 <th>Department</th>
//                 <th className="text-center">Check In</th>
//                 <th className="text-center">Check Out</th>
//                 <th className="text-center">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredEmployees.map((employee, index) => (
//                 <tr key={employee.id}>
//                   <td className="text-center">
//                     {index + 1}
//                   </td>

//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-full bg-[#103BB5] text-white flex items-center justify-center font-semibold">
//                         {employee.employeeName
//                           .split(" ")
//                           .map((word) => word[0])
//                           .join("")
//                           .slice(0, 2)}
//                       </div>

//                       <div>
//                         <div className="font-medium">
//                           {employee.employeeName}
//                         </div>

//                         <div className="text-xs text-gray-500">
//                           EMP-{employee.id
//                             .toString()
//                             .padStart(4, "0")}
//                         </div>
//                       </div>
//                     </div>
//                   </td>

//                   <td>{employee.department}</td>

//                   <td className="text-center">
//                     {employee.checkIn}
//                   </td>

//                   <td className="text-center">
//                     {employee.checkOut}
//                   </td>

//                   <td className="text-center">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         employee.status === "Present"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {employee.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}

//               {filteredEmployees.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="text-center py-10 text-gray-500"
//                   >
//                     No employees found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

//API
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

import { postAPI } from "@/app/utils/api";
import toast from "react-hot-toast";

type Attendance = {
  id: number | string;
  employeeName: string;
  department: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent";
  created_at?: string;
};

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // ==================== FETCH ATTENDANCE ====================
  const fetchAttendance = useCallback(async () => {
    setLoading(true);
    try {
      const response = await postAPI("ATTENDANCE_LIST", {}, true); // Add this endpoint in api.ts

      if (response.status === "success" && Array.isArray(response.data)) {
        setAttendanceData(response.data);
        toast.success("Attendance loaded successfully");
      } else {
        toast.error(response.message || "Failed to load attendance");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAttendance();
  }, [fetchAttendance]);

  const filteredEmployees = useMemo(() => {
    return attendanceData.filter(
      (item) =>
        item.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase())
    );
  }, [attendanceData, search]);

  const totalEmployees = attendanceData.length;
  const presentCount = attendanceData.filter((item) => item.status === "Present").length;
  const absentCount = attendanceData.filter((item) => item.status === "Absent").length;
  const attendancePercentage = totalEmployees > 0 
    ? Math.round((presentCount / totalEmployees) * 100) 
    : 0;

  const handleRefresh = () => {
    fetchAttendance();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#103BB5]">Attendance</h1>
          <p className="text-gray-500">Employee Attendance Overview</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm">
            <CalendarDays size={18} />
            <span>{new Date().toLocaleDateString("en-GB")}</span>
          </div>

          <Button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-[#103BB5]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <h2 className="text-3xl font-bold">{totalEmployees}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Present</p>
              <h2 className="text-3xl font-bold text-green-600">{presentCount}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <UserX className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Absent</p>
              <h2 className="text-3xl font-bold text-red-600">{absentCount}</h2>
            </div>
          </div>
        </div>

        <div className="bg-[#103BB5] rounded-xl p-5 text-white">
          <p className="text-sm opacity-80">Attendance Rate</p>
          <h2 className="text-4xl font-bold">{attendancePercentage}%</h2>
          <div className="mt-4 h-3 bg-white/20 rounded-full">
            <div
              className="h-3 bg-white rounded-full transition-all"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border p-4 shadow-sm mb-6">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search employee or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-[#103BB5]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-auto">
          <table className="table-default w-full">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th>Employee</th>
                <th>Department</th>
                <th className="text-center">Check In</th>
                <th className="text-center">Check Out</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading && attendanceData.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    Loading attendance...
                  </td>
                </tr>
              )}

              {filteredEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td className="text-center">{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#103BB5] text-white flex items-center justify-center font-semibold">
                        {employee.employeeName
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium">{employee.employeeName}</div>
                        <div className="text-xs text-gray-500">
                          EMP-{String(employee.id).padStart(4, "0")}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{employee.department}</td>

                  <td className="text-center">{employee.checkIn}</td>
                  <td className="text-center">{employee.checkOut}</td>

                  <td className="text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        employee.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}

              {!loading && filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-gray-500">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}