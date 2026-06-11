"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Landmark,
  Download,
} from "lucide-react";

type DayBookEntry = {
  id: number;
  date: string;
  voucherNo: string;
  particulars: string;
  type: "Receipt" | "Payment";
  amount: number;
};

const dayBookData: DayBookEntry[] = [
  {
    id: 1,
    date: "2025-07-15",
    voucherNo: "RCPT-001",
    particulars: "Client Payment - Arun Builders",
    type: "Receipt",
    amount: 50000,
  },
  {
    id: 2,
    date: "2025-07-15",
    voucherNo: "PAY-001",
    particulars: "Labour Wages",
    type: "Payment",
    amount: 12000,
  },
  {
    id: 3,
    date: "2025-07-16",
    voucherNo: "PAY-002",
    particulars: "Cement Purchase",
    type: "Payment",
    amount: 25000,
  },
  {
    id: 4,
    date: "2025-07-16",
    voucherNo: "RCPT-002",
    particulars: "Advance Received",
    type: "Receipt",
    amount: 75000,
  },
  {
    id: 5,
    date: "2025-07-17",
    voucherNo: "PAY-003",
    particulars: "Site Petrol Expense",
    type: "Payment",
    amount: 3500,
  },
  {
    id: 6,
    date: "2025-07-17",
    voucherNo: "PAY-004",
    particulars: "Steel Purchase",
    type: "Payment",
    amount: 18000,
  },
  {
    id: 7,
    date: "2025-07-18",
    voucherNo: "RCPT-003",
    particulars: "Project Milestone Payment",
    type: "Receipt",
    amount: 120000,
  },
];

export default function DayBookPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  const openingBalance = 150000;

  const filteredEntries = useMemo(() => {
    return dayBookData.filter((entry) => {
      const matchesSearch =
        entry.particulars
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        entry.voucherNo
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesSearch;
    });
  }, [search]);

  const totalReceipts = filteredEntries
    .filter((item) => item.type === "Receipt")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalPayments = filteredEntries
    .filter((item) => item.type === "Payment")
    .reduce((sum, item) => sum + item.amount, 0);

  const closingBalance =
    openingBalance +
    totalReceipts -
    totalPayments;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN").format(
      amount
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
          Day Book
        </h1>

        <p className="text-gray-500">
          Daily Financial Transactions
        </p>
      </div>

      {/* Filters */}

      <div className="bg-white border rounded-xl p-5 shadow-sm mb-6">
        <div className="grid md:grid-cols-4 gap-4">
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

          <div>
            <label className="form-label">
              Search
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

          <div className="flex items-end gap-2">
            <button className="primary-btn">
              Generate
            </button>

            <button
              onClick={exportPdf}
              className="border px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Download size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-5">
          <div className="flex gap-3 items-center">
            <Landmark className="text-[#103BB5]" />

            <div>
              <p className="text-sm text-gray-500">
                Opening Balance
              </p>

              <h2 className="text-2xl font-bold">
                ₹
                {formatCurrency(
                  openingBalance
                )}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex gap-3 items-center">
            <ArrowDownCircle className="text-green-600" />

            <div>
              <p className="text-sm text-gray-500">
                Receipts
              </p>

              <h2 className="text-2xl font-bold text-green-600">
                ₹
                {formatCurrency(
                  totalReceipts
                )}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex gap-3 items-center">
            <ArrowUpCircle className="text-red-600" />

            <div>
              <p className="text-sm text-gray-500">
                Payments
              </p>

              <h2 className="text-2xl font-bold text-red-600">
                ₹
                {formatCurrency(
                  totalPayments
                )}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-[#103BB5] rounded-xl p-5 text-white">
          <div className="flex gap-3 items-center">
            <Wallet />

            <div>
              <p className="text-sm opacity-80">
                Closing Balance
              </p>

              <h2 className="text-2xl font-bold">
                ₹
                {formatCurrency(
                  closingBalance
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
                <th>Date</th>
                <th>Voucher No</th>
                <th>Particulars</th>
                <th>Type</th>
                <th className="text-right">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEntries.map(
                (entry, index) => (
                  <tr key={entry.id}>
                    <td>{index + 1}</td>

                    <td>
                      {entry.date}
                    </td>

                    <td>
                      {
                        entry.voucherNo
                      }
                    </td>

                    <td>
                      {
                        entry.particulars
                      }
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          entry.type ===
                          "Receipt"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {entry.type}
                      </span>
                    </td>

                    <td className="text-right font-medium">
                      ₹
                      {formatCurrency(
                        entry.amount
                      )}
                    </td>
                  </tr>
                )
              )}

              {filteredEntries.length ===
                0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No transactions found
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