import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/', '/registre-se']
const loginRoute = '/'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  // Se tem token e tenta acessar rota pública (login/signup), redireciona para /senac
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/senac', request.url))
  }

  // Se não tem token e tenta acessar rota privada, redireciona para login
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(loginRoute, request.url))
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
