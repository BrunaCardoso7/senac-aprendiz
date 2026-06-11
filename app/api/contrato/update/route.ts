import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contratoSchema } from "@/server/schema/contrato-schema";

export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const contratoId = searchParams.get("id");

    if (!contratoId) {
      return NextResponse.json(
        { message: "ID do contrato é obrigatório" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const parsed = contratoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { detail: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const contratoExists = await prisma.contrato.findUnique({
      where: {
        id: contratoId,
      },
    });

    if (!contratoExists) {
      return NextResponse.json(
        { message: "Contrato não encontrado" },
        { status: 404 }
      );
    }

    const updatedContrato = await prisma.contrato.update({
      where: {
        id: contratoId,
      },
      data: {
        empresa: parsed.data.empresa,
        unidade: parsed.data.unidade,
        curso: parsed.data.curso,
        inicio: parsed.data.inicio,
        final: parsed.data.final,
      },
    });

    return NextResponse.json(
      {
        message: "Contrato atualizado com sucesso",
        data: updatedContrato,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/contrato/update PATCH error:", error);

    const err = error as any;

    if (err?.code || err?.meta) {
      return NextResponse.json(
        {
          message: err.message ?? "Erro do banco",
          code: err.code ?? null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}