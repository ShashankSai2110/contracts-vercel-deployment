// components/Sidebar.tsx
"use client";

import React from "react";
import { X } from "lucide-react";
import clsx from "clsx";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  width?: string; // e.g., 'w-64', 'w-80'
  position?: "left" | "right";
  children: React.ReactNode;
}

export const FileSidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  width = "w-128",
  position = "right",
  children,
}) => {
  return (
    <div
      className={clsx(
        "fixed top-0 h-full bg-white shadow-md z-50 transition-transform duration-300",
        width,
        position === "left" ? "left-0" : "right-0",
        isOpen
          ? "translate-x-0"
          : position === "left"
          ? "-translate-x-full"
          : "translate-x-full"
      )}
    >
      <div className="flex justify-end p-3 border-b">
        <button onClick={() => setIsOpen(false)}>
          <X className="text-gray-500 hover:text-black" />
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-full">{children}</div>
    </div>
  );
};
