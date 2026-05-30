import { DashboardHeader } from "@/components/global";
import { BottomNav } from "@/components/global/bottom-nav";
import { useAuth } from "@/context/auth-context";
import { Button } from "@base-ui/react";
import { DollarSign } from "lucide-react";

export default function SignupPage() {
  return (
   <div className=""> 
      <main className="">
        <DashboardHeader
          dayOfMonth={12}
          userId="12345"
          notificationCount={3}
          frequency="98%"
          hours="160h"
          balance="R$ 0"
          dailyTip="Organize suas finanças! Reserve pelo menos 10% do seu salário para emergências."
        />
        <div className="flex-1 p-4 space-y-4">
          {/* Card Minhas Finanças */}
          <Button className="bg-white hover:bg-gray-50 min-w-full rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Minhas Finanças</h3>
              <p className="text-sm text-gray-500">Organize seu dinheiro</p>
            </div>
          </Button>
        </div>
        <BottomNav />
      </main>
    </div>
  )
}
