"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  ReferenceLine,
  Label,
  LabelList,
  YAxis,
  RadialBarChart,
  PolarAngleAxis,
  RadialBar,
  AreaChart,
  Area,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { useSearchParams } from "next/navigation";
import {
  convertAmountFromMiliunits,
  formatCurrency,
  formatDateRange,
  generateRandomTones,
  getLastSevenDaysStats,
} from "@/lib/utils";

export default function HomePage() {
  const { data, isLoading } = useGetSummary();
  const {
    days,
    averageIncome,
    averageExpenses,
    totalAverage,
  } = getLastSevenDaysStats(data?.days);

  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRangeLabel = formatDateRange({ to, from });

  console.log(data);

  if (isLoading) {
    return <div className="w-full h-full">Is Loading...</div>;
  }

  return (
    <div
      className="chart-wrapper mx-auto flex max-w-7xl flex-col flex-wrap
      items-start justify-center gap-6 px-6 py-3 sm:flex-row sm:p-8"
    >
      <div
        className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem]
        lg:grid-cols-1 xl:max-w-[25rem]"
      >
        <Card className="lg:max-w-md" x-chunk="charts-01-chunk-0">
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Resumo</CardDescription>
            <CardTitle className="text-4xl tabular-nums">
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                R${" "}
              </span>
              {formatCurrency(data.totalBalance, { addPrefix: false })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                averageDay: {
                  label: "Valor",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: -4,
                  right: -4,
                }}
                data={days.map((day) => ({
                  ...day,
                  averageDay: day.income - day.expenses,
                  fill:
                    day.income - day.expenses > 0
                      ? "hsl(var(--primary))"
                      : "hsl(var(--foreground))",
                }))}
              >
                <Bar
                  dataKey="averageDay"
                  radius={5}
                  fillOpacity={0.6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      weekday: "short",
                    });
                  }}
                />
                <ChartTooltip
                  defaultIndex={2}
                  content={
                    <ChartTooltipContent
                      hideIndicator
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                  cursor={false}
                />
                <ReferenceLine
                  y={0}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                >
                  <Label
                    position="insideBottomLeft"
                    value="Linha Base"
                    offset={10}
                    fill="hsl(var(--foreground))"
                  />
                  <Label
                    position="insideTopLeft"
                    value="0"
                    className="text-lg"
                    fill="hsl(var(--foreground))"
                    offset={10}
                    startOffset={100}
                  />
                </ReferenceLine>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardDescription>
              Nesse período, você arrecadou{" "}
              <span className="font-medium text-foreground">
                {formatCurrency(data.remaingAmount, { addPrefix: false })}
              </span>{" "}
              líquidos.
            </CardDescription>
            <CardDescription>
              Isso é{" "}
              <span className="font-medium text-foreground">
                {data.remainingPercentage}%
              </span>{" "}
              em relação ao último período.
            </CardDescription>
          </CardFooter>
        </Card>
        <Card className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1">
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
            <CardDescription>Panorama de Vendas</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              <span className="text-sm font-normal tracking-normal text-muted-foreground">
                R$
              </span>
              {formatCurrency(data.incomeAmount)}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-1 items-center">
            <ChartContainer
              config={{
                income: {
                  label: "Valor",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="w-full"
            >
              <LineChart
                accessibilityLayer
                margin={{
                  left: 14,
                  right: 14,
                  top: 10,
                  bottom: 10,
                }}
                data={data.days}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.5}
                />
                <YAxis hide domain={["dataMin - 100", "dataMax + 10"]} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-br", {
                      weekday: "short",
                    });
                  }}
                  hide
                />
                <Line
                  dataKey="income"
                  type="natural"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    fill: "hsl(var(--primary))",
                    stroke: "hsl(var(--primary))",
                    r: 4,
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                  cursor={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid w-full flex-1 gap-6 lg:max-w-[20rem]">
        <Card className="max-w-md" x-chunk="charts-01-chunk-2">
          <CardHeader>
            <CardTitle>Progresso</CardTitle>
            <CardDescription>
              Média de vendas e gastos desse período.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {data.incomePercentage}%
                <span className="text-sm font-normal text-muted-foreground">
                  em vendas
                </span>
              </div>
              <ChartContainer
                config={{
                  amount: {
                    label: "Valor",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: "2024",
                      amount: 12435,
                    },
                  ]}
                >
                  <Bar
                    dataKey="amount"
                    fill="hsl(var(--primary))"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="date"
                      offset={8}
                      fontSize={12}
                      fill="black"
                    />
                  </Bar>
                  <YAxis dataKey="date" type="category" tickCount={1} hide />
                  <XAxis dataKey="amount" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {data.expensesPercentage}%
                <span className="text-sm font-normal text-muted-foreground">
                  em gastos
                </span>
              </div>
              <ChartContainer
                config={{
                  amount: {
                    label: "Valor",
                    color: "hsl(var(--muted))",
                  },
                }}
                className="aspect-auto h-[32px] w-full"
              >
                <BarChart
                  accessibilityLayer
                  layout="vertical"
                  margin={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  data={[
                    {
                      date: "2023",
                      amount: 10103,
                    },
                  ]}
                >
                  <Bar
                    dataKey="amount"
                    fill="hsl(var(--muted))"
                    radius={4}
                    barSize={32}
                  >
                    <LabelList
                      position="insideLeft"
                      dataKey="date"
                      offset={8}
                      fontSize={12}
                      fill="hsl(var(--muted-foreground))"
                    />
                  </Bar>
                  <YAxis dataKey="date" type="category" tickCount={1} hide />
                  <XAxis dataKey="amount" type="number" hide />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-md" x-chunk="charts-01-chunk-3">
          <CardHeader className="p-4 pb-1">
            <CardTitle>Valor a Receber</CardTitle>
            <CardDescription>
              Todo o valor restante a ser recebido no período.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              <span className="text-sm font-normal text-muted-foreground">
                R$
              </span>
              {formatCurrency(data.toReceive, { addPrefix: false })}
            </div>
          </CardContent>
        </Card>
        <Card className="max-w-md" x-chunk="charts-01-chunk-3">
          <CardHeader className="p-4 pb-0">
            <CardTitle>Gastos por categoria</CardTitle>
            <CardDescription>Gastos por categoria no período.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3 p-4 pb-0">
            <ChartContainer
              config={data.categories.reduce(
                (acc: any, category: any, index: number) => {
                  const chartColors = [
                    "hsl(var(--chart-1))",
                    "hsl(var(--chart-2))",
                    "hsl(var(--chart-3))",
                    "hsl(var(--chart-4))",
                    "hsl(var(--chart-5))",
                  ];
                  acc[category.name] = {
                    label: category.name,
                    color: chartColors[index % chartColors.length],
                  };
                  return acc;
                },
                {}
              )}
              className="h-[140px] w-full"
            >
              <BarChart
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
                data={data.categories}
                layout="vertical"
                barSize={32}
                barGap={2}
              >
                <XAxis type="number" dataKey="value" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  tickMargin={4}
                  axisLine={false}
                  className="capitalize"
                />
                <Bar dataKey="value" radius={5}>
                  <LabelList
                    position="insideLeft"
                    dataKey="value"
                    fill="white"
                    offset={8}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-row border-t p-4">
            <div className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-xs text-muted-foreground">Outros</div>
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                <span className="text-sm font-normal text-muted-foreground">
                  R$
                </span>
                {formatCurrency(data.categories[3]?.value, {
                  addPrefix: false,
                }) || "0,00"}
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="grid w-full flex-1 gap-6">
        <Card className="max-w-xl" x-chunk="charts-01-chunk-5">
          <CardContent className="flex gap-4 p-4">
            <div className="grid items-center gap-3">
              {data.members.map((member: any) => (
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">
                    {member.role === "OWNER" ? "Dono" : "Usuário"}
                  </div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    {member.name.split(" ")[0]}
                  </div>
                </div>
              ))}
            </div>
            <ChartContainer
              config={{
                ...data.members.reduce(
                  (acc: any, member: any, index: number) => ({
                    ...acc,
                    [member.name.split(" ")[0].toLowerCase()]: {
                      label: member.name.split(" ")[0],
                      color: `hsl(var(--chart-${index + 1}))`,
                    },
                  }),
                  {}
                ),
              }}
              className="mx-auto aspect-square w-full max-w-[60%]"
            >
              <RadialBarChart
                margin={{
                  left: -10,
                  right: -10,
                  top: -10,
                  bottom: -10,
                }}
                data={data.members.map((member: any) => ({
                  totalTransactionValue: member.totalTransactionValue,
                  value: convertAmountFromMiliunits(
                    member.totalTransactionValue
                  ),
                  fill: generateRandomTones(),
                }))}
                innerRadius="20%"
                barSize={18}
                startAngle={90}
                endAngle={450}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, data.remaingAmount]}
                  dataKey="value"
                  tick={false}
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="max-w-md overflow-hidden" x-chunk="charts-01-chunk-7">
          <CardHeader className="space-y-0 pb-0">
            <CardDescription>Panorama de gastos</CardDescription>
            <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                R$
              </span>
              {formatCurrency(data.expensesAmount, { addPrefix: false })}
              <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                /preíodo
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={{
                time: {
                  label: "Time",
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <AreaChart
                accessibilityLayer
                data={data.days}
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <XAxis
                  dataKey="date"
                  hide
                  domain={["dataMin + 20", "dataMax + 20"]}
                />
                <YAxis domain={["dataMin + 20", "dataMax + 50"]} hide />
                <defs>
                  <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="expenses"
                  type="natural"
                  fill="url(#fillTime)"
                  fillOpacity={0.4}
                  stroke="hsl(var(--primary))"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                  formatter={(value) => (
                    <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                      Gastos
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        <span className="font-normal text-muted-foreground">
                          R$
                        </span>
                        {value}
                      </div>
                    </div>
                  )}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
