// app/api/contrato/get/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { message: 'Usuário não informado' },
        { status: 400 }
      )
    }

    const contrato = await prisma.contrato.findFirst({
      where: { userId },
      select: {
        id: true,
        empresa: true,
        unidade: true,
        curso: true,
        inicio: true,
        final: true,
      },
    })

    if (!contrato) {
      return NextResponse.json(
        { message: 'Contrato não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(contrato, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}