import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.resumes);
export const useResumes = (user) => {
  const { data, error } = useSWR(`/api/resume/user?userId=${user?._id}`, fetcher);
  return {
    resumes: data,
    isLoading: !error && !data,
    isError: error,
  };
};
