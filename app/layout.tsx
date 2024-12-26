import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
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
      <ClerkProvider>
        <body className={`${inter.className} bg-gray-900`}>
          <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 w-full h-full p-4 overflow-auto">
              {children}
            </main>
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
