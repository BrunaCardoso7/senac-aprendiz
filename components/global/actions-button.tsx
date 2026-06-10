import { AlertCircle, MessageCircle } from "lucide-react"

export function ActionButtons() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <button
        type="button"
        className="flex flex-col items-center gap-2 rounded-xl bg-red-500 px-6 py-5 text-center font-semibold text-white shadow-sm transition-colors hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      >
        <AlertCircle className="size-6" aria-hidden="true" />
        Fazer Denúncia
      </button>

      <button
        type="button"
        className="flex flex-col items-center gap-2 rounded-xl bg-blue-500 px-6 py-5 text-center font-semibold text-white shadow-sm transition-colors hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <MessageCircle className="size-6" aria-hidden="true" />
        Pedir Ajuda
      </button>
    </div>
  )
}
