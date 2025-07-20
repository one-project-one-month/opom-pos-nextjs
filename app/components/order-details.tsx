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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-center p-3 sm:p-4 md:p-6 relative border-b border-gray-200">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Order Details</h2>
          <button
            onClick={onClose}
            className="absolute right-3 sm:right-4 md:right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Order Info */}
        <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          {/* Order Items Header */}
          <div className="hidden sm:flex justify-between font-semibold border-b pb-2 mb-4 text-sm md:text-base">
            <span className="w-2/5 sm:w-1/2">Product Name</span>
            <span className="w-1/5 sm:w-1/4 text-right">Price</span>
            <span className="w-1/5 sm:w-1/4 text-center">Qty</span>
            <span className="w-1/5 sm:w-1/4 text-right">Total</span>
          </div>

          {/* Mobile Header */}
          <div className="sm:hidden font-semibold border-b pb-2 mb-4 text-sm">
            <span>Order Items</span>
          </div>

          <ul className="space-y-2 sm:space-y-3">
            {orders.map((order: any) => (
              <li
                key={order._id || Math.random()}
                className="border-b border-gray-100 pb-2 sm:pb-0 sm:border-b-0">
                
                {/* Mobile Layout */}
                <div className="sm:hidden space-y-1 text-sm">
                  <div className="font-medium text-gray-900">{order.name}</div>
                  <div className="flex justify-between text-gray-600">
                    <span>Price: {parseFloat(order.price).toLocaleString()} MMK</span>
                    <span>Qty: {order.quantity}</span>
                  </div>
                  <div className="text-right font-semibold text-gray-900">
                    Total: {(parseFloat(order.price) * order.quantity).toLocaleString()} MMK
                  </div>
                </div>

                {/* Desktop/Tablet Layout */}
                <div className="hidden sm:flex justify-between items-center text-sm md:text-base">
                  <span className="w-2/5 sm:w-1/2 font-medium">{order.name}</span>
                  <span className="w-1/5 sm:w-1/4 text-right">
                    {parseFloat(order.price).toLocaleString()} MMK
                  </span>
                  <span className="w-1/5 sm:w-1/4 text-center">
                    {order.quantity}
                  </span>
                  <span className="w-1/5 sm:w-1/4 text-right font-medium">
                    {(parseFloat(order.price) * order.quantity).toLocaleString()} MMK
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {/* Order Summary */}
          <div className="border-t pt-3 sm:pt-4 mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm sm:text-base">Total Amount:</span>
              <span className="font-bold text-[#000000] text-base sm:text-lg md:text-xl">
                {totalAmount.toLocaleString()} MMK
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4 sm:mt-6">
            <button
              onClick={onProceedToPayment}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-[#FB9E3A] text-white rounded-lg hover:bg-orange-400 transition-colors cursor-pointer text-sm sm:text-base font-medium"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
