import { Phone } from "lucide-react"

type Contact = {
  name: string
  phone: string
}

const contacts: Contact[] = [
  { name: "Coordenação Senac", phone: "(11) 3555-0100" },
  { name: "Disque 100 — Direitos Humanos", phone: "100" },
  { name: "Central de Atendimento à Mulher", phone: "180" },
  { name: "Centro de Valorização da Vida", phone: "188" },

]

export function UsefulContacts() {
  return (
    <section aria-labelledby="contatos-titulo" className="space-y-3">
      <h3 id="contatos-titulo" className="text-base font-bold text-foreground">
        Contatos Úteis
      </h3>

      <ul className="space-y-3">
        {contacts.map((contact) => (
          <li key={contact.name}>
            <a
              href={`tel:${contact.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-50">
                <Phone className="size-5 text-green-600" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span className="font-semibold text-foreground">{contact.name}</span>
                <span className="text-sm font-medium text-blue-600">{contact.phone}</span>
              </span>
              <Phone className="ml-auto size-5 text-green-600" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
