import axios from "axios";
import useSWR from "swr";
const fetcher = (url) =>
  axios.get(url).then((res) => res.data.details.filter((x) => x.category === "student"));
export const useStudents = (user) => {
  const { data, error } = useSWR(
    `/api/auth/user/details?collegeCode=${user?.college?.code}`,
    fetcher
  );
  return {
    students: data,
    isLoading: !error && !data,
    isError: error,
  };
};
