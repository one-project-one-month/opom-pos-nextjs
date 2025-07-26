'use client';
import { useDispatch, useSelector } from 'react-redux';
import { setPaidAmount } from '@/app/store/slices/orderSummarySlice';

interface OrderCheckoutProps {
  onCheckoutClick?: () => void;
}

export default function OrderCheckout({ onCheckoutClick }: OrderCheckoutProps) {
  const dispatch = useDispatch();
  const paidAmount = useSelector((state: any) => state.orderSummary.paidAmount);
  const orders = useSelector((state: any) => state.orderSummary.orders);

  const totalAmount = orders.reduce((total: number, order: any) => {
    return total + parseFloat(order.price) * order.quantity;
  }, 0);

  const handlePaidAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : Number(e.target.value);
    dispatch(setPaidAmount(value === '' ? '' : (value as number)));
  };

  const handleCheckoutClick = () => {
    if (orders.length > 0 && onCheckoutClick) {
      onCheckoutClick();
    }
  };

  const isCheckoutDisabled =
    orders.length === 0 ||
    paidAmount === '' ||
    Number(paidAmount) < 0 ||
    Number(paidAmount) < totalAmount;

  return (
    <>
      <div className="px-6 bg-[#f1f1f1] py-3 pe-15">
        <ul>
          <li className="w-full flex flex-col mb-4">
            <label htmlFor="paidAmount" className="text-sm text-gray-600 mb-1">
              Paid Amount
            </label>
            <input
              type="number"
              id="paidAmount"
              value={paidAmount}
              onChange={handlePaidAmountChange}
              placeholder="Enter paid amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB9E3A] focus:border-transparent"
            />
          </li>
          <li className="w-full flex justify-between pt-2">
            <p>Sub Total</p>
            <p>{totalAmount} MMK</p>
          </li>
          {/* <li className="w-full flex justify-between pt-6">
            <p>Discount</p>
          </li> */}
          <li className="w-full flex justify-between py-7">
            <p className="font-bold">Total Amount</p>
            <span className="font-bold">{totalAmount}MMK</span>
          </li>
        </ul>
        <button
          disabled={isCheckoutDisabled}
          onClick={handleCheckoutClick}
          className={`text-white font-bold text-[18px] w-full rounded-[15px] py-[10px] cursor-pointer ${
            isCheckoutDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#FB9E3A] hover:bg-orange-400'
          }`}
        >
          Checkout
        </button>
      </div>
    </>
  );
}
