 "use client";

import { useState } from "react";
import {
  Calendar,
  FileText,
  Download,
  Search,
  Building2,
  Hammer,
  Users,
} from "lucide-react";

type DPRRow = {
  id: number;
  date: string;
  project: string;
  activity: string;
  labourCount: number;
  progress: string;
  remarks: string;
};

const dummyDPRData: DPRRow[] = [
  {
    id: 1,
    date: "2025-07-15",
    project: "Villa Construction - Chennai",
    activity: "Foundation Work",
    labourCount: 18,
    progress: "Completed 80%",
    remarks: "Work progressing as planned",
  },
  {
    id: 2,
    date: "2025-07-15",
    project: "Apartment Project - Coimbatore",
    activity: "Column Casting",
    labourCount: 12,
    progress: "Completed 100%",
    remarks: "Completed successfully",
  },
  {
    id: 3,
    date: "2025-07-16",
    project: "Villa Construction - Chennai",
    activity: "Brick Work",
    labourCount: 22,
    progress: "Completed 60%",
    remarks: "Material delay",
  },
  {
    id: 4,
    date: "2025-07-16",
    project: "Commercial Building - Kochi",
    activity: "Plastering",
    labourCount: 15,
    progress: "Completed 75%",
    remarks: "Good progress",
  },
  {
    id: 5,
    date: "2025-07-17",
    project: "Warehouse Project - Madurai",
    activity: "Roof Installation",
    labourCount: 10,
    progress: "Completed 40%",
    remarks: "Awaiting materials",
  },
];

export default function DPRPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [project, setProject] =
    useState("All Projects");

  const [reportData, setReportData] =
    useState<DPRRow[]>([]);

  const generateReport = () => {
    let data = [...dummyDPRData];

    if (project !== "All Projects") {
      data = data.filter(
        (item) => item.project === project
      );
    }

    setReportData(data);
  };

  const totalActivities =
    reportData.length;

  const totalLabours = reportData.reduce(
    (sum, item) => sum + item.labourCount,
    0
  );

  const exportPdf = () => {
    alert(
      "PDF Export Integration Ready"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#103BB5]">
          Daily Progress Report
        </h1>

        <p className="text-gray-500">
          Generate DPR Reports
        </p>
      </div>

      {/* Filters */}

      <div className="bg-white border rounded-xl p-5 shadow-sm">
        <div className="grid md:grid-cols-3 gap-4">
          {/* From Date */}

          <div>
            <label className="form-label">
              From Date
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(e) =>
                setFromDate(
                  e.target.value
                )
              }
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* To Date */}

          <div>
            <label className="form-label">
              To Date
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(e) =>
                setToDate(
                  e.target.value
                )
              }
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Project */}

          <div>
            <label className="form-label">
              Project
            </label>

            <select
              value={project}
              onChange={(e) =>
                setProject(
                  e.target.value
                )
              }
              className="w-full border rounded-md px-3 py-2"
            >
              <option>
                All Projects
              </option>

              <option>
                Villa Construction -
                Chennai
              </option>

              <option>
                Apartment Project -
                Coimbatore
              </option>

              <option>
                Commercial Building -
                Kochi
              </option>

              <option>
                Warehouse Project -
                Madurai
              </option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-5">
          <button
            onClick={generateReport}
            className="primary-btn flex items-center gap-2"
          >
            <Search size={16} />
            Generate Report
          </button>

          <button
            onClick={exportPdf}
            className="border px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Download size={16} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary */}

      {reportData.length > 0 && (
        <>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <Building2 className="text-[#103BB5]" />

                <div>
                  <p className="text-sm text-gray-500">
                    Activities
                  </p>

                  <h2 className="text-3xl font-bold">
                    {
                      totalActivities
                    }
                  </h2>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <Users className="text-green-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Total Labours
                  </p>

                  <h2 className="text-3xl font-bold text-green-600">
                    {totalLabours}
                  </h2>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-5">
              <div className="flex items-center gap-3">
                <Hammer className="text-orange-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Progress Entries
                  </p>

                  <h2 className="text-3xl font-bold text-orange-600">
                    {
                      reportData.length
                    }
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Report Table */}

          <div className="bg-white border rounded-xl mt-6 overflow-hidden">
            <div className="p-4 border-b bg-slate-50 flex items-center gap-2">
              <FileText size={18} />

              <h3 className="font-semibold">
                DPR Preview
              </h3>
            </div>

            <div className="overflow-auto">
              <table className="table-default">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Date</th>
                    <th>Project</th>
                    <th>Activity</th>
                    <th>Labours</th>
                    <th>Progress</th>
                    <th>Remarks</th>
                  </tr>
                </thead>

                <tbody>
                  {reportData.map(
                    (
                      item,
                      index
                    ) => (
                      <tr
                        key={item.id}
                      >
                        <td>
                          {index + 1}
                        </td>

                        <td>
                          {
                            item.date
                          }
                        </td>

                        <td>
                          {
                            item.project
                          }
                        </td>

                        <td>
                          {
                            item.activity
                          }
                        </td>

                        <td>
                          {
                            item.labourCount
                          }
                        </td>

                        <td>
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                            {
                              item.progress
                            }
                          </span>
                        </td>

                        <td>
                          {
                            item.remarks
                          }
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}