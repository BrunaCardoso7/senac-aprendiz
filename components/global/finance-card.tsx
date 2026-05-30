import { Button } from "@base-ui/react";
import { Plus } from "lucide-react";


export default function FinanceCard() {
  return (
    <div className="flex items-center justify-between py-4">
        <h2 className="text-md font-bold text-gray-800">Metas Financeiras</h2>
        <Button className="text-blue-600 hover:text-blue-700 flex text-md flex-row items-center px-6 py-2 rounded-xl hover:bg-blue-50 gap-1">
            <Plus className="h-4 w-4" />
            Adicionar
        </Button>
    </div>
  );
}
