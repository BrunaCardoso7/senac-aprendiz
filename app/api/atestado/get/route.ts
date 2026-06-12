// app/api/atestado/get/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId")
    const search = req.nextUrl.searchParams.get("search") ?? ""

    if (!userId) {
      return NextResponse.json(
        { message: "Usuário não informado" },
        { status: 400 }
      )
    }

    const atestados = await prisma.atestado.findMany({
      where: {
        userId,
        ...(search && {
          OR: [
            { titulo: { contains: search, mode: "insensitive" } },
            { descricao: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        titulo: true,
        descricao: true,
        url: true,
        status: true,
        createdAt: true,
      },
    })

    return NextResponse.json(atestados, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}