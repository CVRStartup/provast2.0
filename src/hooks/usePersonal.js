import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.personal);
export const usePersonal = (id) => {
  const { data, error } = useSWR(`/api/auth/user/personal?userId=${id}`, fetcher);
  return {
    personal: data,
    isLoading: !error && !data,
    isError: error,
  };
};
