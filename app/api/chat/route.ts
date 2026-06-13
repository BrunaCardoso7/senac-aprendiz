// app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"
import fs from "fs"
import path from "path"

const client = new Groq({ apiKey: process.env.GROQ_API_KEY! })

type Chunk = { id: number; text: string; vec: Record<string, number> }

const chunks: Chunk[] = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "public", "chunks.json"), "utf-8")
)

function cosineSim(a: Record<string, number>, b: Record<string, number>) {
  let dot = 0, normA = 0, normB = 0
  for (const [k, v] of Object.entries(a)) {
    dot += v * (b[k] ?? 0)
    normA += v * v
  }
  for (const v of Object.values(b)) normB += v * v
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1)
}

function queryVec(query: string): Record<string, number> {
  const tokens = query.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean)
  const vec: Record<string, number> = {}
  for (const t of tokens) vec[t] = (vec[t] ?? 0) + 1
  return vec
}

function retrieveTopChunks(query: string, k = 3): string {
  const qv = queryVec(query)
  return chunks
    .map((c) => ({ ...c, score: cosineSim(qv, c.vec) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((c) => c.text)
    .join("\n\n---\n\n")
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    const question = messages[messages.length - 1].content
    const context = retrieveTopChunks(question)

    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    }))

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: `Você é um especialista no Manual da Aprendizagem Profissional do MTE do Brasil (2024).
Você recebe trechos relevantes do manual e deve responder com clareza e profundidade.
Use os trechos como base principal, mas use seu conhecimento sobre legislação trabalhista brasileira para complementar quando necessário.
Sempre cite o número da pergunta do manual quando souber (ex: "Conforme a pergunta 8 do manual...").
Use linguagem simples e acessível para jovens aprendizes.
Se não tiver certeza, oriente o aprendiz a buscar o MTE, sindicato ou advogado trabalhista.`,
        },
        ...history,
        {
          role: "user",
          content: `Trechos relevantes do manual:\n\n${context}\n\nPergunta: ${question}`,
        },
      ],
    })

    const answer = response.choices[0]?.message?.content ?? "Sem resposta."

    return NextResponse.json({ answer })
  } catch (error: any) {
    console.error(error)

    if (error?.status === 429) {
      return NextResponse.json({
        answer: "O serviço está temporariamente sobrecarregado. Aguarde alguns segundos e tente novamente.",
      })
    }

    return NextResponse.json(
      { answer: "Erro ao consultar o manual. Tente novamente." },
      { status: 500 }
    )
  }
}