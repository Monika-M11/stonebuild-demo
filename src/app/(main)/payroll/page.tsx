"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Filter, X, RefreshCw, Plus } from "lucide-react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Toaster } from "@/components/ui/toaster";

type Payroll = {
  id: string;
  payroll_id: string;
  employee_name: string;
  employee_id: string;
  department: string;
  role: string;
  basic_salary: number;
  deductions: number;
  net_salary: number;
  pay_date: string;
  status: "Paid" | "Pending" | "Processed";
};

type PayrollForm = {
  employee_name: string;
  employee_id: string;
  department: string;
  role: string;
  basic_salary: number;
  deductions: number;
  pay_date: string;
  status: string;
};

const dummyPayroll: Payroll[] = [
  { id: "1", payroll_id: "PR-2025-001", employee_name: "Ramesh Kumar", employee_id: "EMP001", department: "Construction", role: "Site Supervisor", basic_salary: 45000, deductions: 4500, net_salary: 40500, pay_date: "2025-07-01", status: "Paid" },
  { id: "2", payroll_id: "PR-2025-002", employee_name: "Priya Sharma", employee_id: "EMP002", department: "Accounts", role: "Accountant", basic_salary: 38000, deductions: 3800, net_salary: 34200, pay_date: "2025-07-01", status: "Paid" },
  { id: "3", payroll_id: "PR-2025-003", employee_name: "Suresh Babu", employee_id: "EMP003", department: "Construction", role: "Mason", basic_salary: 28000, deductions: 2800, net_salary: 25200, pay_date: "2025-07-01", status: "Pending" },
  { id: "4", payroll_id: "PR-2025-004", employee_name: "Lakshmi Narayanan", employee_id: "EMP004", department: "HR", role: "HR Executive", basic_salary: 42000, deductions: 4200, net_salary: 37800, pay_date: "2025-07-01", status: "Paid" },
  { id: "5", payroll_id: "PR-2025-005", employee_name: "Vijay Kumar", employee_id: "EMP005", department: "Construction", role: "Electrician", basic_salary: 32000, deductions: 3200, net_salary: 28800, pay_date: "2025-07-01", status: "Processed" },
  { id: "6", payroll_id: "PR-2025-006", employee_name: "Anitha Reddy", employee_id: "EMP006", department: "Admin", role: "Office Assistant", basic_salary: 25000, deductions: 2500, net_salary: 22500, pay_date: "2025-07-01", status: "Paid" },
  { id: "7", payroll_id: "PR-2025-007", employee_name: "Manoj Patel", employee_id: "EMP007", department: "Construction", role: "Welder", basic_salary: 30000, deductions: 3000, net_salary: 27000, pay_date: "2025-07-01", status: "Pending" },
  { id: "8", payroll_id: "PR-2025-008", employee_name: "Geetha Menon", employee_id: "EMP008", department: "Finance", role: "Finance Manager", basic_salary: 65000, deductions: 6500, net_salary: 58500, pay_date: "2025-07-01", status: "Paid" },
  { id: "9", payroll_id: "PR-2025-009", employee_name: "Karthik Rao", employee_id: "EMP009", department: "Construction", role: "Plumber", basic_salary: 27000, deductions: 2700, net_salary: 24300, pay_date: "2025-07-01", status: "Processed" },
  { id: "10", payroll_id: "PR-2025-010", employee_name: "Sneha Iyer", employee_id: "EMP010", department: "Marketing", role: "Marketing Executive", basic_salary: 35000, deductions: 3500, net_salary: 31500, pay_date: "2025-07-01", status: "Paid" },
];

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState<Payroll[]>(dummyPayroll);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const methods = useForm<PayrollForm>({
    defaultValues: {
      employee_name: "",
      employee_id: "",
      department: "",
      role: "",
      basic_salary: 0,
      deductions: 0,
      pay_date: new Date().toISOString().split("T")[0],
      status: "Pending",
    },
  });

  const filteredPayrolls = useMemo(() => {
    return payrolls; // You can add filter logic later if needed
  }, [payrolls]);

  // const handleRefresh = () => {
  //   toast.success("Payroll list refreshed successfully");
  // };

  const onSubmit: SubmitHandler<PayrollForm> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 700));

    const netSalary = data.basic_salary - data.deductions;

    const newPayroll: Payroll = {
      id: (payrolls.length + 1).toString(),
      payroll_id: `PR-2025-${String(payrolls.length + 1).padStart(3, '0')}`,
      employee_name: data.employee_name,
      employee_id: data.employee_id,
      department: data.department,
      role: data.role,
      basic_salary: data.basic_salary,
      deductions: data.deductions,
      net_salary: netSalary,
      pay_date: data.pay_date,
      status: data.status as "Paid" | "Pending" | "Processed",
    };

    setPayrolls(prev => [newPayroll, ...prev]);
    setShowModal(false);
    methods.reset();

    setToastMsg({ message: "Payroll entry added successfully ✅", type: "success" });
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="bg-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800"></h1>

        <div className="flex items-center gap-3">
          <Button className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>

          <Button onClick={() => setShowFilters(true)} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white">
            <Filter className="h-4 w-4" />
            Filter
          </Button>

          <Button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-[#103BB5] hover:bg-[#0f2e8a] text-white">
            <Plus className="h-4 w-4" />
            New Payroll
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto border rounded-lg">
        <table className="table-default w-full">
          <thead className="sticky top-0 z-10 bg-white">
            <tr>
              <th className="text-center">S.no</th>
              <th>Payroll ID</th>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Role</th>
              <th className="text-right">Basic Salary (₹)</th>
              <th className="text-right">Deductions (₹)</th>
              <th className="text-right">Net Salary (₹)</th>
              <th>Pay Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayrolls.length === 0 && (
              <tr><td colSpan={11} className="text-center py-8 text-gray-500">No payroll records found</td></tr>
            )}
            {filteredPayrolls.map((item, idx) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="text-center">{idx + 1}</td>
                <td className="font-mono">{item.payroll_id}</td>
                <td className="font-medium">{item.employee_name}</td>
                <td>{item.employee_id}</td>
                <td>{item.department}</td>
                <td>{item.role}</td>
                <td className="text-right">₹{item.basic_salary.toLocaleString("en-IN")}</td>
                <td className="text-right text-red-600">- ₹{item.deductions.toLocaleString("en-IN")}</td>
                <td className="text-right font-semibold">₹{item.net_salary.toLocaleString("en-IN")}</td>
                <td>{new Date(item.pay_date).toLocaleDateString("en-GB")}</td>
                <td className="text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "Paid" ? "bg-green-100 text-green-700" :
                    item.status === "Processed" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Payroll Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Add New Payroll Entry</h2>
                  <Button type="button" variant="ghost" onClick={() => setShowModal(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Employee Name</label>
                    <input {...methods.register("employee_name", { required: true })} className="w-full border rounded-md px-3 py-2" placeholder="Enter employee name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Employee ID</label>
                    <input {...methods.register("employee_id", { required: true })} className="w-full border rounded-md px-3 py-2" placeholder="EMP001" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Department</label>
                    <input {...methods.register("department")} className="w-full border rounded-md px-3 py-2" placeholder="Construction / Accounts etc." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Role / Position</label>
                    <input {...methods.register("role")} className="w-full border rounded-md px-3 py-2" placeholder="Site Supervisor" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Basic Salary (₹)</label>
                    <input type="number" {...methods.register("basic_salary", { required: true, valueAsNumber: true })} className="w-full border rounded-md px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Deductions (₹)</label>
                    <input type="number" {...methods.register("deductions", { valueAsNumber: true })} className="w-full border rounded-md px-3 py-2" defaultValue={0} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Pay Date</label>
                    <input type="date" {...methods.register("pay_date")} className="w-full border rounded-md px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Status</label>
                    <select {...methods.register("status")} className="w-full border rounded-md px-3 py-2">
                      <option value="Pending">Pending</option>
                      <option value="Processed">Processed</option>
                      <option value="Paid">Paid</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#103BB5] hover:bg-[#0f2e8a]">
                    Add Payroll
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}

      {/* Custom Toast */}
      {toastMsg && (
        <Toaster
          message={toastMsg.message}
          type={toastMsg.type}
          onClose={() => setToastMsg(null)}
        />
      )}
    </div>
  );
}