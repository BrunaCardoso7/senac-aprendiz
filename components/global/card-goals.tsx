import { Plus, Target } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "@base-ui/react";

export default function CardGoals() {
  return (
    <Card className="border-purple-300 border-2 bg-purple-50 shadow-sm mb-4">
        <CardContent className="flex flex-col items-center justify-center py-2 px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center  justify-center ">
            <Target className="h-8 w-8 text-purple-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Defina suas metas!</h3>
        <p className="text-gray-500 mb-6">Crie metas financeiras para alcançar seus objetivos.</p>
        <Button className="bg-purple-500 hover:bg-purple-600 flex flex-row items-center rounded-md font-bold text-white gap-2 py-2 px-6">
            <Plus className="h-4 w-4 font-bold" />
            Criar Primeira Meta
        </Button>
        </CardContent>
    </Card>
  );
}
