"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  Users,
  Gem,
  Wallet,
  BookOpen,
  ShoppingBag,
  BarChart2,
  BellRing,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const primary = "text-[#103BB5]";
const primaryHover = "hover:bg-[#103BB5]/10";

export default function Sidebar({
  onMenuChange,
}: {
  onMenuChange: (label: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const [activeMenu, setActiveMenu] = useState("");

  // ✅ Menu mapping
  const menuMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/contacts": "Contacts",
    "/materials": "Materials",
    "/equipments": "Equipments",
    "/warehouse": "Warehouse",
    "/ledger": "Ledger",
    "/purchase": "Purchase",
    "/expenses" : "Expenses",
    

    "/attendance": "Attendance",
    "/payroll": "Payroll",
    "/quotation": "Quotation",
    "/crm": "CRM",

    "/reports/stocks": "Stocks",
    "/reports/day-book": "Day Book",
    "/reports/cash-book": "Cash Book",
    "/reports/statement": "Statement",
    "/reports/outstanding": "Outstanding",
    "/reports/payments": "Payments",
    "/reports/receipts": "Receipts",
    "/reports/expenses": "Expenses",
    "/reports/attendance": "Attendance",
    "/reports/salary": "Salary",
    "/reports/dpr": "Daily Progress Report",

    "/help": "Help",
    "/project": "Project",
  };

  // ✅ Simplified path normalization
  const normalizePath = (path: string) => {
    if (!path) return "/";
    let cleaned = path.split("?")[0].split("#")[0];

    if (cleaned.length > 1 && cleaned.endsWith("/")) {
      cleaned = cleaned.slice(0, -1);
    }

    return cleaned.startsWith("/") ? cleaned : "/" + cleaned;
  };

  const normalizedPath = useMemo(() => normalizePath(pathname), [pathname]);

  // ✅ Match active menu
  const findBestMatchLabel = (normPath: string) => {
    if (menuMap[normPath]) return menuMap[normPath];

    const candidates = Object.keys(menuMap).filter(
      (key) =>
        normPath === key ||
        normPath.startsWith(key + "/") ||
        normPath.startsWith(key)
    );

    if (candidates.length === 0) return undefined;

    candidates.sort((a, b) => b.length - a.length);
    return menuMap[candidates[0]];
  };

  useEffect(() => {
    const label = findBestMatchLabel(normalizedPath);

    if (label) {
      setActiveMenu(label);
      onMenuChange(label);
    } else {
      setActiveMenu("");
      onMenuChange("");
    }
    // eslint-disable-next-line
  }, [normalizedPath]);

  // ✅ Clean navigation (NO companyId, NO /app)
  const handleMenuClick = (label: string, route: string) => {
    setActiveMenu(label);
    onMenuChange(label);
    router.push(route);
  };

  return (
    <aside className="flex-shrink-0 w-[260px] h-screen bg-gray-50 px-4 pb-4 flex flex-col overflow-y-auto">
      {/* Logo */}
      <h1 className="flex items-center pb-2 text-2xl font-bold text-[#103BB5]">
        <img
          src="/stonebuild-logo.png"
          alt="logo"
          className="w-16 h-16"
        />
        <span>Stonebuild</span>
      </h1>

      {/* Menu */}
      <nav className="flex-1 pr-1 text-sm space-y-1">
        <MenuItem
          icon={<Home size={18} />}
          label="Dashboard"
          route="/dashboard"
          active={activeMenu === "Dashboard"}
          onClick={handleMenuClick}
        />

        <MenuWithSub
          icon={<Users size={18} />}
          label="Essentials"
          items={[
            { name: "Contacts", route: "/contacts" },
            { name: "Materials", route: "/materials" },
            { name: "Equipments", route: "/equipments" },
            { name: "Warehouse", route: "/warehouse" },
          ]}
          activeMenu={activeMenu}
          onMenuClick={handleMenuClick}
          normalizedPath={normalizedPath}
        />

        <MenuItem
          icon={<BookOpen size={18} />}
          label="Ledger"
          route="/ledger"
          active={activeMenu === "Ledger"}
          onClick={handleMenuClick}
        />
  <MenuItem
          icon={<BookOpen size={18} />}
          label="Purchase"
          route="/purchase"
          active={activeMenu === "Purchase"}
          onClick={handleMenuClick}
        />

        <MenuItem
          icon={<ShoppingBag size={18} />}
          label="Expense"
          route="/expenses"
          active={activeMenu === "Expense"}
          onClick={handleMenuClick}
        />

        <MenuItem
          icon={<Gem size={18} />}
          label="Quotation"
          route="/quotation"
          active={activeMenu === "Quotation"}
          onClick={handleMenuClick}
        />
         <MenuItem
          icon={<Users size={18} />}
          label="CRM"
          route="/crm"
          active={activeMenu === "CRM"}
          onClick={handleMenuClick}
        />

        <MenuItem
          icon={<BookOpen size={18} />}
          label="Project"
          route="/project"
          active={activeMenu === "Project"}
          onClick={handleMenuClick}
        />

      

       
        <MenuItem
          icon={<BellRing size={18} />}
          label="Attendance"
          route="/attendance"
          active={activeMenu === "Attendance"}
          onClick={handleMenuClick}
        />

        <MenuItem
          icon={<Wallet size={18} />}
          label="Payroll"
          route="/payroll"
          active={activeMenu === "Payroll"}
          onClick={handleMenuClick}
        />

        <MenuWithSub
          icon={<BarChart2 size={18} />}
          label="Reports"
          items={[
            { name: "DPR", route: "/reports/dpr" },
            { name: "Stocks", route: "/reports/stocks" },
            { name: "Day Book", route: "/reports/day-book" },
            { name: "Cash Book", route: "/reports/cash-book" },
            { name: "Statement", route: "/reports/statement" },
            { name: "Outstanding", route: "/reports/outstanding" },
            { name: "Payments", route: "/reports/payments" },
            { name: "Receipts", route: "/reports/receipts" },
            { name: "Expenses", route: "/reports/expenses" },
            { name: "Attendance", route: "/reports/attendance" },
            { name: "Salary", route: "/reports/salary" },
          ]}
          activeMenu={activeMenu}
          onMenuClick={handleMenuClick}
          normalizedPath={normalizedPath}
        />

        <MenuItem
          icon={<BookOpen size={18} />}
          label="Help"
          route="/help"
          active={activeMenu === "Help"}
          onClick={handleMenuClick}
        />
      </nav>
    </aside>
  );
}

function MenuItem({
  icon,
  label,
  route,
  active,
  onClick,
}: any) {
  return (
    <button
      onClick={() => onClick(label, route)}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[15px]
      ${
        active
          ? "bg-[#103BB5]/10 text-[#103BB5] font-semibold"
          : "text-gray-700 hover:bg-gray-100 hover:text-[#103BB5]"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function MenuWithSub({
  icon,
  label,
  items,
  activeMenu,
  onMenuClick,
  normalizedPath,
}: any) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const matched = items.some((item: any) =>
      normalizedPath.startsWith(item.route)
    );
    setOpen(matched);
  }, [normalizedPath]);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`flex justify-between w-full px-3 py-2 text-[15px]
        ${primaryHover}`}
      >
        <span className="flex gap-2">
          {icon}
          {label}
        </span>
        {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {open &&
        items.map((item: any) => (
          <button
            key={item.name}
            onClick={() => onMenuClick(item.name, item.route)}
            className={`ml-6 px-3 py-2 text-sm w-full text-left
            ${
              activeMenu === item.name
                ? "text-[#103BB5] font-semibold"
                : "text-gray-600 hover:text-[#103BB5]"
            }`}
          >
            {item.name}
          </button>
        ))}
    </div>
  );
}