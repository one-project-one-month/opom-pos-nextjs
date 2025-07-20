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

export default function Home() {
  const [currentModal, setCurrentModal] = useState<ModalTypes>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodTypes>('cash');
  const [orderSuccessDetails, setOrderSuccessDetails] = useState({
    orderId: '123',
    date: new Date().toLocaleDateString('en-GB'),
    time: new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    paymentType: 'KBZ Bank',
    totalAmount: 1500,
    memberName: 'Jayso',
  });

  const handleOrderDetailsOpen = () => {
    setCurrentModal('order-details');
  };

  const handleProceedToPayment = () => {
    setCurrentModal('payment');
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
