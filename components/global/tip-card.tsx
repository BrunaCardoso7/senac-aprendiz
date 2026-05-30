interface TipCardProps {
  title: string
  description: string
}

export function TipCard({ title, description }: TipCardProps) {
  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 p-6">
      <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
      <p className="text-white text-sm">{description}</p>
    </div>
  )
}
