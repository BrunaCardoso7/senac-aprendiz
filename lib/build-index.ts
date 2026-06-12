// lib/build-index.ts
import fs from "fs"
import path from "path"

const MAX_CHUNK_SIZE = 800

// Divide por parágrafos respeitando o conteúdo semântico
function chunkByParagraph(text: string, maxChunkSize = 800): string[] {
  // Tenta dividir por padrões comuns em PDFs extraídos sem \n\n
  const paragraphs = text
    .split(/(?<=[.?!])\s{2,}|(?=\d+\))|(?=TEMA \d+)/)  // divide por número de pergunta ou TEMA
    .map(p => p.trim())
    .filter(p => p.length > 50)

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

  // Document frequency
  const df: Record<string, number> = {}
  for (const tokens of tokenized) {
    for (const t of new Set(tokens)) {
      df[t] = (df[t] ?? 0) + 1
    }
  }

  return tokenized.map((tokens, i) => {
    // Term frequency
    const tf: Record<string, number> = {}
    for (const t of tokens) tf[t] = (tf[t] ?? 0) + 1

    // TF-IDF vector
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

  console.log("✂️  Dividindo em chunks...")
  const chunks = chunkByParagraph(manualText)

  console.log("🔢 Calculando TF-IDF...")
  const index = buildTFIDF(chunks)

  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2))

  console.log(`\n✅ Indexados ${chunks.length} chunks`)
  console.log(`📁 Salvo em public/chunks.json`)

  // Preview dos primeiros 3 chunks
  console.log("\n--- Preview dos primeiros 3 chunks ---")
  chunks.slice(0, 3).forEach((c, i) => {
    console.log(`\nChunk ${i} (${c.length} chars):`)
    console.log(c.slice(0, 150) + (c.length > 150 ? "..." : ""))
  })

  // Estatísticas
  const sizes = chunks.map(c => c.length)
  const avg = Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length)
  const max = Math.max(...sizes)
  const min = Math.min(...sizes)
  console.log(`\n📊 Estatísticas: min=${min} | avg=${avg} | max=${max} chars`)
}

main()