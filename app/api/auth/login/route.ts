import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const loginSchema = z.object({
  matricula: z.string(),
  password: z.string(),
})

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = loginSchema.safeParse(body)
    console.log("DATABASE_URL:", process.env.DATABASE_URL); 
    if (!parsed.success) {
      return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { matricula: parsed.data.matricula },
    })

    if (!user) {
      return NextResponse.json({ message: 'Matrícula ou senha incorretos' }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(parsed.data.password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Matrícula ou senha incorretos' }, { status: 401 })
    }

    const token = jwt.sign(
      { id: user.id, matricula: user.matricula, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      message: 'Login realizado com sucesso',
      user: { id: user.id, name: user.name, matricula: user.matricula },
      token,
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    })

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}