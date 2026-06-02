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
    const metas = await prisma.meta.findMany({
      where: {
        userId,
        ...(dateFilter && { createdAt: dateFilter }),
      },
      select: {
        id: true,
        meta: true,
        valor: true,
        valor_atual: true,
        cor: true,
        createdAt: true,
      },
    })

    const porMes: Record<string, { metas: typeof metas; total_valor: number; total_valor_atual: number }> = {}

    for (const m of metas) {
      const chave = `${m.createdAt.getFullYear()}-${String(m.createdAt.getMonth() + 1).padStart(2, '0')}`

      if (!porMes[chave]) {
        porMes[chave] = { metas: [], total_valor: 0, total_valor_atual: 0 }
      }

      porMes[chave].metas.push(m)
      porMes[chave].total_valor += m.valor
      porMes[chave].total_valor_atual += m.valor_atual
    }

    const resultado = Object.entries(porMes)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([mes, dados]) => ({ mes, ...dados }))

    return NextResponse.json(resultado, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}