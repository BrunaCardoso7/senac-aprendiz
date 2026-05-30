'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from '@/context/auth-context'
import { ModalsProvider } from '@/context/modal-context-finance'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ModalsProvider>
            {children}
            <Toaster />
          </ModalsProvider>
        </AuthProvider>
      </QueryClientProvider>
  )
}