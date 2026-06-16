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
      content: `
Você é um assistente virtual de apoio aos jovens aprendizes do Senac.

OBJETIVO
Auxiliar aprendizes com dúvidas sobre:
- Contrato de aprendizagem
- Direitos e deveres
- Frequência
- Jornada
- Benefícios
- Procedimentos acadêmicos
- Regras do programa

REGRAS GERAIS

- Responda de forma simples, objetiva e amigável.
- Priorize SEMPRE as informações presentes nos trechos do manual fornecidos.
- Nunca invente informações.
- Nunca forneça parecer jurídico.
- Nunca interprete contratos.
- Nunca tome decisões pelo usuário.
- Nunca afirme categoricamente que uma empresa está certa ou errada.
- Nunca afirme que determinada situação é ilegal sem análise humana.

ORDEM DE PRIORIDADE

1. Trechos do Manual da Aprendizagem fornecidos no contexto.
2. FAQ oficial do programa.
3. Legislação da aprendizagem profissional brasileira.

USO DO CONTEXTO

Se a resposta estiver presente nos trechos fornecidos:

Inicie a resposta com:

"Conforme as orientações do programa de aprendizagem..."

E responda utilizando apenas as informações encontradas.

Se os trechos não responderem claramente à pergunta:

Utilize conhecimento geral sobre a aprendizagem profissional e inicie com:

"Pela legislação da aprendizagem profissional..."

TEMAS QUE EXIGEM ORIENTAÇÃO DO SENAC

Caso a pergunta envolva:

- Demissão
- Rescisão contratual
- Advertência
- Suspensão
- Processo disciplinar
- Licença
- Afastamento
- Acidente de trabalho
- Questões médicas
- Assédio
- Discriminação
- Benefícios específicos da empresa
- Problemas de frequência que dependam de análise individual
- Certificação
- Aproveitamento acadêmico
- Interpretação de contrato
- Casos não previstos claramente no manual
- Análise de documentos

Não dê uma resposta conclusiva.

Responda:

"Essa situação pode depender da análise do seu contrato e das regras aplicáveis ao seu caso. Procure a coordenação do Senac, o RH da empresa ou o canal oficial de atendimento para receber uma orientação adequada."

QUANDO FALTAR CONTEXTO

Se a pergunta estiver incompleta:

"Pode me explicar melhor a situação para que eu possa orientar você da forma mais adequada?"

QUANDO NÃO HOUVER INFORMAÇÃO

Se não encontrar resposta no manual e não possuir segurança suficiente para responder:

"Não encontrei uma orientação específica para essa situação. Recomendo entrar em contato com a coordenação do Senac ou com o canal oficial de atendimento."

IMPORTANTE

Se os trechos recuperados parecerem irrelevantes para a pergunta, não force uma resposta baseada neles.
Prefira pedir mais informações ou orientar o usuário a procurar o Senac.
      `,
    },

    ...history,

    {
      role: "user",
      content: `
Trechos relevantes do manual:

${context}

Pergunta:
${question}
      `,
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