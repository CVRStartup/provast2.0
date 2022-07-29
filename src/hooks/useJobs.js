import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.jobs);
export const useJobs = (user) => {
  const { data, error } = useSWR(
    `/api/jobs?collegename=${user?.college?.name}&collegecode=${user?.college?.code}`,
    fetcher
  );
  return {
    jobs: data,
    isLoading: !error && !data,
    isError: error,
  };
};
