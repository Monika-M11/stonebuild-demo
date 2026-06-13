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

   {
    id: 8,
    date: "2025-07-18",
    voucherNo: "PAY-005",
    particulars: "Sand Purchase",
    type: "Payment",
    amount: 15000,
  },
  {
    id: 9,
    date: "2025-07-19",
    voucherNo: "RCPT-004",
    particulars: "Customer Advance - Priya Sharma",
    type: "Receipt",
    amount: 40000,
  },
  {
    id: 10,
    date: "2025-07-19",
    voucherNo: "PAY-006",
    particulars: "Blue Metal Purchase",
    type: "Payment",
    amount: 22000,
  },
  {
    id: 11,
    date: "2025-07-20",
    voucherNo: "PAY-007",
    particulars: "Electrician Payment",
    type: "Payment",
    amount: 8500,
  },
  {
    id: 12,
    date: "2025-07-20",
    voucherNo: "RCPT-005",
    particulars: "Commercial Project Payment",
    type: "Receipt",
    amount: 95000,
  },
  {
    id: 13,
    date: "2025-07-21",
    voucherNo: "PAY-008",
    particulars: "Brick Purchase",
    type: "Payment",
    amount: 28000,
  },
  {
    id: 14,
    date: "2025-07-21",
    voucherNo: "PAY-009",
    particulars: "Office Rent",
    type: "Payment",
    amount: 20000,
  },
  {
    id: 15,
    date: "2025-07-22",
    voucherNo: "RCPT-006",
    particulars: "Final Payment - Solar Project",
    type: "Receipt",
    amount: 150000,
  },
  {
    id: 16,
    date: "2025-07-22",
    voucherNo: "PAY-010",
    particulars: "Plumbing Material Purchase",
    type: "Payment",
    amount: 12500,
  },
  {
    id: 17,
    date: "2025-07-23",
    voucherNo: "PAY-011",
    particulars: "Site Transport Charges",
    type: "Payment",
    amount: 4500,
  },
  {
    id: 18,
    date: "2025-07-23",
    voucherNo: "RCPT-007",
    particulars: "Customer Advance - VK Energy",
    type: "Receipt",
    amount: 60000,
  },
  {
    id: 19,
    date: "2025-07-24",
    voucherNo: "PAY-012",
    particulars: "Tile Purchase",
    type: "Payment",
    amount: 32000,
  },
  {
    id: 20,
    date: "2025-07-24",
    voucherNo: "PAY-013",
    particulars: "Carpenter Wages",
    type: "Payment",
    amount: 14000,
  },
  {
    id: 21,
    date: "2025-07-25",
    voucherNo: "RCPT-008",
    particulars: "Apartment Project Payment",
    type: "Receipt",
    amount: 85000,
  },
  {
    id: 22,
    date: "2025-07-25",
    voucherNo: "PAY-014",
    particulars: "Paint Material Purchase",
    type: "Payment",
    amount: 17000,
  },
  {
    id: 23,
    date: "2025-07-26",
    voucherNo: "PAY-015",
    particulars: "Internet & Utility Bills",
    type: "Payment",
    amount: 5500,
  },
  {
    id: 24,
    date: "2025-07-26",
    voucherNo: "RCPT-009",
    particulars: "Factory Project Advance",
    type: "Receipt",
    amount: 110000,
  },
  {
    id: 25,
    date: "2025-07-27",
    voucherNo: "PAY-016",
    particulars: "Generator Diesel Expense",
    type: "Payment",
    amount: 6800,
  },
  {
    id: 26,
    date: "2025-07-27",
    voucherNo: "PAY-017",
    particulars: "Safety Equipment Purchase",
    type: "Payment",
    amount: 9800,
  },
  {
    id: 27,
    date: "2025-07-28",
    voucherNo: "RCPT-010",
    particulars: "Site Completion Payment",
    type: "Receipt",
    amount: 175000,
  },
  {
    id: 28,
    date: "2025-07-28",
    voucherNo: "PAY-018",
    particulars: "Hardware Materials",
    type: "Payment",
    amount: 21000,
  },
  {
    id: 29,
    date: "2025-07-29",
    voucherNo: "RCPT-011",
    particulars: "Customer Final Settlement",
    type: "Receipt",
    amount: 90000,
  },
  {
    id: 30,
    date: "2025-07-29",
    voucherNo: "PAY-019",
    particulars: "Labour Bonus Payment",
    type: "Payment",
    amount: 16000,
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