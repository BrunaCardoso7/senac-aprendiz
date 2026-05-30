import { Bell } from "lucide-react"

interface NotificationBellProps {
  count: number
}

export function NotificationBell({ count }: NotificationBellProps) {
  return (
    <button className="relative p-2 text-white hover:bg-blue-600 rounded-lg transition-colors">
      <Bell className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </button>
  )
}
