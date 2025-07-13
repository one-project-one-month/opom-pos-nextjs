
'use client';
import CategoryList from '@/app/components/category-list';
import ProductList from '@/app/components/product-list';
import ProductSearch from '@/app/components/product-search';
import OrderSummary from '@/app/components/orderSummary/order-summary';
import { useState } from 'react';
import PaymentModel from './PaymentModal';
import { ModalTypes, PaymentMethodTypes } from '@/app/type/type';
import Modal from '@/app/components/modal';
import CustomBtn from '@/app/components/custom-btn';

export default function Home() {
  const [currentModal, setCurrentModal] = useState<ModalTypes>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodTypes>('cash')

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
        
        {/* Order Summary Section */}
        <div className="w-full lg:w-1/3 h-[40vh] lg:h-screen flex flex-col bg-white lg:bg-transparent">
          <OrderSummary />
        </div>
      </div>
      {/* Order Modal */}
      {currentModal === 'order' && (
        <Modal onClose={() => setCurrentModal(null)}>
          <CustomBtn
            onClick={() => setCurrentModal('payment')}
            className="bg-[#FB9E3A]">
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
            className="bg-[#FB9E3A]">
            Close
          </CustomBtn>
        </Modal>
      )}
    </>
  );

}
