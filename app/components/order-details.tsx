'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import Modal from './modal';
import CustomBtn from './custom-btn';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: () => void;
}

const OrderDetailsModal = ({
  isOpen,
  onClose,
  onProceedToPayment,
}: OrderDetailsModalProps) => {
  const orders = useSelector((state: any) => state.orderSummary.orders);

  const totalAmount = orders.reduce((total: number, order: any) => {
    return total + parseFloat(order.price) * order.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} className="p-12 pb-7 flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-6">Order Details</h1>
      <div className="flex flex-col flex-1 min-h-0">
        <div className="overflow-hidden flex flex-col h-full">
          {/* Table Header */}
          <div className="flex-shrink-0">
            <table className="w-full table-fixed">
              <thead>
                <tr className="text-left">
                  <th className="overflow-x-hidden whitespace-nowrap text-ellipsis pb-2">
                    Product Name
                  </th>
                  <th className="overflow-x-hidden whitespace-nowrap text-ellipsis text-center pb-2">
                    Quantity
                  </th>
                  <th className="overflow-x-hidden whitespace-nowrap text-ellipsis text-right pb-2">
                    Total Price
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          {/* Scrollable Table Body */}
          <div className="flex-1 overflow-y-auto min-h-56 max-h-56">
            <table className="w-full table-fixed border-separate border-spacing-y-3.5">
              <tbody>
                {orders.map((order: any) => (
                  <tr
                    key={order._id || Math.random()}
                    className="text-sm text-[#737373] hover:bg-gray-50 rounded-md group"
                  >
                    <td className="overflow-x-hidden whitespace-nowrap text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible group-hover:w-auto group-hover:max-w-fit group-hover:z-10 group-hover:relative p-0">
                      {order.name}
                    </td>
                    <td className="pl-6 overflow-x-hidden whitespace-nowrap text-ellipsis p-0">
                      {order.price} MMK &times; {order.quantity}
                    </td>
                    <td className="overflow-x-hidden whitespace-nowrap text-ellipsis text-right p-0">
                      {(
                        parseFloat(order.price) * order.quantity
                      ).toLocaleString()}{' '}
                      MMK
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full bg-[#F5F5F5] p-3 rounded-lg focus:ring-2 focus:ring-[#FB9E3A] focus:border-transparent transition-colors shadow-sm"
          placeholder="Enter member name"
        />
        {/* Order Summary */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount:</span>
            <span className="font-bold text-lg">
              {totalAmount.toLocaleString()} MMK
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Discount:</span>
            <span className="font-bold text-lg text-alert-300">20%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-bold text-lg">
              {totalAmount.toLocaleString()} MMK
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6">
          <CustomBtn
            onClick={onProceedToPayment}
            className="w-full bg-[#FB9E3A] hover:bg-[#E28E34] text-white py-3 rounded-lg font-medium"
          >
            Proceed to Payment
          </CustomBtn>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
