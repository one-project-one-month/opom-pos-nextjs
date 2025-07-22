import CustomBtn from '@/app/components/custom-btn';
import Modal from '@/app/components/modal';
import {
  ModalTypes,
  PaymentMethodTypes,
  PaymentMethodEnum,
} from '@/app/type/type';
import { SetStateAction, Dispatch, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentOption from '@/app/components/payment-option';
import { orderService } from '@/app/services/orderService';
import { RootState } from '@/app/store/store';
import { clearPaidAmount, clearOrders } from '@/app/store/slices/orderSummarySlice';

type PaymentModalProps = {
  paymentMethod: PaymentMethodTypes;
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethodTypes>>;
  setCurrentModal: Dispatch<SetStateAction<ModalTypes>>;
  onError: (message: string, title?: string) => void;
  onSuccess: (response: any) => void;
};

function PaymentModal({
  setCurrentModal,
  paymentMethod,
  setPaymentMethod,
  onError,
  onSuccess,
}: PaymentModalProps) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { orders, paidAmount } = useSelector((state: RootState) => state.orderSummary);

  const handlePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.currentTarget.value as PaymentMethodTypes);
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

    const orderItems = orders.map(order => ({
      product_id: parseInt(order.id),
      quantity: order.quantity,
    }));

    try {
      setIsLoading(true);
      const response = await orderService.createOrder({
        items: orderItems,
        paid_amount: Number(paidAmount),
        payment_method: paymentMethod,
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
  return (
    <Modal
      onClose={() => setCurrentModal(null)}
      // className="flex flex-col gap-11"
    >
      <h1 className="font-bold text-2xl text-center mt-5 mb-6">
        Payment Method
      </h1>
      <div className="flex flex-col gap-[0.711rem]">
        <PaymentOption
          value={PaymentMethodEnum.Cash}
          label="Cash Payment"
          iconSrc="/assets/cash.svg"
          checked={paymentMethod === PaymentMethodEnum.Cash}
          onChange={handlePaymentChange}
        />
        <hr className="border-[#9E9E9E80]" />
        <PaymentOption
          value={PaymentMethodEnum.DigitalWallet}
          label="Digital Wallet Payment"
          description="KBZPay, AYA Pay & WavePay"
          iconSrc="/assets/digital-wallet.svg"
          checked={paymentMethod === PaymentMethodEnum.DigitalWallet}
          onChange={handlePaymentChange}
        />
        <hr className="border-[#9E9E9E80]" />
        <PaymentOption
          value={PaymentMethodEnum.CreditCard}
          label="Credit Card"
          description="Visa, Mastercard & MPU-UnionPay"
          iconSrc="/assets/visa.svg"
          checked={paymentMethod === PaymentMethodEnum.CreditCard}
          onChange={handlePaymentChange}
        />
        <CustomBtn
          className={`bg-[#FB9E3A] hover:bg-[#E28E34] rounded-xl px-3.5 font-bold ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={handlePayNow}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </CustomBtn>
        

      </div>
    </Modal>
  );
}

export default PaymentModal;
