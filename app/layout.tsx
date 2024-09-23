import { Toaster } from "./_components/ui/sonner"
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import AuthProvider from "./_providers/auth-provider";
import { Provider } from "./_providers/query-client";
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

export const fetchCache = 'force-no-store'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark max-w-[90rem] mx-auto`}
      >

        <AuthProvider>
          <Provider>
            {children}
          </Provider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
