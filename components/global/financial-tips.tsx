import {
  Lightbulb,
  Home,
  Target,
  PiggyBank,
  Landmark,
  BarChart3,
  TrendingUp,
  ClipboardList,
} from "lucide-react"

type Rule = {
  percent: string
  title: string
  description: string
  icon: React.ElementType
  // cores do bloco da regra 50/30/20
  border: string
  bg: string
  percentColor: string
  iconColor: string
}

const rules: Rule[] = [
  {
    percent: "50%",
    title: "Necessidades básicas",
    description: "Alimentação, transporte, moradia, saúde — tudo que é essencial para o dia a dia.",
    icon: Home,
    border: "border-blue-200",
    bg: "bg-blue-50",
    percentColor: "text-blue-600",
    iconColor: "text-blue-500",
  },
  {
    percent: "30%",
    title: "Desejos e lazer",
    description: "Compras, entretenimento, saídas com amigos — aquilo que te dá prazer mas não é essencial.",
    icon: Target,
    border: "border-orange-200",
    bg: "bg-orange-50",
    percentColor: "text-orange-600",
    iconColor: "text-orange-500",
  },
  {
    percent: "20%",
    title: "Economia e objetivos",
    description: "Poupança, investimentos e suas metas financeiras — o dinheiro que trabalha pelo seu futuro.",
    icon: PiggyBank,
    border: "border-green-200",
    bg: "bg-green-50",
    percentColor: "text-green-600",
    iconColor: "text-green-500",
  },
]

type Tip = {
  title: string
  description: string
  icon: React.ElementType
  border: string
  bg: string
  titleColor: string
  iconColor: string
}

const tips: Tip[] = [
  {
    title: "Como economizar no dia a dia",
    description:
      "Pequenos gastos diários somam muito ao fim do mês. Leve lanche de casa, use apps de carona coletiva e compare preços antes de comprar.",
    icon: Lightbulb,
    border: "border-yellow-200",
    bg: "bg-yellow-50",
    titleColor: "text-yellow-700",
    iconColor: "text-yellow-500",
  },
  {
    title: "Como criar metas financeiras",
    description:
      "Defina metas concretas: 'quero guardar R$ 500 em 3 meses'. Divida pelo número de meses e separe esse valor assim que receber o salário.",
    icon: Target,
    border: "border-purple-200",
    bg: "bg-purple-50",
    titleColor: "text-purple-700",
    iconColor: "text-purple-500",
  },
  {
    title: "Por que guardar dinheiro",
    description:
      "Uma reserva de emergência de pelo menos 3 meses de despesas te protege de imprevistos como despesas médicas ou perda de renda.",
    icon: Landmark,
    border: "border-blue-200",
    bg: "bg-blue-50",
    titleColor: "text-blue-700",
    iconColor: "text-blue-500",
  },
  {
    title: "Planejamento financeiro",
    description:
      "Anote tudo que você gasta por uma semana. Você vai se surpreender com onde o dinheiro vai. Use o histórico de transações do app!",
    icon: BarChart3,
    border: "border-green-200",
    bg: "bg-green-50",
    titleColor: "text-green-700",
    iconColor: "text-green-500",
  },
  {
    title: "Primeiros passos para investir",
    description:
      "Com seu primeiro salário, considere abrir uma conta poupança ou investir em Tesouro Selic. Qualquer valor, por menor que seja, já é um começo.",
    icon: TrendingUp,
    border: "border-pink-200",
    bg: "bg-pink-50",
    titleColor: "text-pink-700",
    iconColor: "text-pink-500",
  },
  {
    title: "Organize seu salário",
    description:
      "Assim que receber, separe imediatamente: 1º pague contas fixas, 2º guarde sua meta de economia, 3º o restante é para gastos variáveis.",
    icon: ClipboardList,
    border: "border-orange-200",
    bg: "bg-orange-50",
    titleColor: "text-orange-700",
    iconColor: "text-orange-500",
  },
]

export function FinancialTips() {
  return (
    <section className="w-full">
      <h2 className="mb-4 text-lg font-bold text-foreground">Dicas para cuidar do seu dinheiro</h2>

      <div className="flex flex-col gap-4">
        {/* Card da regra 50/30/20 */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-start gap-3">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-yellow-500" aria-hidden="true" />
            <div>
              <h3 className="font-bold text-foreground">Aprenda a organizar seu salário com a regra 50/30/20</h3>
              <p className="text-sm text-muted-foreground">
                Um método simples usado por milhões de pessoas para controlar as finanças.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {rules.map((rule) => {
              const Icon = rule.icon
              return (
                <div key={rule.title} className={`flex items-center gap-4 rounded-lg border ${rule.border} ${rule.bg} px-4 py-3`}>
                  <span className={`text-xl font-bold ${rule.percentColor}`}>{rule.percent}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <Icon className={`size-4 ${rule.iconColor}`} aria-hidden="true" />
                      <span className={`text-sm font-semibold ${rule.percentColor}`}>{rule.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cards de dicas */}
        {tips.map((tip) => {
          const Icon = tip.icon
          return (
            <div key={tip.title} className={`rounded-xl border ${tip.border} ${tip.bg} p-5`}>
              <div className="flex items-start gap-3">
                <Icon className={`mt-0.5 size-5 shrink-0 ${tip.iconColor}`} aria-hidden="true" />
                <div>
                  <h3 className={`font-bold ${tip.titleColor}`}>{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
