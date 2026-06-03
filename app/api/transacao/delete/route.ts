import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const transacaoId = searchParams.get('id')

    if (!transacaoId) {
      return NextResponse.json(
        { message: 'ID da transação é obrigatório' },
        { status: 400 }
      )
    }

    // Verificar se a transação existe
    const transacaoExists = await prisma.transacao.findUnique({
      where: { id: transacaoId },
    })

    if (!transacaoExists) {
      return NextResponse.json(
        { message: 'Transação não encontrada' },
        { status: 404 }
      )
    }

    // Deletar a transação
    const deletedTransacao = await prisma.transacao.delete({
      where: { id: transacaoId },
    })

    console.log('API /api/transacao DELETE sucesso:', transacaoId)

    return NextResponse.json(
      { message: 'Transação deletada com sucesso', data: deletedTransacao },
      { status: 200 }
    )
  } catch (error) {
    console.error('API /api/transacao DELETE error:', error)

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
