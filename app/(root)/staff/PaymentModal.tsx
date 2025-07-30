import CustomBtn from '@/app/components/custom-btn';
import Modal from '@/app/components/modal';
import { SetStateAction, Dispatch, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentOption from '@/app/components/payment-option';
import { orderService } from '@/app/services/orderService';
import { RootState } from '@/app/store/store';
import {
  clearPaidAmount,
  clearOrders,
} from '@/app/store/slices/orderSummarySlice';
import { useFetchPaymentMethods } from '@/app/hooks/useFetchPayments';
import { Customer } from '@/app/type/type';
import { base, imgBase } from '@/app/constants/api';

type PaymentModalProps = {
  paymentMethod: number | null;
  customer: Customer | null;
  setPaymentMethod: Dispatch<SetStateAction<number | null>>;
  onClose: () => void;
  onError: (message: string, title?: string) => void;
  onSuccess: (response: any) => void;
};

function PaymentModal({
  paymentMethod,
  onClose,
  setPaymentMethod,
  customer,
  onError,
  onSuccess,
}: PaymentModalProps) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { orders, paidAmount } = useSelector(
    (state: RootState) => state.orderSummary
  );

  const {
    data: paymentMethods = [],
    isLoading: paymentMethodsLoading,
    error: paymentMethodsError,
    refetch: refetchPaymentMethods,
  } = useFetchPaymentMethods();

  const handlePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(Number(event.currentTarget.value));
  };

  const handlePayNow = async () => {
    if (!paidAmount || paidAmount <= 0) {
      onError('Please enter a valid payment amount.');
      return;
    }

    if (orders.length === 0) {
      onError('No items in the order. Please add items before payment.');
      return;
    }

    if (paymentMethod === null) {
      onError('Please select a payment method.');
      return;
    }

    const orderItems = orders.map((order) => ({
      product_id: parseInt(order.id),
      quantity: order.quantity,
    }));

    try {
      setIsLoading(true);
      const response = await orderService.createOrder({
        items: orderItems,
        paid_amount: Number(paidAmount),
        payment_id: paymentMethod,
        customer_id: customer?.id || null,
      });

      // Clear the cart and paid amount on successful payment
      dispatch(clearOrders());
      dispatch(clearPaidAmount());

      // Call the success handler with the response
      onSuccess(response);
    } catch (error: any) {
      console.error('Payment failed:', error);
      onError(
        error.response?.data?.message || 'Payment failed. Please try again.',
        'Payment Failed'
      );
    } finally {
      setIsLoading(false);
    }
  };
  const isPayNowButtonDisabled =
    isLoading ||
    !paymentMethod ||
    paymentMethodsLoading ||
    !!paymentMethodsError;
  return (
    <Modal onClose={onClose}>
      <h1 className="font-bold text-2xl text-center mt-5 mb-6">
        Payment Method
      </h1>
      <div className="flex flex-col gap-[0.711rem] flex-1">
        {paymentMethodsLoading ? (
          <div className="flex-1 flex items-center justify-center min-h-[15rem]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FB9E3A]"></div>
          </div>
        ) : paymentMethodsError ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4 min-h-[15rem]">
            <p className="text-red-500 mb-2">Failed to load payment methods</p>
          </div>
        ) : paymentMethods.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500 min-h-[15rem]">
            No payment methods available
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col gap-[0.711rem] max-h-[20rem]">
            {paymentMethods.map((payment, index) => (
              <div key={payment.id}>
                <PaymentOption
                  iconSrc={imgBase + payment.photo}
                  value={payment.id}
                  label={payment.method}
                  checked={payment.id === paymentMethod}
                  onChange={handlePaymentChange}
                />
                {index !== paymentMethods.length - 1 && (
                  <hr className="border-[#9E9E9E80] mt-[0.711rem]" />
                )}
              </div>
            ))}
          </div>
        )}
        {paymentMethodsError ? (
          <CustomBtn
            className={`bg-[#FB9E3A] hover:bg-[#E28E34] rounded-xl px-3.5 font-bold`}
            onClick={() => refetchPaymentMethods()}
          >
            Retry
          </CustomBtn>
        ) : (
          <CustomBtn
            className={`bg-[#FB9E3A] hover:bg-[#E28E34] rounded-xl px-3.5 font-bold ${
              isPayNowButtonDisabled ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            onClick={handlePayNow}
            disabled={isPayNowButtonDisabled}
          >
            {isLoading ? 'Processing...' : 'Pay Now'}
          </CustomBtn>
        )}
      </div>
    </Modal>
  );
}

export default PaymentModal;
