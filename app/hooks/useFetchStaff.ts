import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Axios from '../api-config'
import { API, base } from '../constants/api';

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

const suspendStaff = async(id: number) => {
    const url = `${base}suspended/${id}`;
    const res = await Axios.post(url);
    console.log('Staff suspended:', res.data);
    return res;
}

export const useSuspendStaff = (onSuccessCallback?: () => void) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['suspend-staff'],
        mutationFn: (id: number) => suspendStaff(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staffs'] });
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        }
    })

}