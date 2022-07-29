import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.job);
export const useJob = (id) => {
  const { data, error } = useSWR(`/api/jobs/${id}`, fetcher);
  return {
    job: data,
    isLoading: !error && !data,
    isError: error,
  };
};
