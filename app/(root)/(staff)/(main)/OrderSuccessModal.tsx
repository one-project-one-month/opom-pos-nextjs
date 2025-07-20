'use client';

import Modal from '@/app/components/modal';
import CustomBtn from '@/app/components/custom-btn';
import { Check, CheckCircle2 } from 'lucide-react';

type OrderSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderId: string;
    date: string;
    time: string;
    paymentType: string;
    totalAmount: number;
    memberName: string;
  };
};

export function OrderSuccessModal({
  isOpen,
  onClose,
  orderDetails,
}: OrderSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} className="p-12 pb-7 max-w-md w-full">
      <div className="flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="bg-success-300 p-3 rounded-full mb-10 d-flex justify-center items-center">
          <Check className="h-10 w-10 text-white" />
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Payment Successful
        </h1>

        {/* Description */}
        <p className="text-[#9E9E9E] mb-6 text-sm text-center">
          This payment receipt has been sent to your admin dashboard and you can
          go and check the sale report.
        </p>

        <hr className="border-[#9E9E9E80] w-full mb-6" />

        {/* Order Details */}
        <div className="w-full space-y-3 mb-6 text-sm">
          <div className="flex justify-between">
            <span>Order ID:</span>
            <span>{orderDetails.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{orderDetails.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Time:</span>
            <span>{orderDetails.time}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Type:</span>
            <span>{orderDetails.paymentType}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span>{orderDetails.totalAmount.toLocaleString()} MMK</span>
          </div>
          <div className="flex justify-between">
            <span>Member:</span>
            <span>{orderDetails.memberName}</span>
          </div>
        </div>
        {/* Button Group */}
        <div className="flex gap-4 w-full">
          <CustomBtn className="flex-1 bg-[#FB9E3A] hover:bg-[#E28E34] rounded-xl px-3.5 font-bold">
            Print Recipt
          </CustomBtn>
          <CustomBtn
            className="flex-1 bg-[#8F8F8F] hover:bg-[#767676] rounded-xl px-3.5 font-bold"
            onClick={onClose}
          >
            Close
          </CustomBtn>
        </div>
      </div>
    </Modal>
  );
}
