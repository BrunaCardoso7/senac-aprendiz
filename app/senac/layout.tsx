import { AppSidebar } from "@/components/global/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function SenacLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="senac-root h-screen w-full flex flex-col overflow-hidden font-sans">
      <main className="flex flex-col flex-1 overflow-y-auto font-sans">
        {children}
      </main>
    </div>  
  )
}