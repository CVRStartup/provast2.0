import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.oldAcademic);
export const useSingleAcademic = (id, roll) => {
  const { data, error } = useSWR(
    `/api/auth/user/academics/single?id=${id}&rollNumber=${roll}`,
    fetcher
  );
  return {
    oldAcademic: data,
    isLoading: !error && !data,
    isError: error,
  };
};
