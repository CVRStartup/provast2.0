import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.details);
export const useStudentProfile = (id) => {
  const { data, error } = useSWR(`/api/auth/user/userdetails?userId=${id}`, fetcher);
  return {
    studentProfile: data,
    isLoading: !error && !data,
    isError: error,
  };
};
