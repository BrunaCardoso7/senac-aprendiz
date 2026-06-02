import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'



export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json(
        {message: 'Usuário não informado', user: null, },
        {status: 400,}
      )
    }

    const [entradas, saidas] = await Promise.all([
        prisma.transacao.aggregate({
            where: { userId: userId, tipo_transacao: 'ENTRADA' },
            _sum: { valor: true },
        }),
        prisma.transacao.aggregate({
            where: { userId: userId, tipo_transacao: 'SAIDA' },
            _sum: { valor: true },
        }),
    ])
    
    const receita = entradas._sum.valor ?? 0
    const despesa = saidas._sum.valor ?? 0
    const saldo = receita - despesa

    return NextResponse.json({
        receita,
        despesa,
        saldo,
    }, {status: 200,})
  } catch (error) {
    return NextResponse.json(
      {message: 'Erro interno do servidor',},
      {status: 500,}
    )
  }
}