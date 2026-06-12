// app/api/atestado/upload/route.ts
import { NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { prisma } from "@/lib/prisma"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const file = formData.get("file") as File | null
    const userId = formData.get("userId") as string | null
    const descricao = formData.get("descricao") as string | null

    if (!file || !userId) {
      return NextResponse.json(
        { message: "Arquivo e userId são obrigatórios" },
        { status: 400 }
      )
    }

    // Converte File para buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload para o Cloudinary
    const uploaded = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "atestados",
              allowed_formats: ["jpg", "png", "jpeg", "pdf"],
              resource_type: "auto",
            },
            (error, result) => {
              if (error || !result) return reject(error)
              resolve(result)
            }
          )
          .end(buffer)
      }
    )

    // Salva no banco
    const atestado = await prisma.atestado.create({
      data: {
        userId,
        titulo: `Atestado de ${new Date().toLocaleDateString("pt-BR")}`,
        descricao: descricao ?? "",
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
        status: "em-analise",
      },
    })

    return NextResponse.json(atestado, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}