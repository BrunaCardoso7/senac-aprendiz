import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { transacaoSchema } from '@/server/schema/transacao-schema'



export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')

    if (userId) {
      const transacao = await prisma.transacao.findMany({
        where: { userId: userId },
      })

      if (!transacao) {
        return NextResponse.json(
          {message: 'Não foi localizado transação', user: null, },
          {status: 404,}
        )
      }
      return NextResponse.json(transacao)
    }

    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error('API /api/transacao GET error:', error)

    return NextResponse.json(
      {message: 'Erro interno do servidor',},
      {status: 500,}
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = transacaoSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ detail: parsed.error.flatten() }, { status: 400 })
    }

    const transacao = await prisma.transacao.create({
      data: {
        userId: parsed.data.userId,
        categoria: parsed.data.categoria,
        valor: parsed.data.valor,
        data: parsed.data.data,
        descricao: parsed.data.descricao,
        tipo_transacao: parsed.data.tipo_transacao,
      },
    })

    return NextResponse.json(
      { message: 'Transação criada com sucesso', data: transacao},
      { status: 201, }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}