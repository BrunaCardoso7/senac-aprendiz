// lib/extract-manual.ts
import fs from "fs"
import path from "path"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs"

async function main() {
  const pdfPath = path.join(process.cwd(), "public", "manual.pdf")
  const data = new Uint8Array(fs.readFileSync(pdfPath))

  const doc = await pdfjsLib.getDocument({ data }).promise
  let fullText = ""

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i)
    const content = await page.getTextContent()
    const pageText = content.items
      .map((item: any) => ("str" in item ? item.str : ""))
      .join(" ")
    fullText += pageText + "\n"
  }

  fs.writeFileSync(path.join(process.cwd(), "public", "manual.txt"), fullText)
  console.log("Extraído!", fullText.length, "caracteres")
}

main()