interface DailyTipProps {
  tip: string
}

export function DailyTip({ tip }: DailyTipProps) {
  return (
    <div className="rounded-xl bg-orange-500 p-4">
      <h4 className="text-sm font-semibold text-white">Dica do dia</h4>
      <p className="mt-1 text-sm text-orange-100">{tip}</p>
    </div>
  )
}
