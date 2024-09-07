import { IUser } from "@/context/auth-context-types";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetUserData = (userId?: string) => {
  const query = useQuery({
    queryKey: ["user", { userId }],
    queryFn: async () => {
      const { data: response } = await api.get<{ user: IUser }>(
        `/users/${userId ?? ""}`
      );

      const { user } = response;
      return user;
    },
  });

  return query;
};
