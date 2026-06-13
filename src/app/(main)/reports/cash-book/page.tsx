"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Wallet,
  Download,
  ArrowDownCircle,
  ArrowUpCircle,
  Landmark,
} from "lucide-react";

type CashBookEntry = {
  id: number;
  date: string;
  voucherNo: string;
  particulars: string;
  receipt: number;
  payment: number;
};
const cashBookData: CashBookEntry[] = [
  {
    id: 1,
    date: "2025-07-15",
    voucherNo: "RCPT-001",
    particulars: "Client Payment - Arun Builders",
    receipt: 50000,
    payment: 0,
  },
  {
    id: 2,
    date: "2025-07-15",
    voucherNo: "PAY-001",
    particulars: "Labour Wages - Site 1",
    receipt: 0,
    payment: 12000,
  },
  {
    id: 3,
    date: "2025-07-16",
    voucherNo: "PAY-002",
    particulars: "Petrol & Diesel Expense",
    receipt: 0,
    payment: 2500,
  },
  {
    id: 4,
    date: "2025-07-16",
    voucherNo: "RCPT-002",
    particulars: "Advance Received - Priya Sharma",
    receipt: 75000,
    payment: 0,
  },
  {
    id: 5,
    date: "2025-07-17",
    voucherNo: "PAY-003",
    particulars: "Site Refreshments & Food",
    receipt: 0,
    payment: 1800,
  },
  {
    id: 6,
    date: "2025-07-17",
    voucherNo: "PAY-004",
    particulars: "Labour Advance Payment",
    receipt: 0,
    payment: 10000,
  },
  {
    id: 7,
    date: "2025-07-18",
    voucherNo: "RCPT-003",
    particulars: "Project Milestone Payment - Ramesh Kumar",
    receipt: 120000,
    payment: 0,
  },
  {
    id: 8,
    date: "2025-07-18",
    voucherNo: "PAY-005",
    particulars: "Cement Purchase",
    receipt: 0,
    payment: 45000,
  },
  {
    id: 9,
    date: "2025-07-19",
    voucherNo: "RCPT-004",
    particulars: "Client Payment - Suresh Babu",
    receipt: 85000,
    payment: 0,
  },
  {
    id: 10,
    date: "2025-07-19",
    voucherNo: "PAY-006",
    particulars: "Steel Rod Purchase",
    receipt: 0,
    payment: 32000,
  },
  {
    id: 11,
    date: "2025-07-20",
    voucherNo: "PAY-007",
    particulars: "Electrician Payment",
    receipt: 0,
    payment: 8500,
  },
  {
    id: 12,
    date: "2025-07-20",
    voucherNo: "RCPT-005",
    particulars: "Security Deposit Refund",
    receipt: 15000,
    payment: 0,
  },
  {
    id: 13,
    date: "2025-07-21",
    voucherNo: "PAY-008",
    particulars: "Transport Charges",
    receipt: 0,
    payment: 6800,
  },
  {
    id: 14,
    date: "2025-07-21",
    voucherNo: "RCPT-006",
    particulars: "Final Settlement - Lakshmi Narayanan",
    receipt: 95000,
    payment: 0,
  },
  {
    id: 15,
    date: "2025-07-22",
    voucherNo: "PAY-009",
    particulars: "Plumbing Materials",
    receipt: 0,
    payment: 18500,
  },
  {
    id: 16,
    date: "2025-07-22",
    voucherNo: "RCPT-007",
    particulars: "Advance from VK Energy",
    receipt: 65000,
    payment: 0,
  },
  {
    id: 17,
    date: "2025-07-23",
    voucherNo: "PAY-010",
    particulars: "Office Rent",
    receipt: 0,
    payment: 22000,
  },
  {
    id: 18,
    date: "2025-07-23",
    voucherNo: "RCPT-008",
    particulars: "Material Sale - Scrap",
    receipt: 8500,
    payment: 0,
  },
  {
    id: 19,
    date: "2025-07-24",
    voucherNo: "PAY-011",
    particulars: "Supervisor Salary",
    receipt: 0,
    payment: 15000,
  },
  {
    id: 20,
    date: "2025-07-24",
    voucherNo: "RCPT-009",
    particulars: "Payment from Geetha Menon",
    receipt: 45000,
    payment: 0,
  },
];

export default function CashBookPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [search, setSearch] = useState("");

  const openingCash = 50000;

  const filteredEntries = useMemo(() => {
    return cashBookData.filter(
      (item) =>
        item.particulars
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.voucherNo
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search]);

  const totalReceipts = filteredEntries.reduce(
    (sum, item) => sum + item.receipt,
    0
  );

  const totalPayments = filteredEntries.reduce(
    (sum, item) => sum + item.payment,
    0
  );

  const closingCash =
    openingCash +
    totalReceipts -
    totalPayments;

  const formatCurrency = (
    amount: number
  ) => {
    return new Intl.NumberFormat(
      "en-IN"
    ).format(amount);
  };

  const exportPdf = () => {
    alert(
      "PDF Export Integration Ready"
    );
  };

  let runningBalance = openingCash;

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      {/* Header */}

      <div className="mb-6">
        

        <p className="text-gray-500">
          Cash Receipts & Payments Register
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

      {/* Summary */}

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <Landmark className="text-[#103BB5]" />

            <div>
              <p className="text-sm text-gray-500">
                Opening Cash
              </p>

              <h2 className="text-2xl font-bold">
                ₹
                {formatCurrency(
                  openingCash
                )}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <ArrowDownCircle className="text-green-600" />

            <div>
              <p className="text-sm text-gray-500">
                Cash Received
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
          <div className="flex items-center gap-3">
            <ArrowUpCircle className="text-red-600" />

            <div>
              <p className="text-sm text-gray-500">
                Cash Paid
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

        <div className="bg-[#103BB5] text-white rounded-xl p-5">
          <div className="flex items-center gap-3">
            <Wallet />

            <div>
              <p className="text-sm opacity-80">
                Closing Cash
              </p>

              <h2 className="text-2xl font-bold">
                ₹
                {formatCurrency(
                  closingCash
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
                <th className="text-right">
                  Receipt
                </th>
                <th className="text-right">
                  Payment
                </th>
                <th className="text-right">
                  Balance
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredEntries.map(
                (entry, index) => {
                  runningBalance =
                    runningBalance +
                    entry.receipt -
                    entry.payment;

                  return (
                    <tr key={entry.id}>
                      <td>
                        {index + 1}
                      </td>

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

                      <td className="text-right text-green-600 font-medium">
                        {entry.receipt >
                        0
                          ? `₹${formatCurrency(
                              entry.receipt
                            )}`
                          : "-"}
                      </td>

                      <td className="text-right text-red-600 font-medium">
                        {entry.payment >
                        0
                          ? `₹${formatCurrency(
                              entry.payment
                            )}`
                          : "-"}
                      </td>

                      <td className="text-right font-semibold">
                        ₹
                        {formatCurrency(
                          runningBalance
                        )}
                      </td>
                    </tr>
                  );
                }
              )}

              {filteredEntries.length ===
                0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-gray-500"
                  >
                    No records found
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