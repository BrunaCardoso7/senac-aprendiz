import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

// rotas que exigem login
const PROTECTED = ['/dashboard', '/perfil']
// rotas que não podem ser acessadas logado
const AUTH_ONLY = ['/registre-se', '/']

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))
  const isAuthOnly = AUTH_ONLY.some((p) => pathname === p)

  let isValid = false
  if (token) {
    try {
      jwt.verify(token, JWT_SECRET)
      isValid = true
    } catch {}
  }

  if (isProtected && !isValid) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (isAuthOnly && isValid) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|fonts|icons|favicon.ico).*)'],
}