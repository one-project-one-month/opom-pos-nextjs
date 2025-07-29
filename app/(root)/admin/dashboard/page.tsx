"use client"
import Modal from '@/app/components/modal';
import { Archive, BadgeDollarSign, ScrollText, SquareChartGantt, SquareChevronDown, SquareChevronUp } from 'lucide-react';
import { useState } from 'react'
import CustomTable from '@/app/components/custom-table';
import { format } from 'date-fns';
import { useFetchManagerProducts } from '@/app/hooks/useFetchProduct';
import { ProductsResponse } from '@/app/type/product';
import { useFetchTodaySales } from '@/app/hooks/useFetchTodaySales';
import { useFetchTotalRevenue } from '@/app/hooks/useFetchTotalGain';
import { useFetchRecentSale } from '@/app/hooks/useFetchRecentSale';
import type { RecentSaleApiResponse } from '@/app/types/recentSale';
import Loading from '../../staff/loading';


function DashboardPage() {
  const [value, setValue] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const viewSlip = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const { error, isLoading: loadingRecentSale, data } = useFetchRecentSale<RecentSaleApiResponse>(page, size);
  
  const { data: salesData, isLoading: loadingSales } = useFetchTodaySales<{ total: number }>();
  const { data: revenueData, isLoading: loadingRevenue } = useFetchTotalRevenue<{ total_gain: number }>();
  const { data: inventoryData, isLoading: loadingInventory } = useFetchManagerProducts<ProductsResponse>();

  const isLoading = loadingRecentSale || loadingSales || loadingRevenue || loadingInventory;
  const isError = error  || !salesData || !revenueData || !inventoryData;
  const total = inventoryData?.["count of total products"] ?? 0;
  
  const currentGain = revenueData?.gain || 0;
  const previousGain = revenueData?.previous_month_gain || 0;

const growthPercentage = previousGain
  ? ((currentGain - previousGain) / previousGain) * 100
  : 100;
  const isIncrease = currentGain > previousGain;
  const stats = [
    {
      title: "Today Sales",
      value: isLoading ? <Loading /> : `${salesData} MMK`,
      subtitle: "vs yesterday",
      icon: <SquareChartGantt />,
    },
    {
      title: "Inventory",
      value: isLoading ? <Loading /> : `${total} items`,
      subtitle: "In current stock",
      icon: <Archive />,
    },
    {
      title: "Total Revenues",
      value: isLoading ? <Loading /> : `${revenueData?.gain} MMK`,
      subtitle: (
        <div className="flex justify-between items-center">
          <p>This Month</p>
          <p className="flex items-center gap-1 text-green-500">
            {growthPercentage > 0 ? "+" : ""}
            {growthPercentage.toFixed()}%
            {isIncrease ? (
              <SquareChevronUp className="size-4" />
            ) : (
              <SquareChevronDown className="size-4" />  
            )}
          </p>
        </div>
      ),
      icon: <BadgeDollarSign />,
      highlight: true,
    },
  ];
  

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
        dataIndex: "action",
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
    <div className='lg:pr-12'>
      <div className="flex flex-col md:flex-row items-center gap-3 lg:gap-12 my-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="w-full sm:w-[300px] h-[166px] flex flex-col justify-between hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-10% border-2 p-3 rounded border-[#E28E34]"
        >
          <div className="flex justify-between items-center">
            <p>{stat.title}</p>
            <p>{stat.icon}</p>
          </div>
          <p className={`text-2xl font-bold ${stat.highlight ? "text-green-500" : ""}`}>
            {stat.value}
          </p>
          {typeof stat.subtitle === "string" ? (
            <p>{stat.subtitle}</p>
          ) : (
            stat.subtitle
          )}
        </div>
      ))}
      </div>
      
      <h1 className="text-3xl px-14 mt-5 font-bold">Recent Sales</h1>
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
                    data={data?.orders?.data || []}
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
  )
}

export default DashboardPage;

