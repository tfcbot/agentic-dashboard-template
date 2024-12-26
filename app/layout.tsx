import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Sidebar from "./components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your application dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <div className="flex h-screen">
          <Sidebar />
          <main className="w-full h-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
