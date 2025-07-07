'use client';
import CategoryList from '@/app/components/category-list';
import ProductList from '@/app/components/product-list';
import ProductSearch from '@/app/components/product-search';
import OrderSummaryLayout from '@/app/components/orderSummary/order-summary-layout'
import { useState } from 'react';
import PaymentModel from './PaymentModal';
import { ModalTypes, PaymentMethodTypes } from '@/app/type/type';
import Modal from '@/app/components/modal';
import CustomBtn from '@/app/components/custom-btn';

export default function Home() {
  const [currentModal, setCurrentModal] = useState<ModalTypes>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodTypes>('cash');
  return (
    <>
      <div className="flex justify-center items-start max-w-[1280px] mx-auto min-h-screen h-screen">
        <div className="w-2/3 h-screen p-5 flex flex-col border-r border-[#9E9E9ECC]">
          <div className="space-y-5">
            <ProductSearch />
            <CategoryList />
          </div>
          <div className="flex-1 min-h-0 mt-5">
            <ProductList />
          </div>
        </div>
        <OrderSummaryLayout />
        <div className="w-1/3 h-screen">
          Order Summary & Checkout{' '}
          <CustomBtn
            onClick={() => setCurrentModal('order')}
            className="bg-[#FB9E3A]"
          >
            Open Modal
          </CustomBtn>
        </div>
      </div>
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
        <PaymentModel
          setCurrentModal={setCurrentModal}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      )}
      {/* Success Modal */}
      {currentModal === 'success' && (
        <Modal onClose={() => setCurrentModal(null)}>
          <CustomBtn
            onClick={() => setCurrentModal(null)}
            className="bg-[#FB9E3A]"
          >
            Close
          </CustomBtn>
        </Modal>
      )}
    </>
  );
}
