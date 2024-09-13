"use client"

import { SessionProvider } from "next-auth/react";
import React from "react";
import { ReactNode } from "react";

const AuthProvider = ({ children }: {children: ReactNode}) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

export default AuthProvider;