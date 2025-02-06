'use client'

import React, { ReactNode } from 'react'
import { toast } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError(error: any) {
        console.log(error)
        toast.error(error?.response?.data?.message ?? 'Something wrong ! Please try again')
      },
    },
  },
})

const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full">{children}</div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default QueryProvider
