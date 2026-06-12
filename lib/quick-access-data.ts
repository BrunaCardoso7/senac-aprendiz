import { Calendar, DollarSign, FileCheck, FileText, Gift, HeartHandshake, HelpCircle, Scale } from "lucide-react";

export const quickAccessItems: any[] = [
  {
    id: "direitos",
    title: "Meus Direitos",
    description: "Conheça seus direitos trabalhistas",
    href: "/senac/seus-direitos",
    icon: Scale,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    id: "financas",
    title: "Minhas Finanças",
    description: "Organize seu dinheiro",
    href: "/senac/financas",
    icon: DollarSign,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
//   {
//     id: "calendario",
//     title: "Calendário",
//     description: "Veja seus compromissos",
//     href: "/senac/home",  // ajuste se tiver rota própria
//     icon: Calendar,
//     iconColor: "text-purple-600",
//     iconBg: "bg-purple-50",
//   },
  {
    id: "apoio",
    title: "Canal de Apoio",
    description: "Estamos aqui para ajudar",
    href: "/senac/suporte",
    icon: HeartHandshake,
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50",
  },
  {
    id: "duvidas",
    title: "Dúvidas Frequentes",
    description: "Respostas rápidas",
    href: "/senac/duvidas",
    icon: HelpCircle,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
//   {
//     id: "beneficios",
//     title: "Benefícios",
//     description: "Veja seus benefícios",
//     href: "/senac/home",  // ajuste se tiver rota própria
//     icon: Gift,
//     iconColor: "text-orange-600",
//     iconBg: "bg-orange-50",
//   },
  {
    id: "documentos",
    title: "Documentos",
    description: "Gerencie seus documentos",
    href: "/senac/documentos",
    icon: FileText,
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
  },
  {
    id: "contrato",
    title: "Meu Contrato",
    description: "Informações do contrato",
    href: "/senac/perfil",  // ajuste se tiver rota própria
    icon: FileCheck,
    iconColor: "text-slate-600",
    iconBg: "bg-slate-100",
  },
]