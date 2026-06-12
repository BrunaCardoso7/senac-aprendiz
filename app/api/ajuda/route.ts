// app/api/ajuda/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { ajudaSchema } from "@/server/schema/ajuda-schema"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = ajudaSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Dados inválidos", errors: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const ajuda = await prisma.ajuda.create({ data: parsed.data })

    return NextResponse.json(ajuda, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}