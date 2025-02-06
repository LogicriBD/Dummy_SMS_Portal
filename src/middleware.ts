import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { isAuthenticatedRequest } from 'next-jwt-auth'
import { publicRoutes } from '@/config/data/route'

export default function middleware(request: NextRequest) {
  const isUnprotectedRoute = publicRoutes.includes(request.nextUrl.pathname)

  if (!isUnprotectedRoute && !isAuthenticatedRequest(request)) {
    return NextResponse.redirect(new URL('/login', request.url))
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
