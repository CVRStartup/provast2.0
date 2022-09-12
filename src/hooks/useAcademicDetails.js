import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.filteredAcademics);
export const useAcademicDetails = (rollNumber, id) => {
  const { data, error } = useSWR(
    `/api/auth/user/academics/edit?rollNumber=${rollNumber}&id=${id}`,
    fetcher
  );
  return {
    academic: data,
    isLoading: !error && !data,
    isError: error,
  };
};
