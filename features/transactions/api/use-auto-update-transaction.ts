import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export const useAutoUpdateTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await api.put(`/transactions/auto-update/${id}`);

      return data;
    },
    onSuccess: () => {
      toast.success("Transação atualizada");
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Falha ao atualizar transação");
    },
  });

  return mutation;
};
