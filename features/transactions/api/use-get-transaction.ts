import { api } from "@/lib/api";
import { convertAmountFromMiliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useGetTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const { data: response } = await api.get(`/transactions/${id}`);

      const { data } = response;

      return {
        ...data,
        currentAmount: convertAmountFromMiliunits(data.currentAmount),
        totalAmount: convertAmountFromMiliunits(data.totalAmount),
        installmentsAmount: convertAmountFromMiliunits(data.installmentsAmount),
      };
    },
  });

  return query;
};
