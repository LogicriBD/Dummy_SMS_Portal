import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isAuthenticatedRequest } from 'next-jwt-auth'
import { unProtectedRoutes, publicRoutes } from '@/config/data/route'

export default function middleware(request: NextRequest) {
  const isUnprotectedRoute = unProtectedRoutes.includes(request.nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)

  if (isPublicRoute) {
    return NextResponse.next()
  }

  if (!isUnprotectedRoute && !isAuthenticatedRequest(request)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isUnprotectedRoute && isAuthenticatedRequest(request)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
