import { TrendingUp, TrendingDown } from "lucide-react"

interface BalanceCardProps {
  saldoDisponivel?: number
  receitas?: number
  despesas?: number
}

export function BalanceCard({
  saldoDisponivel = 0,
  receitas = 0,
  despesas = 0,
}: BalanceCardProps) {
  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <div className="w-full">
      <div className="bg-[#1a6bb5] rounded-2xl p-6">
        {/* Saldo Disponível */}
        <div className="mb-6">
          <p className="text-white/80 text-sm mb-1">Saldo Disponível</p>
          <p className="text-white text-3xl font-bold">{formatCurrency(saldoDisponivel)}</p>
        </div>

        {/* Cards de Receitas e Despesas */}
        <div className="grid grid-cols-2 gap-4">
          {/* Receitas */}
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">Receitas</span>
            </div>
            <p className="text-white text-lg font-semibold">{formatCurrency(receitas)}</p>
          </div>

          {/* Despesas */}
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-sm">Despesas</span>
            </div>
            <p className="text-white text-lg font-semibold">{formatCurrency(despesas)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
