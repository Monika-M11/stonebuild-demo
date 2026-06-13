"use client";

import { useMemo, useState } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
} from "lucide-react";

type OutstandingEntry = {
  id: number;
  partyName: string;
  type: "Receivable" | "Payable";
  phone: string;
  city: string;
  outstandingAmount: number;
  lastTransactionDate: string;
};

const outstandingData: OutstandingEntry[] = [
  {
    id: 1,
    partyName: "Arun Builders",
    type: "Receivable",
    phone: "9876543210",
    city: "Chennai",
    outstandingAmount: 65000,
    lastTransactionDate: "2025-07-18",
  },
  {
    id: 2,
    partyName: "Nair Traders",
    type: "Receivable",
    phone: "9898989898",
    city: "Kochi",
    outstandingAmount: 10000,
    lastTransactionDate: "2025-07-15",
  },
  {
    id: 3,
    partyName: "Rajesh Developers",
    type: "Receivable",
    phone: "9788888888",
    city: "Coimbatore",
    outstandingAmount: 125000,
    lastTransactionDate: "2025-07-20",
  },
  {
    id: 4,
    partyName: "Sri Cement Agencies",
    type: "Payable",
    phone: "9444444444",
    city: "Madurai",
    outstandingAmount: 85000,
    lastTransactionDate: "2025-07-19",
  },
  {
    id: 5,
    partyName: "Kumar Steel Mart",
    type: "Payable",
    phone: "9555555555",
    city: "Salem",
    outstandingAmount: 45000,
    lastTransactionDate: "2025-07-21",
  },
  {
    id: 6,
    partyName: "Blue Metal Suppliers",
    type: "Payable",
    phone: "9666666666",
    city: "Erode",
    outstandingAmount: 20000,
    lastTransactionDate: "2025-07-22",
  },
];

export default function OutstandingPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] =
    useState("All");

  const filteredData = useMemo(() => {
    return outstandingData.filter((item) => {
      const matchesSearch =
        item.partyName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.city
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesType =
        filterType === "All" ||
        item.type === filterType;

      return (
        matchesSearch && matchesType
      );
    });
  }, [search, filterType]);

  const totalReceivable =
    outstandingData
      .filter(
        (x) =>
          x.type === "Receivable"
      )
      .reduce(
        (sum, x) =>
          sum + x.outstandingAmount,
        0
      );

  const totalPayable =
    outstandingData
      .filter(
        (x) =>
          x.type === "Payable"
      )
      .reduce(
        (sum, x) =>
          sum + x.outstandingAmount,
        0
      );

  const netOutstanding =
    totalReceivable -
    totalPayable;

  const formatCurrency = (
    amount: number
  ) =>
    new Intl.NumberFormat(
      "en-IN"
    ).format(amount);

  const exportPdf = () => {
    alert(
      "PDF Export Integration Ready"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      {/* Header */}

      <div className="mb-6">
        

        <p className="text-gray-500">
          Receivable & Payable
          Outstanding Summary
        </p>
      </div>

      {/* Filters */}

      <div className="bg-white border rounded-xl p-5 mb-6 shadow-sm">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">
              Search Party
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full border rounded-md pl-10 pr-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="form-label">
              Type
            </label>

            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(
                  e.target.value
                )
              }
              className="w-full border rounded-md px-3 py-2"
            >
              <option>
                All
              </option>

              <option>
                Receivable
              </option>

              <option>
                Payable
              </option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={exportPdf}
              className="border px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Download size={16} />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-600" />

            <div>
              <p className="text-sm text-gray-500">
                Receivable
              </p>

              <h2 className="text-2xl font-bold text-green-600">
                ₹
                {formatCurrency(
                  totalReceivable
                )}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <TrendingDown className="text-red-600" />

            <div>
              <p className="text-sm text-gray-500">
                Payable
              </p>

              <h2 className="text-2xl font-bold text-red-600">
                ₹
                {formatCurrency(
                  totalPayable
                )}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-[#103BB5] text-white rounded-xl p-5">
          <div className="flex items-center gap-3">
            <Wallet />

            <div>
              <p className="text-sm opacity-80">
                Net Outstanding
              </p>

              <h2 className="text-2xl font-bold">
                ₹
                {formatCurrency(
                  netOutstanding
                )}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-auto">
          <table className="table-default">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Party Name</th>
                <th>Type</th>
                <th>Phone</th>
                <th>City</th>
                <th>Last Transaction</th>
                <th className="text-right">
                  Outstanding
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map(
                (item, index) => (
                  <tr key={item.id}>
                    <td>
                      {index + 1}
                    </td>

                    <td className="font-medium">
                      {item.partyName}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.type ===
                          "Receivable"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>

                    <td>
                      {item.phone}
                    </td>

                    <td>
                      {item.city}
                    </td>

                    <td>
                      {
                        item.lastTransactionDate
                      }
                    </td>

                    <td className="text-right font-semibold">
                      ₹
                      {formatCurrency(
                        item.outstandingAmount
                      )}
                    </td>
                  </tr>
                )
              )}

              {filteredData.length ===
                0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No outstanding records
                    found
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