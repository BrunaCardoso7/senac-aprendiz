import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { transacaoSchema } from '@/server/schema/transacao-schema'



export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')
    const dataInicio = req.nextUrl.searchParams.get('dataInicio')
    const dataFim = req.nextUrl.searchParams.get('dataFim')

    if (userId) {
      // Se dataInicio e dataFim forem fornecidas, filtra por período
      if (dataInicio && dataFim) {
        const transacoes = await prisma.transacao.findMany({
          where: {
            userId: userId,
            data: {
              gte: new Date(dataInicio + 'T00:00:00'),
              lte: new Date(dataFim + 'T23:59:59'),
            },
          },
          orderBy: { data: 'desc' },
        })

        console.log('API /api/transacao GET (período):', { userId, dataInicio, dataFim, count: transacoes.length })
        return NextResponse.json(transacoes)
      }

      // Caso contrário, busca todas as transações do usuário
      const transacoes = await prisma.transacao.findMany({
        where: { userId: userId },
        orderBy: { data: 'desc' },
      })

      if (!transacoes || transacoes.length === 0) {
        return NextResponse.json([], { status: 200 })
      }

      console.log('API /api/transacao GET (todas):', { userId, count: transacoes.length })
      return NextResponse.json(transacoes)
    }

    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error('API /api/transacao GET error:', error)

    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
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