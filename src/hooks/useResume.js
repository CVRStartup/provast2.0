import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.resume);
export const useResume = (id) => {
  const { data, error } = useSWR(`/api/resume/${id}`, fetcher);
  return {
    resume: data,
    isLoading: !error && !data,
    isError: error,
  };
};
