import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { HeroDarkModeProvider } from "../context/HeroDarkModeContext";
import { ScrollProvider } from "@/context/ScrollContext";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Medera - AI Evaluation Framework",
  description: "Advanced AI evaluation and monitoring framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollProvider>
          <HeroDarkModeProvider>
            <SiteHeader />
            {children}
          </HeroDarkModeProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
