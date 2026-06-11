 "use client";
 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // 🔐 Protect routes
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar onMenuChange={setActiveMenu} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        
        {/* Header */}
        <div className="h-14 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-[#103BB5]">
            {activeMenu || "Dashboard"}
          </h1>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1  overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}