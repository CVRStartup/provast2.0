import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.academics);
export const useAcademic = (roll) => {
  const { data, error } = useSWR(`/api/auth/user/academics?rollNumber=${roll}`, fetcher);
  return {
    academics: data,
    isLoading: !error && !data,
    isError: error,
  };
};
