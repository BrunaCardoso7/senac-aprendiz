import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const metaId = searchParams.get('id')

    if (!metaId) {
      return NextResponse.json(
        { message: 'ID da meta é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se a meta existe
    const metaExists = await prisma.meta.findUnique({
      where: { id: metaId },
    })

    if (!metaExists) {
      return NextResponse.json(
        { message: 'Meta não encontrada' },
        { status: 404 }
      )
    }

    // Deletar a meta
    const deletedMeta = await prisma.meta.delete({
      where: { id: metaId },
    })

    console.log('API /api/meta DELETE sucesso:', metaId)

    return NextResponse.json(
      { message: 'Meta deletada com sucesso', data: deletedMeta },
      { status: 200 }
    )
  } catch (error) {
    console.error('API /api/meta DELETE error:', error)

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
