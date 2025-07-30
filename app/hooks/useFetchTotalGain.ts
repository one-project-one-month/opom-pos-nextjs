import { useQuery } from "@tanstack/react-query";
import Axios from "../api-config";
import { API } from "../constants/api";

const getTotalRevenue = async () => {
  const res = await Axios.get(API.totalGain);
  console.log(res.data);
  return res.data; // { total_gain: number }
};

export const useFetchTotalRevenue = <T>() => {
  return useQuery<T>({
    queryKey: ["totalGain"],
    queryFn: getTotalRevenue,
  });
};
export type TotalRevenueResponse = {
  gain: number;
};