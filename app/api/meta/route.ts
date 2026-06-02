import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { metaSchema } from '@/server/schema/meta-schema'



export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get('userId')

    if (userId) {
      const meta = await prisma.meta.findMany({
        where: { userId: userId },
      })

      if (!meta) {
        return NextResponse.json(
          {message: 'Não foi localizado meta', user: null, },
          {status: 404,}
        )
      }
      return NextResponse.json(meta)
    }

    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      {message: 'Erro interno do servidor',},
      {status: 500,}
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = metaSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ detail: parsed.error.flatten() }, { status: 400 })
    }

    const meta = await prisma.meta.create({
      data: {
        userId: parsed.data.userId,
        meta: parsed.data.meta,
        valor: parsed.data.valor,
        valor_atual: parsed.data.valor_atual,
        cor: parsed.data.cor,
      },
    })

    return NextResponse.json(
      { message: 'Meta criada com sucesso', data: meta },
      { status: 201, }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}