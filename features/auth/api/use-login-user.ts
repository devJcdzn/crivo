import { api } from "@/lib/api";
import { FormValues as LoginFormValues } from "@/app/auth/login/_components/login-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setCookie } from "nookies";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoginResponse } from "@/context/auth-context-types";

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const { data: response } = await api.post<LoginResponse>("/auth", data);

      setCookie({}, "crivo@authToken", JSON.stringify(response.token), {
        maxAge: 60 * 60 * 24 * 90, // 90 days
        path: "/",
      });

      return response;
    },
    onSuccess: async () => {
      toast.success("Login Efetuado.");
      router.replace("/dashboard");
    },
    onError: async () => {
      toast.error("Falha ao efetuar o login.");
    },
  });

  return mutation;
};
