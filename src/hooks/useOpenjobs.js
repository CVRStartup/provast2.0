import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.openjobs);

export const useOpenjobs = (user) => {
  const { data, error } = useSWR(
    `/api/openjobs`,
    fetcher
  );
  return {
    openjobs: data,
    isLoading: !error && !data,
    isError: error,
  };
};
