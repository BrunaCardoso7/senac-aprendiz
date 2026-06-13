// lib/build-index.ts
import fs from "fs"
import path from "path"

const MAX_CHUNK_SIZE = 800

function cleanText(text: string): string {
  return text
    // Remove linhas que são só números separados por espaços (páginas do sumário)
    .replace(/(\d{1,3}\s{2,}){3,}\d{1,3}/g, "")
    // Remove espaços múltiplos entre palavras (artefato de PDF)
    .replace(/[ \t]{2,}/g, " ")
    // Remove linhas vazias extras
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

function isChunkUtil(text: string): boolean {
  // Remove se tiver sequências de 2+ pontos (sumário)
  if (/\.{2,}/.test(text)) return false

  // Remove se mais de 40% forem dígitos e espaços (páginas de sumário)
  const dotsAndNumbers = (text.match(/[\d\s]/g) ?? []).length
  if (dotsAndNumbers / text.length > 0.4) return false

  // Remove cabeçalhos típicos de PDF
  if (/^(da Aprendizagem|MINISTÉRIO|Ministro|Secretaria|Autores|APRESENTAÇÃO|Sumário)/i.test(text)) return false

  // Remove se for só números de página
  if (/^[\d\s]+$/.test(text)) return false

  return true
}

function chunkByParagraph(text: string, maxChunkSize = MAX_CHUNK_SIZE): string[] {
  const paragraphs = text
    .split(/(?<=[.?!])\s{2,}|(?=\d+\))|(?=TEMA \d+)/)
    .map(p => p.trim())
    .filter(p => p.length > 50 && isChunkUtil(p))

  const chunks: string[] = []
  let current = ""

  for (const para of paragraphs) {
    const candidate = current ? current + "\n\n" + para : para
    if (candidate.length > maxChunkSize && current.length > 0) {
      chunks.push(current.trim())
      current = para
    } else {
      current = candidate
    }
  }

  if (current.trim()) chunks.push(current.trim())
  return chunks
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
}

function buildTFIDF(chunks: string[]) {
  const tokenized = chunks.map(tokenize)

  const df: Record<string, number> = {}
  for (const tokens of tokenized) {
    for (const t of new Set(tokens)) {
      df[t] = (df[t] ?? 0) + 1
    }
  }

  return tokenized.map((tokens, i) => {
    const tf: Record<string, number> = {}
    for (const t of tokens) tf[t] = (tf[t] ?? 0) + 1

    const vec: Record<string, number> = {}
    for (const [t, count] of Object.entries(tf)) {
      vec[t] = (count / tokens.length) * Math.log(chunks.length / (df[t] ?? 1))
    }

    return { id: i, text: chunks[i], vec }
  })
}

function main() {
  const inputPath = path.join(process.cwd(), "public", "manual.txt")
  const outputPath = path.join(process.cwd(), "public", "chunks.json")

  if (!fs.existsSync(inputPath)) {
    console.error("❌ Arquivo manual.txt não encontrado em /public")
    process.exit(1)
  }

  console.log("📖 Lendo manual.txt...")
  const manualText = fs.readFileSync(inputPath, "utf-8")

  console.log("🧹 Limpando texto...")
  const cleanedText = cleanText(manualText)

  console.log("✂️  Dividindo em chunks...")
  const chunks = chunkByParagraph(cleanedText)

  console.log("🔢 Calculando TF-IDF...")
  const index = buildTFIDF(chunks)

  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2))

  console.log(`\n✅ Indexados ${chunks.length} chunks`)
  console.log(`📁 Salvo em public/chunks.json`)

  console.log("\n--- Preview dos primeiros 5 chunks ---")
  chunks.slice(0, 5).forEach((c, i) => {
    console.log(`\nChunk ${i} (${c.length} chars):`)
    console.log(c.slice(0, 200) + (c.length > 200 ? "..." : ""))
  })

  const sizes = chunks.map(c => c.length)
  const avg = Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length)
  const max = Math.max(...sizes)
  const min = Math.min(...sizes)
  console.log(`\n📊 Estatísticas: min=${min} | avg=${avg} | max=${max} chars`)
}

main()