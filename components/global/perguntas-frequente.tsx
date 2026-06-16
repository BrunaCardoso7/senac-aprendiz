"use client"

import { useState } from "react"
import { ChevronDown, MessageCircle, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Faq = {
  pergunta: string
  resposta: string
}

const faqs: Faq[] = [
  {
    pergunta: "Quais são meus direitos como aprendiz?",
    resposta:
      "Você tem direito a: salário mínimo/hora, FGTS (2%), férias remuneradas (30 dias), 13º salário proporcional, vale-transporte, jornada máxima de 6h diárias, registro em carteira, folgas em feriados e descanso semanal remunerado — tudo garantido pela Lei 10.097/2000.",
  },
  {
    pergunta: "Posso ser demitido durante o contrato?",
    resposta:
      "Sim, mas apenas em casos específicos previstos em lei: desempenho insuficiente mesmo após advertências, falta disciplinar grave, ausência injustificada por mais de 5 dias consecutivos ou abandono do curso. A empresa não pode demitir o aprendiz por outros motivos.",
  },
  {
    pergunta: "Tenho direito a horas extras?",
    resposta:
      "Não. A legislação trabalhista proíbe horas extras para jovens aprendizes. Se isso ocorrer, a empresa está descumprindo a lei. Comunique imediatamente ao Senac ou ao Ministério do Trabalho.",
  },
  {
    pergunta: "Tenho direito ao FGTS?",
    resposta:
      "Sim. A alíquota do FGTS para jovem aprendiz é de 2% — menor que os 8% dos demais trabalhadores. O valor é depositado mensalmente pelo empregador na sua conta e pode ser sacado ao término do contrato.",
  },
  {
    pergunta: "Como funciona minha jornada de trabalho?",
    resposta:
      "Você pode trabalhar no máximo 6 horas por dia na empresa. Somando as horas de aula no Senac, o total diário não pode ultrapassar 8 horas. Não há horas extras ou banco de horas permitidos para aprendizes.",
  },
  {
    pergunta: "Posso trabalhar em feriados?",
    resposta:
      "Não, o jovem aprendiz não pode trabalhar em feriados. A legislação trabalhista brasileira (CLT) proíbe a prorrogação e a compensação de jornada para essa categoria, o que veda a realização de horas extras, banco de horas ou trabalho em dias de feriado.",
  },
  {
    pergunta: "Como funciona minha frequência?",
    resposta:
      "A frequência mínima exigida em cada Unidade Curricular (UC) no Senac é de 75%. Abaixo disso, você pode ser reprovado na UC e não receber o certificado correspondente. Na empresa, faltas injustificadas também podem gerar penalidades contratuais.",
  },
  {
    pergunta: "Quantas faltas posso ter?",
    resposta:
      "Não há um número fixo, mas faltas injustificadas geram advertências e, acima de 5 dias consecutivos sem justificativa, podem resultar em rescisão do contrato. Faltas justificadas com documentação (atestado médico, por exemplo) não geram penalidade — use a aba Ocorrências do app para enviar sua justificativa.",
  },
  {
    pergunta: "Como é calculado o meu salário?",
    resposta:
      "Seu salário é calculado por hora trabalhada com base no salário mínimo nacional. O pagamento deve ser feito até o 5º dia útil do mês seguinte. Você também tem direito ao 13º salário proporcional e às férias remuneradas.",
  },
  {
    pergunta: "Tenho direito ao vale-transporte?",
    resposta:
      "Sim, o vale-transporte é obrigatório e deve cobrir o trajeto residência–empresa–escola. O desconto máximo no salário é de 6% do seu salário base.",
  },
  {
    pergunta: "Como funciona o contrato de aprendizagem?",
    resposta:
      "É um contrato especial, por prazo determinado (máximo de 2 anos), firmado entre você, a empresa e o Senac. Garante formação técnica no Senac e prática profissional na empresa, com todos os direitos trabalhistas garantidos pela Lei 10.097/2000.",
  },
  {
    pergunta: "Posso ter mais de um contrato de aprendizagem?",
    resposta:
      "Sim, desde que sejam em cursos ou áreas diferentes. Não é permitido renovar o mesmo contrato para o mesmo curso e empresa. Cada contrato deve estar registrado na sua Carteira de Trabalho.",
  },
  {
    pergunta: "O que faço se meus direitos forem desrespeitados?",
    resposta:
      "Comunique imediatamente ao Senac. Você está protegido por lei e não pode sofrer retaliações por exigir seus direitos. Você pode também acionar o Ministério do Trabalho ou o sindicato da categoria. Use o Canal de Apoio do aplicativo para buscar orientação.",
  },
  {
    pergunta: "O que acontece se eu precisar faltar por motivo de saúde?",
    resposta:
      "Apresente atestado médico em até 48 horas ao Senac e à empresa. Com o documento, a falta é justificada e não gera penalidade. Use a aba Ocorrências do aplicativo para enviar sua justificativa digitalmente.",
  },
]

export function PerguntasFrequentes() {
  const [aberta, setAberta] = useState<number | null>(null)

  return (
    <section
      aria-labelledby="faq-titulo"
      className="rounded-2xl mt-4 border border-border bg-card p-5 shadow-sm"
    >
      <header className="mb-1 flex items-center gap-2">
        <MessageCircle className="size-5 text-[#f15a24]" aria-hidden="true" />
        <h2 id="faq-titulo" className="text-lg font-bold text-foreground">
          Perguntas Frequentes
        </h2>
      </header>
      <p className="mb-4 text-sm text-muted-foreground">
        Toque em uma pergunta para ver a resposta.
      </p>

      <ul className="flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = aberta === i
          return (
            <li key={faq.pergunta}>
              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <h3>
                  <button
                    type="button"
                    onClick={() => setAberta(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {faq.pergunta}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div className="px-4 pb-4">
                    <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-emerald-500"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {faq.resposta}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
