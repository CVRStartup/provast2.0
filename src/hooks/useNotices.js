import axios from "axios";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.notices);
export const useNotices = (user) => {
  const { data, error } = useSWR(
    `/api/notices?collegename=${user?.college?.name}&collegecode=${user?.college?.code}`,
    fetcher
  );
  return {
    notices: data,
    isLoading: !error && !data,
    isError: error,
  };
};
