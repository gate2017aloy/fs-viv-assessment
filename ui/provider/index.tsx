"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { ReactNode, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />

                {children}
            </QueryClientProvider>
        </ThemeProvider>
    )
}