import { UserX, AlertCircle, Frown, TriangleAlert, Clock, Shield } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Category = {
  icon: LucideIcon
  title: string
  description: string
  iconClass: string
  bgClass: string
}

const categories: Category[] = [
  {
    icon: UserX,
    title: "Assédio Moral",
    description: "Humilhação, xingamentos, perseguição",
    iconClass: "text-red-500",
    bgClass: "bg-red-50",
  },
  {
    icon: AlertCircle,
    title: "Assédio Sexual",
    description: "Insinuações, toques inapropriados",
    iconClass: "text-pink-500",
    bgClass: "bg-pink-50",
  },
  {
    icon: Frown,
    title: "Abuso Psicológico",
    description: "Pressão excessiva, ameaças",
    iconClass: "text-purple-500",
    bgClass: "bg-purple-50",
  },
  {
    icon: TriangleAlert,
    title: "Discriminação",
    description: "Preconceito racial, religioso, de gênero",
    iconClass: "text-amber-500",
    bgClass: "bg-amber-50",
  },
  {
    icon: Clock,
    title: "Exploração no Trabalho",
    description: "Excesso de horas, tarefas inadequadas",
    iconClass: "text-orange-500",
    bgClass: "bg-orange-50",
  },
  {
    icon: Shield,
    title: "Outros Problemas",
    description: "Outras situações irregulares",
    iconClass: "text-slate-500",
    bgClass: "bg-slate-100",
  },
]

export function ReportCategories() {
  return (
    <section aria-labelledby="categorias-titulo" className="space-y-3">
      <h3 id="categorias-titulo" className="text-base font-bold text-foreground">
        Categorias de Denúncia
      </h3>

      <ul className="space-y-3">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <li key={category.title}>
              <button
                type="button"
                className="flex w-full items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 text-left shadow-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${category.bgClass}`}
                >
                  <Icon className={`size-5 ${category.iconClass}`} aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="font-semibold text-foreground">{category.title}</span>
                  <span className="text-sm text-muted-foreground">{category.description}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
