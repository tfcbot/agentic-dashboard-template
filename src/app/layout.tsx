import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from "next/font/google";
import Providers from "./providers";
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
      <ClerkProvider waitlistUrl="/waitlist">
        <body className={`${inter.className} bg-gray-900`}>
          <Providers>
            {children}
          </Providers>
        </body>
      </ClerkProvider>
    </html>
  );
}
