// lib/build-index.ts
import fs from "fs"
import path from "path"

const CHUNK_SIZE = 500
const OVERLAP = 50

function chunkText(text: string): string[] {
  const chunks: string[] = []
  let i = 0
  while (i < text.length) {
    chunks.push(text.slice(i, i + CHUNK_SIZE))
    i += CHUNK_SIZE - OVERLAP
  }
  return chunks
}

// Embedding simples com TF-IDF (sem modelo externo)
function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/).filter(Boolean)
}

function buildTFIDF(chunks: string[]) {
  const tokenized = chunks.map(tokenize)
  const df: Record<string, number> = {}
  for (const tokens of tokenized) {
    for (const t of new Set(tokens)) df[t] = (df[t] ?? 0) + 1
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

const manualText = fs.readFileSync(
  path.join(process.cwd(), "public", "manual.txt"), "utf-8"
)

const chunks = chunkText(manualText)
const index = buildTFIDF(chunks)

fs.writeFileSync(
  path.join(process.cwd(), "public", "chunks.json"),
  JSON.stringify(index, null, 2)
)

console.log(`Indexados ${chunks.length} chunks`)