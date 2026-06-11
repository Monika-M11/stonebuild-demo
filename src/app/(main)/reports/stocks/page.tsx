"use client";

import { useMemo, useState } from "react";
import {
  Boxes,
  AlertTriangle,
  PackageCheck,
  PackageX,
  Search,
} from "lucide-react";

import BigModal from "@/app/utils/BigModal";

type Stock = {
  id: number;
  materialName: string;
  category: string;
  unit: string;
  availableQty: number;
  minimumQty: number;
};

const initialStockData: Stock[] = [
  {
    id: 1,
    materialName: "Cement",
    category: "Construction",
    unit: "Bags",
    availableQty: 250,
    minimumQty: 100,
  },
  {
    id: 2,
    materialName: "Steel Rod",
    category: "Construction",
    unit: "Nos",
    availableQty: 80,
    minimumQty: 100,
  },
  {
    id: 3,
    materialName: "River Sand",
    category: "Raw Material",
    unit: "Loads",
    availableQty: 0,
    minimumQty: 5,
  },
  {
    id: 4,
    materialName: "Blue Metal",
    category: "Raw Material",
    unit: "Loads",
    availableQty: 12,
    minimumQty: 5,
  },
  {
    id: 5,
    materialName: "Bricks",
    category: "Construction",
    unit: "Nos",
    availableQty: 5000,
    minimumQty: 2000,
  },
  {
    id: 6,
    materialName: "M-Sand",
    category: "Raw Material",
    unit: "Loads",
    availableQty: 2,
    minimumQty: 5,
  },
];

export default function StocksPage() {
  const [search, setSearch] = useState("");

  const [stocks, setStocks] =
    useState<Stock[]>(initialStockData);

  const [selectedItem, setSelectedItem] =
    useState<Stock | null>(null);

  const [showModal, setShowModal] =
    useState(false);

  const [qty, setQty] = useState(0);

  const [mode, setMode] = useState<
    "add" | "remove"
  >("add");

  const filteredStocks = useMemo(() => {
    return stocks.filter(
      (item) =>
        item.materialName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search, stocks]);

  const getStatus = (
    qty: number,
    minQty: number
  ) => {
    if (qty === 0) return "Out of Stock";

    if (qty <= minQty) return "Low Stock";

    return "In Stock";
  };

  const totalItems = stocks.length;

  const inStock = stocks.filter(
    (x) =>
      getStatus(
        x.availableQty,
        x.minimumQty
      ) === "In Stock"
  ).length;

  const lowStock = stocks.filter(
    (x) =>
      getStatus(
        x.availableQty,
        x.minimumQty
      ) === "Low Stock"
  ).length;

  const outOfStock = stocks.filter(
    (x) =>
      getStatus(
        x.availableQty,
        x.minimumQty
      ) === "Out of Stock"
  ).length;

  const openStockModal = (item: Stock) => {
    setSelectedItem(item);
    setQty(0);
    setMode("add");
    setShowModal(true);
  };

  const updateStock = () => {
    if (!selectedItem) return;

    setStocks((prev) =>
      prev.map((item) => {
        if (item.id !== selectedItem.id)
          return item;

        return {
          ...item,
          availableQty:
            mode === "add"
              ? item.availableQty + qty
              : Math.max(
                  0,
                  item.availableQty - qty
                ),
        };
      })
    );

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#103BB5]">
          Stocks
        </h1>

        <p className="text-gray-500">
          Material Inventory Management
        </p>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-5">
          <div className="flex gap-3 items-center">
            <Boxes className="text-[#103BB5]" />

            <div>
              <p className="text-sm text-gray-500">
                Total Items
              </p>

              <h2 className="text-3xl font-bold">
                {totalItems}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex gap-3 items-center">
            <PackageCheck className="text-green-600" />

            <div>
              <p className="text-sm text-gray-500">
                In Stock
              </p>

              <h2 className="text-3xl font-bold text-green-600">
                {inStock}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex gap-3 items-center">
            <AlertTriangle className="text-orange-600" />

            <div>
              <p className="text-sm text-gray-500">
                Low Stock
              </p>

              <h2 className="text-3xl font-bold text-orange-600">
                {lowStock}
              </h2>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5">
          <div className="flex gap-3 items-center">
            <PackageX className="text-red-600" />

            <div>
              <p className="text-sm text-gray-500">
                Out Of Stock
              </p>

              <h2 className="text-3xl font-bold text-red-600">
                {outOfStock}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white border rounded-xl p-4 mb-6">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search material..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border rounded-lg pl-10 pr-4 py-2"
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="table-default">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Material</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Available Qty</th>
              <th>Minimum Qty</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStocks.map(
              (item, index) => {
                const status =
                  getStatus(
                    item.availableQty,
                    item.minimumQty
                  );

                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>

                    <td>
                      {item.materialName}
                    </td>

                    <td>
                      {item.category}
                    </td>

                    <td>{item.unit}</td>

                    <td>
                      {item.availableQty}
                    </td>

                    <td>
                      {item.minimumQty}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          status ===
                          "In Stock"
                            ? "bg-green-100 text-green-700"
                            : status ===
                              "Low Stock"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          openStockModal(
                            item
                          )
                        }
                        className="primary-btn text-xs"
                      >
                        Update Stock
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}

      <BigModal
        open={showModal}
        onClose={() =>
          setShowModal(false)
        }
        title={
          selectedItem?.materialName ||
          ""
        }
      >
        <div className="p-6 max-w-xl mx-auto">
          <div className="bg-slate-50 border rounded-xl p-5">
            <div className="space-y-3">
              <div>
                Material :
                <strong>
                  {" "}
                  {
                    selectedItem?.materialName
                  }
                </strong>
              </div>

              <div>
                Current Stock :
                <strong>
                  {" "}
                  {
                    selectedItem?.availableQty
                  }{" "}
                  {selectedItem?.unit}
                </strong>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label className="form-label">
              Quantity
            </label>

            <input
              type="number"
              value={qty}
              onChange={(e) =>
                setQty(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            <button
              onClick={() =>
                setMode("add")
              }
              className={`py-3 rounded-lg ${
                mode === "add"
                  ? "bg-green-600 text-white"
                  : "border"
              }`}
            >
              Add Stock
            </button>

            <button
              onClick={() =>
                setMode("remove")
              }
              className={`py-3 rounded-lg ${
                mode === "remove"
                  ? "bg-red-600 text-white"
                  : "border"
              }`}
            >
              Remove Stock
            </button>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={updateStock}
              className="primary-btn"
            >
              Save Changes
            </button>
          </div>
        </div>
      </BigModal>
    </div>
  );
}