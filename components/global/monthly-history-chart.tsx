"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface MonthlyData {
  mes: string
  receita: number
  despesa: number
  saldo: number
}

interface MonthlyHistoryChartProps {
  data: MonthlyData[]
  isLoading?: boolean
  mesAtual: string
  title?: string
}

export function MonthlyHistoryChart({
  data,
  isLoading,
  mesAtual,
 
  title = "Histórico Mensal",
}: MonthlyHistoryChartProps) {
  const mesFormatado = new Date(mesAtual + '-01T00:00:00').toLocaleString('pt-BR', {
    month: 'long', year: 'numeric',
  })

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-md font-semibold text-foreground">
          Trasanções - {mesFormatado}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="h-[350px] flex items-center justify-center text-muted-foreground">
            Carregando...
          </div>
        ) : data.length === 0 ? (
          <div className="h-[350px] flex items-center justify-center text-muted-foreground">
            Nenhuma transação neste mês
          </div>
        ) : (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} tickFormatter={(v) => v.toLocaleString("pt-BR")} />
                <Tooltip
                  contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                  formatter={(value: any) => [value.toLocaleString("pt-BR"), ""]}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={10} />
                <Bar dataKey="receita" name="Receitas" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={60} />
                <Bar dataKey="despesa" name="Despesas" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
