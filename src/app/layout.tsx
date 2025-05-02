import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { ToastProvider, ToastViewport, Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Payer Contract Interface",
  description: "A payer contract interface for healthcare providers",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <ToastViewport />
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  );
}
