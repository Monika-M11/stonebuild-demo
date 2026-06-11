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


"use client";

import { useState, useMemo } from "react";
import { Users, UserCheck, UserX, Search, CalendarDays } from "lucide-react";

type Attendance = {
  id: number;
  employeeName: string;
  department: string;
  checkIn: string;
  checkOut: string;
  status: "Present" | "Absent";
};

const dummyAttendance: Attendance[] = [
  { id: 1, employeeName: "John David", department: "Sales", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "Present" },
  { id: 2, employeeName: "Sophia Thomas", department: "Accounts", checkIn: "08:55 AM", checkOut: "06:05 PM", status: "Present" },
  { id: 3, employeeName: "Michael Raj", department: "Operations", checkIn: "-", checkOut: "-", status: "Absent" },
  { id: 4, employeeName: "Priya Kumar", department: "HR", checkIn: "09:10 AM", checkOut: "06:10 PM", status: "Present" },
  { id: 5, employeeName: "Arun Prakash", department: "Marketing", checkIn: "-", checkOut: "-", status: "Absent" },
  { id: 6, employeeName: "Divya Sharma", department: "Admin", checkIn: "08:45 AM", checkOut: "05:50 PM", status: "Present" },
  { id: 7, employeeName: "Karthik Kumar", department: "Production", checkIn: "09:05 AM", checkOut: "06:15 PM", status: "Present" },
  { id: 8, employeeName: "Rahul Sharma", department: "Finance", checkIn: "-", checkOut: "-", status: "Absent" },
  { id: 9, employeeName: "Meena Iyer", department: "Design", checkIn: "09:15 AM", checkOut: "06:20 PM", status: "Present" },
  { id: 10, employeeName: "Vikram Singh", department: "Site Supervisor", checkIn: "08:30 AM", checkOut: "05:45 PM", status: "Present" },
];

type AttendanceTabProps = {
  projectId: string;
  projectName: string;
};

export default function AttendanceTab({ projectId, projectName }: AttendanceTabProps) {
  const [search, setSearch] = useState("");

  const filteredEmployees = useMemo(() => {
    return dummyAttendance.filter(
      (item) =>
        item.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        item.department.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalEmployees = dummyAttendance.length;
  const presentCount = dummyAttendance.filter((item) => item.status === "Present").length;
  const absentCount = dummyAttendance.filter((item) => item.status === "Absent").length;
  const attendancePercentage = Math.round((presentCount / totalEmployees) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#103BB5]">{projectName}</h2>
          <p className="text-gray-500">Attendance Overview</p>
        </div>

        <div className="bg-white border rounded-lg px-4 py-2 flex items-center gap-2 text-sm">
          <CalendarDays size={18} />
          <span>{new Date().toLocaleDateString("en-GB")}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-[#103BB5]" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Workers</p>
              <h2 className="text-3xl font-bold">{totalEmployees}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Present Today</p>
              <h2 className="text-3xl font-bold text-green-600">{presentCount}</h2>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <UserX className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Absent Today</p>
              <h2 className="text-3xl font-bold text-red-600">{absentCount}</h2>
            </div>
          </div>
        </div>

        <div className="bg-[#103BB5] text-white rounded-xl p-5">
          <p className="text-sm opacity-80">Attendance Rate</p>
          <h2 className="text-4xl font-bold mt-1">{attendancePercentage}%</h2>
          <div className="mt-4 h-3 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-3 bg-white rounded-full transition-all"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search employee or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#103BB5]"
          />
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="table-default w-full">
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th className="text-center">Check In</th>
              <th className="text-center">Check Out</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={employee.id} className="border-t hover:bg-gray-50">
                <td className="text-center">{index + 1}</td>
                <td>
                  <div className="font-medium">{employee.employeeName}</div>
                </td>
                <td className="text-gray-600">{employee.department}</td>
                <td className="text-center font-medium">{employee.checkIn}</td>
                <td className="text-center font-medium">{employee.checkOut}</td>
                <td className="text-center">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-medium ${
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

            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}