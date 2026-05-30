import { TrendingUp } from "lucide-react"

interface MonthlySummaryProps {
  frequency: string
  hours: string
  balance: string
}

export function MonthlySummary({ frequency, hours, balance }: MonthlySummaryProps) {
  return (
    <div className="rounded-xl border border-blue-400/30 bg-blue-400/10 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-blue-100">Resumo do Mês</h3>
        <button className="p-1 text-blue-200 hover:text-white transition-colors">
          <TrendingUp className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-4">
        <SummaryItem label="Frequência" value={frequency} />
        <SummaryItem label="Horas" value={hours} />
        <SummaryItem label="Saldo" value={balance} />
      </div>
    </div>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-blue-200">{label}</span>
      <span className="text-lg font-bold text-white">{value}</span>
    </div>
  )
}
