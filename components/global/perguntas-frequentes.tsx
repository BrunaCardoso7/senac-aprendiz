"use client"

import { useState } from "react"
import { ChevronRight, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type Pergunta = {
  pergunta: string
  resposta: string
}

const perguntas: Pergunta[] = [
  {
    pergunta: "Posso ser demitido durante o contrato?",
    resposta:
      "Durante o contrato de experiência, ambas as partes podem rescindir o vínculo. Após a efetivação, aplicam-se as regras normais de demissão previstas na CLT.",
  },
  {
    pergunta: "Como funciona a rescisão antecipada?",
    resposta:
      "Na rescisão antecipada do contrato por prazo determinado, a parte que rompe o acordo deve indenizar a outra conforme o previsto nos artigos 479 e 480 da CLT.",
  },
  {
    pergunta: "Tenho direito a horas extras?",
    resposta:
      "Sim. As horas trabalhadas além da jornada contratada devem ser pagas com o adicional mínimo de 50% sobre o valor da hora normal, salvo acordo ou convenção coletiva diferente.",
  },
  {
    pergunta: "Posso trabalhar aos domingos?",
    resposta:
      "O trabalho aos domingos é permitido em determinadas atividades, mas exige folga compensatória e, em muitos casos, adicional previsto em convenção coletiva.",
  },
  {
    pergunta: "Quantas faltas posso ter?",
    resposta:
      "Faltas injustificadas podem gerar descontos no salário e no descanso semanal remunerado. Acima de certo limite, podem caracterizar justa causa por abandono ou desídia.",
  },
]

export function PerguntasFrequentes() {
  const [aberta, setAberta] = useState<number | null>(2)

  return (
    <section className="w-full rounded-xl border border-border bg-card p-6 my-24  shadow-sm mt-10 ">
      <header className="mb-5 flex items-center gap-2">
        <MessageCircle className="size-5 text-orange-500" aria-hidden="true" />
        <h2 className="text-base font-semibold text-card-foreground">Perguntas Frequentes</h2>
      </header>

      <ul className="flex flex-col">
        {perguntas.map((item, index) => {
          const ativa = aberta === index
          return (
            <li key={item.pergunta}>
              <button
                type="button"
                onClick={() => setAberta(ativa ? null : index)}
                aria-expanded={ativa}
                className={cn(
                  "flex w-full items-center justify-between gap-4 rounded-lg px-4 py-3 text-left transition-colors",
                  ativa ? "bg-accent" : "hover:bg-muted",
                )}
              >
                <span className="text-sm text-card-foreground">{item.pergunta}</span>
                <ChevronRight
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform",
                    ativa && "rotate-90",
                  )}
                  aria-hidden="true"
                />
              </button>

              {ativa && (
                <p className="px-4 pb-4 pt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.resposta}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
