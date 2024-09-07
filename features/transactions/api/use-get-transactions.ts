import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import { convertAmountFromMiliunits } from "@/lib/utils";

export const useGetTransactions = () => {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data: response } = await api.get("/transactions");

      const { data } = response;

      return data.map((item: any) => ({
        ...item,
        currentAmount: convertAmountFromMiliunits(item.currentAmount),
        totalAmount: convertAmountFromMiliunits(item.totalAmount),
        installmentsAmount: convertAmountFromMiliunits(item.installmentsAmount),
      }));
    },
  });

  return query;
};
