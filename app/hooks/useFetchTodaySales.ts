import { useQuery } from "@tanstack/react-query";
import Axios from "../api-config";
import { API } from "../constants/api";

const getTodaySales = async () => {
  const res = await Axios.get(API.totalDay);
  console.log(res.data);
  return res.data; // { total: number }
};

export const useFetchTodaySales = <T>() => {
  return useQuery<T>({
    queryKey: ["todayDay"],
    queryFn: getTodaySales,
  });
};
