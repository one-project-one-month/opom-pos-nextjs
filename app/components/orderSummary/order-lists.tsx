'use client'
import { useSelector, useDispatch } from 'react-redux'
import { Trash2, PlusCircle, CircleMinus, MinusCircle } from 'lucide-react'

import {
  increaseQuantity,
  removeOrder,
  decreaseQuantity,
} from '@/app/store/slices/orderSummarySlice'

export default function OrderLists() {
  const orders = useSelector((state: any) => state.orderSummary.orders)
  const dispatch = useDispatch()

  console.log(orders);
  

  if (orders.length === 0) {
    return <p className="font-bold px-5 flex-2/3">No Orders</p>
  }

  return (
    <div className="flex-2/3 min-h-0 overflow-hidden px-5">
      {/* Fixed Header */}
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="text-left p-1">Items</th>
            <th className="text-center p-1">Qty</th>
            <th className="text-center p-1">Price</th>
            <th className="text-left p-1"></th>
          </tr>
        </thead>
      </table>

      {/* Scrollable Body */}
      <div className="h-[90%] overflow-y-auto no-scrollbar">
        <table className="w-full table-fixed">
          <tbody>
            {orders.map((order: any, i: number) => (
              <tr key={i}>
                <td className="py-2 text-left break-words max-w-[150px]">
                  {order.name}
                </td>
                <td className="p-2 text-left">
                  <div className="flex items-center justify-center">
                    <button
                      className={`cursor-pointer ${
                        order.quantity > 1 ? 'block' : 'invisible'
                      }`}
                      onClick={() =>
                        dispatch(decreaseQuantity({ id: order.id }))
                      }>
                      <MinusCircle
                        fill="#fb9e3a"
                        color="white"
                        strokeWidth={2}
                      />
                    </button>

                    <span className="mx-2"> {order.quantity}</span>
                    <button 
                      className={`cursor-pointer ${
                        order.quantity < order.stock ? 'block' : 'invisible'
                      }`}
                      onClick={() =>
                        dispatch(increaseQuantity({ id: order.id }))
                      }>
                      <PlusCircle
                        fill="#fb9e3a"
                        color="white"
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                </td>
                <td className="p-2 text-center">{parseFloat(order.price)}</td>
                <td className="p-2 text-center">
                  <button
                    onClick={() => dispatch(removeOrder({ id: order.id }))}>
                    <Trash2 className="cursor-pointer" size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
