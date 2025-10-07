import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await axios.get(
    `https://sup-veterans-club-admin.vercel.app/api/read`,
    {
      params: { path },
    }
  );
  return response.data as T;
};

export const useFetchJson = <T>(path: string) => {
  return useQuery<T>({
    queryKey: ["json", path],
    queryFn: () => fetchJson<T>(path),
    staleTime: 1000 * 60 * 5,
  });
};
