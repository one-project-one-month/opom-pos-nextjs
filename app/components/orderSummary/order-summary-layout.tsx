'use client';
import OrderSummary from './order-summary';
import { CircleX, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

interface OrderSummaryLayoutProps {
  onCheckoutClick?: () => void;
}

export default function OrderSummaryLayout({
  onCheckoutClick,
}: OrderSummaryLayoutProps) {
  const [isOpenSlide, setIsOpenSlide] = useState(false);
  const orders = useSelector((state: any) => state.orderSummary.orders);
  const totalQuantity = orders.reduce(
    (total: number, order: any) => total + order.quantity,
    0
  );

  return (
    <>
      {/* Responsive Icon */}
      <div className="lg:hidden md:hidden h-[calc(100vh-100px)] w-[20%] p-3 flex items-center justify-center">
        <button
          className="relative cursor-pointer"
          onClick={() => {
            setIsOpenSlide((prev) => !prev);
          }}
        >
          {/* Badge */}
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {totalQuantity}
            </span>
          )}

          {/* Icon */}
          <ShoppingCart stroke="#fb9e3a" size={40} />
        </button>
      </div>
      {/* Order Summary Container */}
      <div
        className={`
          fixed top-[79px] right-[0] h-[calc(100vh-79px)] bg-white
          w-full lg:w-1/3 md:w-1/3
          transition-transform duration-500 ease-in-out
          transform
          ${isOpenSlide ? 'translate-x-0' : 'md:translate-x-0 translate-x-full'}
          lg:translate-x-0
          pt-5 flex flex-col overflow-hidden z-1
        `}
      >
        {isOpenSlide && (
          <button
            className="ms-5 mb-3 lg:hidden md:hidden block"
            onClick={() => {
              setIsOpenSlide((prev) => (!prev ? true : false));
            }}
          >
            <CircleX className="cursor-pointer" />
          </button>
        )}
        <OrderSummary onCheckoutClick={onCheckoutClick} />
      </div>
    </>
  );
}
