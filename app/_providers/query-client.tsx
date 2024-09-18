"use client"

import * as React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import { ReactNode } from 'react';

interface ProviderProps {
    children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => {
    const [client] = React.useState(new QueryClient())

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
} 