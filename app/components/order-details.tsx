'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Modal from './modal';
import CustomBtn from './custom-btn';
import { useFetchCustomers } from '../hooks/useFetchCustomer';
import { Customer } from '../type/type';
import { ChevronDown, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface OrderDetailsModalProps {
  selectedCustomer: Customer | null;
  setSelectedCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  isOpen: boolean;
  onClose: () => void;
  onProceedToPayment: () => void;
}

const OrderDetailsModal = ({
  selectedCustomer,
  setSelectedCustomer,
  isOpen,
  onClose,
  onProceedToPayment,
}: OrderDetailsModalProps) => {
  const orders = useSelector((state: any) => state.orderSummary.orders);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: customers = [], isLoading, error } = useFetchCustomers();
  // Filter customers based on search term
  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return customers;
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
        <div className="relative" ref={dropdownRef}>
          <input
            type="text"
            id="name"
            name="name"
            className={twMerge(
              'w-full p-3 rounded-lg focus:ring-2 focus:ring-[#FB9E3A] focus:border-transparent transition-colors shadow-sm pr-10',
              selectedCustomer?.id ? 'bg-gray-200' : 'bg-[#F5F5F5]'
            )}
            placeholder="Search member..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsDropdownOpen(true)}
            disabled={selectedCustomer?.id ? true : false}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {!selectedCustomer?.id ? (
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            ) : (
              <X
                className="w-5 h-5 text-gray-500"
                onClick={() => setSelectedCustomer(null)}
              />
            )}
          </div>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
              {isLoading ? (
                <div className="px-4 py-2 text-gray-500">
                  Loading customers...
                </div>
              ) : error ? (
                <div className="px-4 py-2 text-red-500">
                  Error loading customers
                </div>
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(customer.name);
                      setIsDropdownOpen(false);
                      setSelectedCustomer({
                        id: customer.id + '',
                        name: customer.name,
                      });
                    }}
                  >
                    {customer.name}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  No customers found
                </div>
              )}
            </div>
          )}
        </div>
        {/* Order Summary */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount:</span>
            <span className="font-bold text-lg">
              {totalAmount.toLocaleString()} MMK
            </span>
          </div>
          {/* For Discount Percentage */}
          {/* <div className="flex justify-between items-center">
            <span className="text-gray-600">Discount:</span>
            <span className="font-bold text-lg text-alert-300">20%</span>
          </div> */}
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
