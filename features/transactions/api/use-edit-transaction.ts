import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export const useEditTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: any) => {
      console.log(json);
      const { data } = await api.put(`/transactions/${id}`, json);

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
