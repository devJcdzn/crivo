import { api } from "@/lib/api";
import { convertAmountFromMiliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const query = useQuery({
    queryKey: ["summary", { from, to }],
    queryFn: async () => {
      const { data } = await api.get("/summary");

      return {
        ...data,
        remaingAmount: convertAmountFromMiliunits(data.remaingAmount),
        incomeAmount: convertAmountFromMiliunits(data.incomeAmount),
        expensesAmount: convertAmountFromMiliunits(data.expensesAmount),
        toReceive: convertAmountFromMiliunits(data.toReceive),
        totalBalance: convertAmountFromMiliunits(data.totalBalance),
        categories: data.categories.map((category: any) => ({
          ...category,
          value: convertAmountFromMiliunits(category.value),
        })),
        days: data.days.map((day: any) => ({
          ...day,
          income: convertAmountFromMiliunits(day.income),
          expenses: convertAmountFromMiliunits(day.expenses),
        })),
      };
    },
  });

  return query;
};
