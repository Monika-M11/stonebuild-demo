//  "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getSession } from "@/app/utils/api"; // use same getSession as CompanyLayout

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [checkingSession, setCheckingSession] = useState(true);
//   const [mounted, setMounted] = useState(false);

//   // Ensure this runs only after first client mount
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     const session = getSession();
//     console.log("SESSION IN DASHBOARD LAYOUT:", session);

//     if (!session?.token) {
//       // delay redirect to avoid StrictMode double render issues
//       Promise.resolve().then(() => router.replace("/login"));
//     } else {
//       setCheckingSession(false);
//     }
//   }, [mounted, router]);

//   if (!mounted || checkingSession) {
//     return (
//       <div className="flex items-center justify-center w-full h-screen text-gray-600 bg-gray-100">
//         Checking session...
//       </div>
//     );
//   }

//   return <>{children}</>;
// }



"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Demo Mode: Bypass real session check
    const token = localStorage.getItem("token");
    console.log("SESSION IN DASHBOARD LAYOUT:", { token });

    // Allow access if token exists (set during login) or in demo mode
    if (token || true) {   // ← `|| true` makes it always allow for now
      setCheckingSession(false);
    } else {
      // Only redirect if no token
      Promise.resolve().then(() => router.replace("/login"));
    }
  }, [mounted, router]);

  if (!mounted || checkingSession) {
    return (
      <div className="flex items-center justify-center w-full h-screen text-gray-600 bg-gray-100">
        Loading Dashboard...
      </div>
    );
  }

  return <>{children}</>;
}