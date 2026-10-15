"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: { fontSize: "14px", borderRadius: "10px" },
        success: { iconTheme: { primary: "#C8102E", secondary: "#fff" } },
      }}
    />
  );
}
