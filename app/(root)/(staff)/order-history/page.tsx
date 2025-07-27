"use client";
import CustomBtn from '@/app/components/custom-btn';
import CustomTable from '@/app/components/custom-table';
import DateFilter from '@/app/components/date-filter';
import Modal from '@/app/components/modal';
import ProductSearch from '@/app/components/products/product-search';

import { ScrollText } from 'lucide-react';
import { useState } from 'react';
import Loading from '../loading';

import { format } from 'date-fns';
import { OrderHistoryApiResponse } from '@/app/type/orderHistory';
import { useFetchOrderHistory } from '@/app/hooks/useFetchOrderHistory';

function OrderHistory() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  
  
  const params = {
    ...(page !== 0 && { page }),
    ...(size !== 0 && { pageSize: size }),
  }

const { error, isLoading, data } = useFetchOrderHistory<OrderHistoryApiResponse>();

const orderHistories = data?.orders?.data || [];


const viewSlip = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  
  // Handle pagination changes
  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const columns = [
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
      render : (user: {name:string}) => <span>{user?.name || "N/A"}</span>
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
      render: (payment: {method:string}) => <span>{payment?.method || "N/A"}</span>,
        
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
    <div>
      <h1 className="text-3xl px-14 mt-5 font-bold">Order History</h1>
      <div className="overflow-x-auto p-12">
        <div>
          {isLoading && (
            <div className="text-center">
              <Loading />
            </div>
          )}
          {error && <p className="text-alert-400">Error loading products</p>}
          {
            !isLoading && !error && (
                <CustomTable 
                    columns={columns} 
                    data={orderHistories}
                    pagination={{
                      pageSize: size,
                      currentPage: data?.orders?.current_page,
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
                  <span>{selectedOrder.items?.length}</span>
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

export default OrderHistory;