import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: response } = await api.post("/category", data);

      return response;
    },
    onSuccess: () => {
      toast.success("Categoria criada");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast.error("Falha ao criar categoria");
    },
  });

  return mutation;
};
