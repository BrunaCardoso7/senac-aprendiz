import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const metaId = searchParams.get('id')

    if (!metaId) {
      return NextResponse.json(
        { message: 'ID da meta é obrigatório' },
        { status: 400 }
      )
    }

    const body = await req.json()
    const { amount } = body

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { message: 'Valor inválido' },
        { status: 400 }
      )
    }

    const metaExists = await prisma.meta.findUnique({
      where: { id: metaId },
    })

    if (!metaExists) {
      return NextResponse.json(
        { message: 'Meta não encontrada' },
        { status: 404 }
      )
    }

    const updatedMeta = await prisma.meta.update({
      where: { id: metaId },
      data: {
        valor_atual: {
          increment: amount, // soma ao valor atual existente
        },
      },
    })

    console.log('API /api/meta/update PATCH sucesso:', metaId, '+', amount)

    return NextResponse.json(
      { message: 'Meta atualizada com sucesso', data: updatedMeta },
      { status: 200 }
    )
  } catch (error) {
    console.error('API /api/meta/update PATCH error:', error)

    const err = error as any
    if (err?.code || err?.meta) {
      return NextResponse.json(
        { message: err.message ?? 'Erro do banco', code: err.code ?? null },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}