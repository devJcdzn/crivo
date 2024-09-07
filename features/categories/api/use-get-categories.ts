import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data: response } = await api.get("/category");

      const { data } = response;
      // console.log(data);
      return data;
    },
  });

  return query;
};
