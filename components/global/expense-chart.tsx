"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Definir as cores para cada categoria
const categoryColors: Record<string, string> = {
  salario: "#22c55e",      // verde
  transporte: "#3b82f6",   // azul
  alimentacao: "#f97316",  // laranja
  lazer: "#a855f7",        // roxo
  educacao: "#06b6d4",     // ciano
  saude: "#ef4444",        // vermelho
  moradia: "#eab308",      // amarelo
  compras: "#ec4899",      // rosa
  outras: "#6b7280",       // cinza
}

const categoryLabels: Record<string, string> = {
  salario: "Salário",
  transporte: "Transporte",
  alimentacao: "Alimentação",
  lazer: "Lazer",
  educacao: "Educação",
  saude: "Saúde",
  moradia: "Moradia",
  compras: "Compras",
  outras: "Outras",
}

interface ExpenseData {
  categoria: string
  valor: number
}

interface ExpenseChartProps {
  data: ExpenseData[]
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  // Agrupar dados por categoria
  const groupedData = data.reduce((acc, item) => {
    const existing = acc.find((d) => d.categoria === item.categoria)
    if (existing) {
      existing.valor += item.valor
    } else {
      acc.push({ ...item })
    }
    return acc
  }, [] as ExpenseData[])

  // Preparar dados para o gráfico
  const chartData = groupedData.map((item) => ({
    name: categoryLabels[item.categoria] || item.categoria,
    value: item.valor,
    fill: categoryColors[item.categoria] || "#6b7280",
  }))

  // Criar configuração do gráfico dinamicamente
  const chartConfig: ChartConfig = groupedData.reduce((acc, item) => {
    acc[item.categoria] = {
      label: categoryLabels[item.categoria] || item.categoria,
      color: categoryColors[item.categoria] || "#6b7280",
    }
    return acc
  }, {} as ChartConfig)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  if (chartData.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="pb-0">
          <CardTitle>Gastos por Categoria</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center py-10">
          <p className="text-muted-foreground text-sm">
            Nenhum gasto registrado ainda
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Gastos por Categoria</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(Number(value))}
                  hideLabel
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        
        {/* Legenda customizada */}
        <div className="mt-4 space-y-2 pb-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="ml-auto text-sm font-medium">
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
