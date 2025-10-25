// src/components/ToastProvider.jsx
import React from "react";
import { Toaster, toast } from "sonner";

export function ToastProvider({ children }) {
  return (
    <>
      {/* The Toaster component must exist once in the app */}
      <Toaster richColors position="top-right" />
      {children}
    </>
  );
}

/**
 * Custom hook so you can call useToast() anywhere.
 * Usage: const { toast } = useToast(); toast.success("Message");
 */
export function useToast() {
  return { toast };
}
