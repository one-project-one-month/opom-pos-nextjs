'use client'
import { useState } from 'react'
import { useSelector } from 'react-redux'

interface OrderCheckoutProps {
  onCheckoutClick?: () => void
}

export default function OrderCheckout({ onCheckoutClick }: OrderCheckoutProps) {
  const orders = useSelector((state: any) => state.orderSummary.orders)

  const totalAmount = orders.reduce((total: number, order: any) => {
    return total + parseFloat(order.price) * order.quantity
  }, 0)

  const handleCheckoutClick = () => {
    if (orders.length > 0 && onCheckoutClick) {
      onCheckoutClick()
    }
  }

  return (
    <>
      <div className="px-6 bg-[#f1f1f1] py-8 pe-15">
        <ul>
          <li className="w-full flex justify-between">
            <p>Sub Total</p>
            <p>{totalAmount}MMK</p>
          </li>
          <li className="w-full flex justify-between pt-6">
            <p>Discount</p>
          </li>
          <li className="w-full flex justify-between py-7">
            <p className="font-bold">Total Amount</p>
            <span className="font-bold">{totalAmount}MMK</span>
          </li>
        </ul>
        <button
          disabled={orders.length === 0}
          onClick={handleCheckoutClick}
          className={`text-white font-bold text-[18px] w-full rounded-[15px] py-[10px] cursor-pointer ${
            orders.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#FB9E3A] hover:bg-orange-400'
          }`}>
          Checkout
        </button>
      </div>
    </>
  )
}
