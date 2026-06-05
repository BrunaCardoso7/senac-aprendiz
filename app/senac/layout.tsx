import { BottomNav } from "@/components/global/bottom-nav"

export default function SenacLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="senac-root h-screen w-full flex flex-col overflow-hidden font-sans">
      <main className="flex flex-col flex-1 overflow-y-auto font-sans" suppressHydrationWarning> 
        {children}
         <BottomNav />
      </main>
    </div>  
  )
}