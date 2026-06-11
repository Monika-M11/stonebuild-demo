"use client";

import { useMemo, useState } from "react";
import {
  User,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  Search,
  Download,
} from "lucide-react";

type StatementEntry = {
  id: number;
  partyName: string;
  date: string;
  voucherNo: string;
  particulars: string;
  debit: number;
  credit: number;
};

const statementData: StatementEntry[] = [
  {
    id: 1,
    partyName: "Arun Builders",
    date: "2025-07-15",
    voucherNo: "INV-001",
    particulars: "Cement Supply",
    debit: 50000,
    credit: 0,
  },
  {
    id: 2,
    partyName: "Arun Builders",
    date: "2025-07-18",
    voucherNo: "RCPT-001",
    particulars: "Payment Received",
    debit: 0,
    credit: 30000,
  },
  {
    id: 3,
    partyName: "Arun Builders",
    date: "2025-07-20",
    voucherNo: "INV-002",
    particulars: "Steel Supply",
    debit: 45000,
    credit: 0,
  },

  {
    id: 4,
    partyName: "Nair Traders",
    date: "2025-07-15",
    voucherNo: "INV-003",
    particulars: "River Sand",
    debit: 25000,
    credit: 0,
  },

  {
    id: 5,
    partyName: "Nair Traders",
    date: "2025-07-22",
    voucherNo: "RCPT-002",
    particulars: "Payment Received",
    debit: 0,
    credit: 15000,
  },

  {
    id: 6,
    partyName: "Priya Enterprises",
    date: "2025-07-21",
    voucherNo: "INV-004",
    particulars: "Blue Metal",
    debit: 35000,
    credit: 0,
  },
];

export default function StatementPage() {
  const [party, setParty] =
    useState("Arun Builders");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const formatCurrency = (
    amount: number
  ) =>
    new Intl.NumberFormat(
      "en-IN"
    ).format(amount);

  const filteredData = useMemo(() => {
    return statementData.filter(
      (item) =>
        item.partyName === party
    );
  }, [party]);

  const openingBalance = 25000;

  const totalDebit = filteredData.reduce(
    (sum, item) => sum + item.debit,
    0
  );

  const totalCredit = filteredData.reduce(
    (sum, item) => sum + item.credit,
    0
  );

  const closingBalance =
    openingBalance +
    totalDebit -
    totalCredit;

  const exportPdf = () => {
    alert(
      "PDF Export Integration Ready"
    );
  };

  let runningBalance =
    openingBalance;

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      {/* Header */}

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#103BB5]">
          Statement
        </h1>

        <p className="text-gray-500">
          Customer / Vendor Statement
        </p>
      </div>

      {/* Filters */}

      <div className="bg-white border rounded-xl p-5 shadow-sm mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="form-label">
              Contact Name
            </label>

            <select
              value={party}
              onChange={(e) =>
                setParty(
                  e.target.value
                )
              }
              className="w-full border rounded-md px-3 py-2"
            >
              <option>
                Arun Builders
              </option>

              <option>
                Nair Traders
              </option>

              <option>
                Priya Enterprises
              </option>
            </select>
          </div>

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

          <div className="flex items-end gap-2">
            <button className="primary-btn flex items-center gap-2">
              <Search size={16} />
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
          <div className="flex gap-3 items-center">
            <Wallet className="text-[#103BB5]" />

            <div>
              <p className="text-sm text-gray-500">
                Opening
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
            <ArrowDownCircle className="text-red-600" />

            <div>
              <p className="text-sm text-gray-500">
                Debit
              </p>

              <h2 className="text-2xl font-bold text-red-600">
                ₹
                {formatCurrency(
                  totalDebit
                )}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex gap-3 items-center">
            <ArrowUpCircle className="text-green-600" />

            <div>
              <p className="text-sm text-gray-500">
                Credit
              </p>

              <h2 className="text-2xl font-bold text-green-600">
                ₹
                {formatCurrency(
                  totalCredit
                )}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-[#103BB5] text-white rounded-xl p-5">
          <div className="flex gap-3 items-center">
            <User />

            <div>
              <p className="text-sm opacity-80">
                Closing
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

      {/* Statement Table */}

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="table-default">
          <thead>
            <tr>
              <th>Date</th>
              <th>Voucher No</th>
              <th>Particulars</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Balance</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map(
              (entry) => {
                runningBalance =
                  runningBalance +
                  entry.debit -
                  entry.credit;

                return (
                  <tr
                    key={entry.id}
                  >
                    <td>
                      {
                        entry.date
                      }
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

                    <td className="text-red-600 font-medium">
                      {entry.debit >
                      0
                        ? `₹${formatCurrency(
                            entry.debit
                          )}`
                        : "-"}
                    </td>

                    <td className="text-green-600 font-medium">
                      {entry.credit >
                      0
                        ? `₹${formatCurrency(
                            entry.credit
                          )}`
                        : "-"}
                    </td>

                    <td className="font-semibold">
                      ₹
                      {formatCurrency(
                        runningBalance
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}