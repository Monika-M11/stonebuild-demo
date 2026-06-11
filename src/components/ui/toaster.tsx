 "use client";

import { useEffect, useState } from "react";

type ToastType = "success" | "error";

export function Toaster({
  message,
  type,
  onClose,
}: {
  message: string;
  type: ToastType;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-[9999] px-5 py-3 rounded-xl shadow-xl text-sm text-white transition-all duration-300
      ${
        type === "success"
          ? "bg-green-600"
          : "bg-red-600"
      }`}
    >
      {message}
    </div>
  );
}