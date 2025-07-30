'use client';

import { use, useMemo, useState } from 'react';
import { useFetchCustomerDetail } from '@/app/hooks/useFetchCustomerDetail';
import toast from 'react-hot-toast';

const Page = ({ params }: { params: Promise<{ memberId: string }> }) => {
  const resolvedParams = use(params);
  const memberId = resolvedParams.memberId;
  const [filter, setFilter] = useState('all');
  // Fetch customer details
  const { data: customer, isLoading, error } = useFetchCustomerDetail(memberId);
  if (error) {
    console.error('Error fetching customer:', error);
    toast.error('Failed to load member details');
  }

  const filteredOrders = useMemo(() => {
    if (!customer) return [];
    if (filter === 'all') return customer.customer_orders;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return customer.customer_orders.filter((order) => {
      const orderDate = new Date(order.created_at);
      const orderYear = orderDate.getFullYear();
      const orderMonth = orderDate.getMonth();

      switch (filter) {
        case 'this_month':
          return orderYear === currentYear && orderMonth === currentMonth;

        case 'last_month':
          if (currentMonth === 0) {
            return orderYear === currentYear - 1 && orderMonth === 11;
          }
          return orderYear === currentYear && orderMonth === currentMonth - 1;

        case 'this_year':
          return orderYear === currentYear;

        case 'last_year':
          return orderYear === currentYear - 1;

        default:
          return true;
      }
    });
  }, [customer, filter]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[15rem]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-3 border-[#FB9E3A]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4 min-h-[15rem]">
        <p className="text-red-500 mb-2">Failed to load member details</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mt-3 text-2xl mb-1.5">
        Member Name: {customer?.customer_detail.name}
      </h1>
      <p className="mb-1">Phone Number: {customer?.customer_detail.phone}</p>
      <p className="mb-1">Email Address: {customer?.customer_detail.email}</p>
      <div className="flex justify-end mb-11">
        <div className="border-[1px] border-[#FB9E3A] rounded-sm px-4">
          <select
            name="filter"
            id="order-filter"
            className="py-4 focus:outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Orders</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="this_year">This Year</option>
            <option value="last_year">Last Year</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="">Order Id</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="">Payment</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="">Total</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="">Paid</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="">Change</span>
              </th>
              <th className="px-3 py-2 whitespace-nowrap">
                <span className="">Date</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 whitespace-nowrap">{order.id}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {order.payment_id}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {order.total} MMK
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {order.paid_amount} MMK
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {order.change_amount} MMK
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {new Date(order.created_at).toISOString().split('T')[0]}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
