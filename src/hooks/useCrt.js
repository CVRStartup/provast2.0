import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data);
export const useCrt = (id) => {
  const { data, error } = useSWR(`/api/payment/crt?id=${id}`, fetcher);
  return {
    crtPayment: data?.crtPayment,
    isLoading: !error && !data,
    isError: error,
  };
};
