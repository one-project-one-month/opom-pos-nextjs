'use client';
import CategoryList from '@/app/components/category-list';
import ProductList from '@/app/components/products/product-list';
import ProductSearch from '@/app/components/products/product-search';
import OrderSummaryLayout from '@/app/components/orderSummary/order-summary-layout';
import { useState } from 'react';
import PaymentModal from './PaymentModal';
import { ModalTypes, PaymentMethodTypes } from '@/app/type/type';
import Modal from '@/app/components/modal';
import CustomBtn from '@/app/components/custom-btn';
import OrderDetailsModal from '@/app/components/order-details';
import { OrderSuccessModal } from './OrderSuccessModal';
import { ErrorModal } from './ErrorModal';

type ErrorState = {
  isOpen: boolean;
  message: string;
  title?: string;
};

type OrderSuccessDetails = {
  orderId: string;
  date: string;
  time: string;
  paymentType: string;
  totalAmount: number;
  memberName: string;
  receiptNumber: string;
  changeAmount: number;
  paidAmount: number;
};

export default function Home() {
  const [currentModal, setCurrentModal] = useState<ModalTypes>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodTypes>('cash');
  const [error, setError] = useState<ErrorState>({
    isOpen: false,
    message: '',
  });
  const [orderSuccessDetails, setOrderSuccessDetails] =
    useState<OrderSuccessDetails>({
      orderId: '',
      date: new Date().toLocaleDateString('en-GB'),
      time: new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      paymentType: 'Cash',
      totalAmount: 0,
      memberName: 'Guest',
      receiptNumber: '',
      changeAmount: 0,
      paidAmount: 0,
    });

  const handleOrderDetailsOpen = () => {
    setCurrentModal('order-details');
  };

  const handleProceedToPayment = () => {
    setCurrentModal('payment');
  };

  const handlePaymentSuccess = (response: any) => {
    const { data } = response;

    setOrderSuccessDetails((prev) => ({
      ...prev,
      orderId: data.order.order_number,
      receiptNumber: data.receipt_number,
      totalAmount: parseFloat(data.total_amount),
      changeAmount: parseFloat(data.change_amount),
      paidAmount: parseFloat(data.paid_amount), // Assuming the amount is in cents
      date: new Date(data.order.created_at).toLocaleDateString('en-GB'),
      time: new Date(data.order.created_at).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      memberName: data.order.customer?.name || 'Guest',
      paymentType: 'Cash',
    }));

    setCurrentModal('success');
  };

  const handleError = (message: string, title: string = 'Error') => {
    setError({ isOpen: true, message, title });
    setCurrentModal('error');
  };

  const closeError = () => {
    setError({ isOpen: false, message: '' });
    setCurrentModal(null);
  };

  return (
    <>
      <div className="flex  items-start max-w-full min-h-screen h-screen ">
        <div className="lg:w-2/3 md:w-2/3 w-[80%] h-screen p-5 flex flex-col border-r border-[#9E9E9ECC]">
          <div className="space-y-5">
            <ProductSearch />
            <CategoryList />
          </div>
          <div className="flex-1 min-h-0 mt-3 sm:mt-5">
            <ProductList />
          </div>
        </div>
        <OrderSummaryLayout onCheckoutClick={handleOrderDetailsOpen} />
      </div>

      {/* Order Details Modal */}
      {currentModal === 'order-details' && (
        <OrderDetailsModal
          isOpen={true}
          onClose={() => setCurrentModal(null)}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {/* Error Modal */}
      <ErrorModal
        isOpen={currentModal === 'error' && error.isOpen}
        onClose={closeError}
        title={error.title}
        message={error.message}
      />

      {/* Order Modal */}
      {currentModal === 'order' && (
        <Modal onClose={() => setCurrentModal(null)}>
          <CustomBtn
            onClick={() => setCurrentModal('payment')}
            className="bg-[#FB9E3A]"
          >
            Go to payment modal
          </CustomBtn>
        </Modal>
      )}
      {/* Payment Modal */}
      {currentModal === 'payment' && (
        <PaymentModal
          setCurrentModal={setCurrentModal}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onError={handleError}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {/* Order Success Modal */}
      {currentModal === 'success' && (
        <OrderSuccessModal
          isOpen={true}
          onClose={() => setCurrentModal(null)}
          orderDetails={orderSuccessDetails}
        />
      )}
    </>
  );
}
