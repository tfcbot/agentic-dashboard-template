import React from "react";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/app/context/SidebarContext";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 w-full h-full p-4 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
} 