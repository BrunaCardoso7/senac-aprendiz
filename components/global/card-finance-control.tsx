import { DollarSign, Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "@base-ui/react";

export default function CardFinanceControl() {
  return (
    <Card className="border-2 border-blue-200 shadow-sm bg-blue-50">
        <CardContent className="flex flex-col items-center justify-center py-2 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
            <DollarSign className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Controle suas finanças!</h3>
        <p className="text-gray-500 mb-8">Adicione uma transação para começar a visualizar seus gastos e receitas.</p>
        <Button className="bg-orange-400 hover:bg-orange-500 flex flex-row items-center py-2 rounded-md font-bold text-white gap-2 px-6">
            <Plus className="h-4 w-4" />
            Criar Primeira Transação
        </Button>
        </CardContent>
    </Card>
  );
}
