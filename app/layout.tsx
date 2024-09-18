import { Toaster } from "./_components/ui/sonner"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import AuthProvider from "./_providers/auth-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ClientHub",
  description: "Gerencie seus clientes de forma simples e eficiente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark max-w-7xl mx-auto`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
