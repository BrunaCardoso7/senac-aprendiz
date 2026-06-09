import Link from "next/link"
import { quickAccessItems } from "@/lib/quick-access-data"
import { ChevronRight } from "lucide-react"

export function QuickAccess() {
  return (
    <section aria-labelledby="acesso-rapido-titulo" className="w-full mb-24 mt-8">
      <h2 id="acesso-rapido-titulo" className="mb-4 text-xl font-bold text-foreground">
        Acesso Rápido
      </h2>

      <ul className="flex flex-col gap-3">
        {quickAccessItems.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-4 transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                  aria-hidden="true"
                >
                  <Icon className={`size-6 ${item.iconColor}`} />
                </span>

                <span className="flex min-w-0 flex-col">
                  <span className="text-base font-semibold text-foreground">{item.title}</span>
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                </span>

                <ChevronRight
                  className="ml-auto size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}