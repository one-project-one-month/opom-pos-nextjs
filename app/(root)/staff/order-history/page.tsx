"use client";
import CustomTable from '@/app/components/custom-table';
import Modal from '@/app/components/modal';

import { ScrollText } from 'lucide-react';
import { useState } from 'react';

import TableTitle from '@/app/components/table-title';
import { useFetchOrderHistory } from '@/app/hooks/useFetchOrderHistory';
import { OrderHistory, OrderHistoryApiResponse } from '@/app/type/orderHistory';
import { format } from 'date-fns';
import { BiLeftArrow } from 'react-icons/bi';
import Link from 'next/link';
import { ROUTES } from '@/app/constants/routes';

function OrderHistoryPage() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { error, isLoading, data } = useFetchOrderHistory<OrderHistoryApiResponse>(page, size);

  const orderHistories = data?.orders?.data || [];

  const viewSlip = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const columns = [
    {
      title: "No",
      key: "id",
      dataIndex: "id",
      render: (value: string, record: OrderHistory, index: number) => (
        <span>{(page - 1) * size + index + 1}</span>
      ),
    },
    {
      title: "Receipt ID",
      key: "order_number",
      dataIndex: "order_number",
    },
    {
      title: "Items Count",
      key: "itemsCount",
      dataIndex: "items",
      render: (items: any[]) => <span>{items.length}</span>
    },
    {
      title: "Staff Name",
      key: "user_name",
      dataIndex: "user",
      render: (user: { name: string }) => <span>{user?.name || "N/A"}</span>
    },
    {
      title: "Total Amount",
      key: "total",
      dataIndex: "total",
    },
    {
      title: "Payment Method",
      key: "paymentMethod",
      dataIndex: "payment",
      render: (payment: { method: string }) => <span>{payment?.method || "N/A"}</span>,

    },
    {
      title: "Time",
      key: "time",
      dataIndex: "created_at",
      render: (created_at: string) => (
        <span>{format(new Date(created_at), 'dd/MM/yyyy hh:mm a')}</span>
      )
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action", // Add a dummy dataIndex to satisfy the type
      render: (_: any, record: any) => (
        <button
          className="text-[#2859C5] text-sm px-2 py-1 rounded hover:text-blue-950 cursor-pointer"
          onClick={() => viewSlip(record)}
        >
          View Slip
        </button>
      ),
    },
  ];

  return (
    <div className='px-12 mb-10'>
      <div>
        <Link
          href={ROUTES.STAFF}
          className="flex items-center gap-2"
        >
          <BiLeftArrow />
          <TableTitle>Order History</TableTitle>
        </Link>
      </div>
      <div className="overflow-x-auto mt-5">
        <div>
          {/* {isLoading && (
            <div className="text-center">
              <Loading />
            </div>
          )} */}
          {error && <p className="text-alert-400">Error loading products</p>}
          {
            !error && (
              <CustomTable
                columns={columns}
                data={orderHistories}
                loading={isLoading}
                pagination={{
                  pageSize: size,
                  currentPage: page,
                  lastPage: data?.orders?.last_page,
                  total: data?.orders?.total,
                  handleOnChange: (newPage, newSize) => {
                    setPage(newPage);
                    setSize(newSize);
                  },
                }}
              />
            )}
        </div>

        {/* Modal rendered ONCE here */}
        {showModal && selectedOrder && (
          <Modal
            onClose={() => setShowModal(false)}
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto"
          >
            <div className="space-y-4">
              <h2 className="flex gap-5 items-center text-2xl font-semibold text-gray-800 ">
                <ScrollText />
                <span>Order Slip</span>
              </h2>
              <div className="text-sm text-gray-500 border-b pb-2 mt-10">
                <span className="font-medium text-gray-700">Order ID:</span>{" "}
                {selectedOrder.order_number}
              </div>

              <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Items Count:</span>
                  <span>{selectedOrder.items?.length}- items</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Staff Name:</span>
                  <span>{selectedOrder.user?.name || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total Amount:</span>
                  <span>{selectedOrder.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment Method:</span>
                  <span>{selectedOrder.payment?.method || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Time:</span>
                  <span>{format(new Date(selectedOrder.created_at), 'dd/MM/yyyy hh:mm a')}</span>
                </div>
              </div>

              <div className="mt-32">
                <button
                  className="w-full py-2 px-4 bg-[#8F8F8F] text-white rounded-lg transition-all duration-200 cursor-pointer"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default OrderHistoryPage;