// app/api/denuncia/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { denunciaSchema } from "@/server/schema/denuncia.schema"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = denunciaSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Dados inválidos", errors: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const denuncia = await prisma.denuncia.create({
      data: parsed.data,
    })

    return NextResponse.json(denuncia, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}