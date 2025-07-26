import {     useQuery } from '@tanstack/react-query'
import Axios from '../api-config'
import { API } from '../constants/api';

const getStaffs = async () => {
    try {
        const res = await Axios.get(API.staffs);
        // console.log('Fetched staffs:', res.data.Cashier List);

        return res.data["Cashier List"];

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const useFetchStaffs = <T>() => {
    return useQuery<T>({
        queryKey: ['staffs'],
        queryFn: () => getStaffs(),
    })
}