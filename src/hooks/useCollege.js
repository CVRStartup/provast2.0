import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.college);
export const useCollege = (id) => {
  const { data, error } = useSWR(`/api/college/${id}`, fetcher);
  return {
    college: data,
    isLoading: !error && !data,
    isError: error,
  };
};
