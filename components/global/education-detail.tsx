import { Lightbulb } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function EducationDetail() {
  return (
    <Card className="border-0 shadow-sm bg-orange-500">
        <CardContent className="flex items-start gap-3 py-5 px-5">
        <div className="flex-shrink-0 mt-0.5">
            <Lightbulb className="h-5 w-5 text-yellow-200" />
        </div>
        <div>
            <h4 className="font-semibold text-white mb-1">Dica de Educação Financeira</h4>
            <p className="text-orange-100 text-sm">
            Regra 50-30-20: Use 50% para necessidades, 30% para desejos e 20% para poupança e investimentos.
            </p>
        </div>
        </CardContent>
    </Card>
    );
}
