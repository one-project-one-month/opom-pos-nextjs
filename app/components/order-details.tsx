'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { X } from 'lucide-react'
interface OrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  onProceedToPayment: () => void
}

export default function OrderDetailsModal({ isOpen, onClose, onProceedToPayment }: OrderDetailsModalProps) {
  const orders = useSelector((state: any) => state.orderSummary.orders)

  const totalAmount = orders.reduce((total: number, order: any) => {
    return total + parseFloat(order.price) * order.quantity
  }, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-4xl w-full mx-4 md:w-[600px] lg:w-[800px]">
        {/* Header */}
        <div className="flex items-center justify-center p-6 relative">
          <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="absolute right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Order Info */}
        <div className="p-6">
          {/* Order Items Header */}
          <div className="hidden md:flex justify-between font-semibold border-b pb-2 mb-4">
            <span className="w-1/2">Product Name</span>
            <span className="w-1/4 text-right">Price</span>
            <span className="w-1/4 text-center">Qty</span>
            <span className="w-1/4 text-right">Total</span>
          </div>

          <ul className="space-y-3">
            {orders.map((order: any) => (
              <li
                key={order._id || Math.random()}
                className="flex flex-col md:flex-row md:justify-between text-sm md:text-base">
                <span className="md:w-1/2">{order.title}</span>
                <span className="md:w-1/4 md:text-right">
                  {parseFloat(order.price).toLocaleString()} MMK
                </span>
                <span className="md:w-1/4 md:text-center">
                  {order.quantity}
                </span>
                <span className="md:w-1/4 md:text-right">
                  {(parseFloat(order.price) * order.quantity).toLocaleString()}{' '}
                  MMK
                </span>
              </li>
            ))}
          </ul>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-bold text-[#000000]">
                {totalAmount.toLocaleString()} MMK
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                onProceedToPayment()
                onClose()
              }}
              className="flex-1 px-4 py-2 bg-[#FB9E3A] text-white rounded-lg hover:bg-orange-400 transition-colors cursor-pointer"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
