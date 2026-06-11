import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contratoSchema } from "@/server/schema/contrato-schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = contratoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { detail: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const contrato = await prisma.contrato.create({
      data: {
        userId: parsed.data.userId,
        empresa: parsed.data.empresa,
        unidade: parsed.data.unidade,
        curso: parsed.data.curso,
        inicio: parsed.data.inicio,
        final: parsed.data.final,
      },
    });

    return NextResponse.json(
      {
        message: "Contrato criado com sucesso",
        data: contrato,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API /api/contrato POST error:", error);

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}