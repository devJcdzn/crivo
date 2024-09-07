import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<any>({
    mutationFn: async () => {
      const { data } = await api.delete(`/transactions/${id}`);

      return data;
    },
    onSuccess: () => {
      toast.success("Transação deletada");
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Falha ao deletar transação");
    },
  });

  return mutation;
};
