import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  if (!token) {
    return NextResponse.json({ message: 'Não autenticado' }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string
      matricula: string
      name: string | null
    }

    return NextResponse.json({ user: decoded })
  } catch {
    return NextResponse.json({ message: 'Token inválido' }, { status: 401 })
  }
}