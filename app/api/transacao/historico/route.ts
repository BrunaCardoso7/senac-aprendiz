import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')
    const month_initial = req.nextUrl.searchParams.get('month_initial')
    const month_final = req.nextUrl.searchParams.get('month_final')

    if (!userId) {
      return NextResponse.json(
        { message: 'Usuário não informado' },
        { status: 400 }
      )
    }

    const dateFilter = month_initial && month_final
    ? {
        gte: new Date(`${month_initial}-01T00:00:00`),
        lt: (() => {
          const [year, month] = month_final.split('-').map(Number)
          const d = new Date(year, month, 1) // mês seguinte
          d.setHours(0, 0, 0, 0)
          return d
        })(),
      }
  : undefined

    const transacoes = await prisma.transacao.findMany({
      where: {
        userId,
        ...(dateFilter && { data: dateFilter }),
      },
      select: {
        tipo_transacao: true,
        valor: true,
        data: true,
      },
    })

    // agrupa por mês no JS
    const porMes: Record<string, { receita: number; despesa: number; saldo: number }> = {}

    for (const t of transacoes) {
      const chave = `${t.data.getFullYear()}-${String(t.data.getMonth() + 1).padStart(2, '0')}`

      if (!porMes[chave]) {
        porMes[chave] = { receita: 0, despesa: 0, saldo: 0 }
      }

      if (t.tipo_transacao === 'ENTRADA') {
        porMes[chave].receita += Number(t.valor)
      } else {
        porMes[chave].despesa += Number(t.valor)
      }

      porMes[chave].saldo = porMes[chave].receita - porMes[chave].despesa
    }

    // transforma em array ordenado por mês
    const resultado = Object.entries(porMes)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([mes, valores]) => ({ mes, ...valores }))

    return NextResponse.json(resultado, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}