import { BalanceCard } from "@/components/global/balance-card";
import CardFinanceControl from "@/components/global/card-finance-control";
import CardGoals from "@/components/global/card-goals";
import EducationDetail from "@/components/global/education-detail";
import FinanceCard from "@/components/global/finance-card";
import { Button } from "@base-ui/react";
import { CirclePlus } from "lucide-react";
export default function SignupPage() {
  return (
   <div className="flex-1 mt-6 px-4 py-24 space-y-6">
    <BalanceCard
      saldoDisponivel={1000}
      receitas={500}
      despesas={200}
    />
    <Button
      type="submit"
      className="w-full h-12 bg-[#e67e22] hover:bg-[#d35400] flex justify-center items-center gap-6 text-white font-semibold rounded-lg mt-6"
    >
      <CirclePlus className="h-4 w-4" />
      Adicionar Transação
    </Button>
    <FinanceCard />
    <CardGoals />
    <CardFinanceControl />
    <EducationDetail />
  </div>
  )
}
