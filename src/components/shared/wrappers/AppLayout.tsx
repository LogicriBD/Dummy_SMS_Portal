'use client'

import React from 'react'
import QueryProvider from '@/components/providers/QueryProvider'
import { JWTAuthProvider, authConfig } from '@/config/auth/auth'
import { Slide, ToastContainer } from 'react-toastify'
import { usePathname } from 'next/navigation'
import { publicRoutes } from '@/config/data/route'
import PageWithSidenav from './PageWithSidenav'

function AppLayout({ children }: { children: React.ReactNode }) {
  const routePath = usePathname()
  const isPublicRoute = publicRoutes.includes(routePath)

  return (
    <JWTAuthProvider config={authConfig}>
      <QueryProvider>
        <ToastContainer
          transition={Slide}
          position="top-center"
          toastClassName="rounded-lg"
          progressClassName="h-0.5 bg-primary"
          autoClose={3000}
          theme="colored"
          newestOnTop
          //hideProgressBar
        />
        <div className="relative min-h-screen w-full bg-sky-50 bg-opacity-70">
          {!isPublicRoute ? <PageWithSidenav>{children}</PageWithSidenav> : <>{children}</>}
        </div>
      </QueryProvider>
    </JWTAuthProvider>
  )
}

export default AppLayout
