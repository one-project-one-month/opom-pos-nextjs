'use client';

import Modal from '@/app/components/modal';
import CustomBtn from '@/app/components/custom-btn';
import { Check } from 'lucide-react';
import { useReactToPrint } from "react-to-print";
import { useRef } from 'react';

type OrderSuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    orderId: string;
    receiptNumber: string;
    date: string;
    time: string;
    paymentType: string;
    totalAmount: number;
    memberName: string;
    changeAmount: number;
    paidAmount: number;
  };
};

export function OrderSuccessModal({
  isOpen,
  onClose,
  orderDetails,
}: OrderSuccessModalProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Print Document",
  });


  if (!isOpen) return null;

  return (
    <Modal
      onClose={onClose}
      className="px-4 py-7 max-w-md w-full overflow-y-auto"
    >
      <div className="flex flex-col items-center text-center">
        <div ref={componentRef} className="px-3 flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="bg-success-300 p-3 rounded-full mb-5 d-flex justify-center items-center">
            <Check className="h-10 w-10 text-white" />
          </div>

          {/* Header */}
          <h1 className="text-2xl font-bold text-center mb-3">
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
              <span>Receipt ID:</span>
              <span className="font-medium">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium">{orderDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-medium">{orderDetails.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Type:</span>
              <span className="font-medium">{orderDetails.paymentType}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-medium">
                {orderDetails.totalAmount.toLocaleString()} MMK
              </span>
            </div>
            <div className="flex justify-between">
              <span>Paid Amount:</span>
              <span className="font-medium">
                {orderDetails.paidAmount.toLocaleString()} MMK
              </span>
            </div>
            <div className="flex justify-between">
              <span>Change Amount:</span>
              <span className="font-medium text-green-600">
                {orderDetails.changeAmount.toLocaleString()} MMK
              </span>
            </div>
            <div className="flex justify-between">
              <span>Member:</span>
              <span className="font-medium">{orderDetails.memberName}</span>
            </div>
          </div>
        </div>

        {/* Button Group */}
        <div className="flex gap-4 w-full">
          <CustomBtn onClick={handlePrint} className="flex-1 bg-[#FB9E3A] hover:bg-[#E28E34] rounded-xl px-3.5 font-bold">
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
