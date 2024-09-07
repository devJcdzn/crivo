import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      console.log(data);
      const { data: response } = await api.post("/transactions", data);

      return response;
    },
    onSuccess: () => {
      toast.success("Transação Criada");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.success("Erro ao criar transação");
    },
  });

  return mutation;
};
