import OrderLists from './order-lists';
import OrderCheckout from './order-checkout';

interface OrderSummaryProps {
  onCheckoutClick?: () => void;
}

export default function OrderSummary({ onCheckoutClick }: OrderSummaryProps) {
  return (
    <>
      <div className=" flex flex-col h-full ">
        <h1 className="ps-4 mb-4 text-[20px] font-semibold">Order Summary</h1>
        <OrderLists />
        <OrderCheckout onCheckoutClick={onCheckoutClick} />
      </div>
    </>
  );
}
