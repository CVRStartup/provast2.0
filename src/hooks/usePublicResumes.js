import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.resumes);
export const usePublicResumes = (user) => {
  const { data, error } = useSWR(`/api/resume/getpublicresume?id=${user?._id}`, fetcher);
  return {
    publicResumes: data,
    isLoading: !error && !data,
    isError: error,
  };
};
