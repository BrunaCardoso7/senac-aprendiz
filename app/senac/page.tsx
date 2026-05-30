'use client';
import { DashboardHeader } from "@/components/global";
import { BottomNav } from "@/components/global/bottom-nav";
import { useAuth } from "@/context/auth-context";
import { Button } from "@base-ui/react";
import { DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";
export default function SignupPage() {
  const router = useRouter();
  return (
      <div className="flex-1 p-4 space-y-4">
        <Button 
          className="bg-white hover:bg-gray-50 min-w-full rounded-2xl p-4 flex items-center gap-4 shadow-sm"
          onClick={() => router.push('/senac/financas')}
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Minhas Finanças</h3>
            <p className="text-sm text-gray-500">Organize seu dinheiro</p>
          </div>
        </Button>
      </div>
  )
}
