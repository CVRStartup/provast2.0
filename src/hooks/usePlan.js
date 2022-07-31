import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export const usePlan = (id) => {
  const { data, error } = useSWR(`/api/payment/${id}`, fetcher);
  return {
    payment: data?.payment,
    isLoading: !error && !data,
    isError: error,
  };
};
