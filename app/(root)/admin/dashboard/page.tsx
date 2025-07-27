"use client"
import Modal from '@/app/components/modal';
import { Archive, BadgeDollarSign, ScrollText, SquareChartGantt, SquareChevronUp } from 'lucide-react';
import { useState } from 'react'

function DashboardPage() {
  const [value, setValue] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const viewSlip = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const stats = [
  {
    title: "Today Sales",
    value: "12,000 MMK",
    subtitle: "vs yesterday",
    icon: <SquareChartGantt />,
  },
  {
    title: "Inventory",
    value: "10,332 items",
    subtitle: "In current stock",
    icon: <Archive />,
  },
  {
    title: "Total Revenues",
    value: "12,000 MMK",
    subtitle: (
      <div className="flex justify-between items-center">
        <p>This Month</p>
        <p className="flex items-center gap-1 text-green-500">
          +20%
          <SquareChevronUp className="size-4" />
        </p>
      </div>
    ),
    icon: <BadgeDollarSign />,
    highlight: true,
  },
];
  const orders = [
        { 
            id: 123456789, 
            itemsCount: 12, 
            staffName: 'John', 
            totalAmount: '30000 MMK', 
            paymentMethod: 'Cash', 
            time: '02/07/2025' 
        },
        { 
            id: 123456789, 
            itemsCount: 8, 
            staffName: 'Jane', 
            totalAmount: '20000 MMK', 
            paymentMethod: 'Card', 
            time: '02/07/2025' 
        },
        { 
            id: 123456789, 
            itemsCount: 15, 
            staffName: 'Doe', 
            totalAmount: '45000 MMK', 
            paymentMethod: 'Cash', 
            time: '02/07/2025' 
        },
        { 
            id: 123456789, 
            itemsCount: 10, 
            staffName: 'Alice', 
            totalAmount: '35000 MMK', 
            paymentMethod: 'Card', 
            time: '02/07/2025' 
        },
        { 
            id: 123456789, 
            itemsCount: 20, 
            staffName: 'Bob', 
            totalAmount: '50000 MMK', 
            paymentMethod: 'Cash', 
            time: '02/07/2025' 
        }
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
      <div className="overflow-x-auto ">
        <h3 className='text-xl font-bold mb-5'>Recent Sales</h3>
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="*:font-medium *:text-gray-900">

                                  <th className="px-3 py-2 whitespace-nowrap">
                                      <span className='flex items-center gap-1'>
                                          Receipt Id Number
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                          </svg>
                                      </span>
                                  </th>
                                  <th className="px-3 py-2 whitespace-nowrap">
                                      <span className='flex items-center gap-1'>
                                          Items Count
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                          </svg>
                                      </span>
                                  </th>
                                  <th className="px-3 py-2 whitespace-nowrap">
                                      <span className='flex items-center gap-1'>
                                          Staff Name
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                          </svg>
                                      </span>
                                  </th>
                                  <th className="px-3 py-2 whitespace-nowrap">
                                      <span className='flex items-center gap-1'>
                                          Total Amount
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                          </svg>
                                      </span>
                                  </th>
                                  <th className="px-3 py-2 whitespace-nowrap">
                                      <span className='flex items-center gap-1'>
                                          Payment Method
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                          </svg>
                                      </span>
                                  </th>
                                  <th className="px-3 py-2 whitespace-nowrap">
                                      <span className='flex items-center gap-1'>
                                          Time
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                                          </svg>
                                      </span>
                                  </th>
                                  <th className="px-3 py-2 whitespace-nowrap">Action</th>

                              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
              {
                orders.map((order,index) => (
                   <tr key={index} className="*:text-gray-900 *:first:font-medium h-12 hover:bg-gray-100 transition-colors cursor-pointer">
                      <td className="px-3 py-2 whitespace-nowrap">{order.id}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{order.itemsCount}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{order.staffName}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{order.totalAmount}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{order.paymentMethod}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{order.time}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                          <button
                            className={`px-2 py-1 rounded z-10  text-sm cursor-pointer"
                            ${selectedOrder === order.id ? "text-blue-950" : "text-[#2859C5]"}`}
                            onClick={() => viewSlip(order)}
                          >
                              Viewslip
                          </button>
                      </td>
                    </tr>                   
                  ))  }
            </tbody>
        </table>
        <div className='flex gap-3 justify-between items-center mt-5 px-5'>
                    <ul className="flex justify-start gap-1 text-gray-900">
                        
                        <li>
                            <label htmlFor="Page" className='flex items-center gap-2'>
                                <span className='text-gray-600 text-sm'>Items per page:</span>
                                <span className="sr-only"> Page </span>

                                <input
                                    type="number"
                                    id="Page"
                                    value={value}
                                    onChange={e => setValue(Number(e.target.value))}
                                    className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
                                />
                                <span className='text-gray-600 text-sm'>1-5 of 100 items</span>
                            </label>
                        </li>

                        
                    </ul>
                                
                    <ul className="flex items-center gap-3 text-gray-900">
                        <li>
                            <label htmlFor="Page">
                                <span className="sr-only"> Page </span>

                                <input
                                    type="number"
                                    id="Page"
                                    value={value}
                                    onChange={e => setValue(Number(e.target.value))}
                                    className="h-8 w-16 px-2 rounded border border-gray-200 sm:text-sm"
                                />
                                <span className='text-gray-600 text-sm'> of 40 pages </span>
                            </label>
                        </li>

                        <li>
                            <a
                            href="#"
                            className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
                            aria-label="Previous page"
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </a>
                        </li>
                        <li>
                            <a
                            href="#"
                            className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
                            aria-label="Next page"
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </a>
                        </li>
                    </ul>
        </div>

        {/* Modal rendered ONCE here */}
        {showModal && selectedOrder && (
          <Modal onClose={() => setShowModal(false)} className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm mx-auto">
          <div className="space-y-4">
            <h2 className="flex gap-5 items-center text-2xl font-semibold text-gray-800 ">
              <ScrollText /> 
              <span>Order Slip</span>
            </h2>
            <div className="text-sm text-gray-500 border-b pb-2 mt-10">
              <span className="font-medium text-gray-700">Order ID:</span> {selectedOrder.id}
            </div>

            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Items Count:</span>
                <span>{selectedOrder.itemsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Staff Name:</span>
                <span>{selectedOrder.staffName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span>${selectedOrder.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment Method:</span>
                <span>{selectedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{selectedOrder.time}</span>
              </div>
            </div>

            <div className="mt-32">
              <button
                className="w-full py-2 px-4 bg-[#8F8F8F] text-white rounded-lg transition-all duration-200"
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

export default DashboardPage