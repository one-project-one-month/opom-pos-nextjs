'use client';

import Modal from '@/app/components/modal';
import CustomBtn from '@/app/components/custom-btn';
import { XCircle } from 'lucide-react';

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
};

export function ErrorModal({
  isOpen,
  onClose,
  title = 'Error',
  message,
}: ErrorModalProps) {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose} className="p-12 pb-7 max-w-md w-full h-80">
      <div className="flex flex-col items-center text-center h-full">
        {/* Error Icon */}
        <div className="bg-red-100 p-3 rounded-full mb-6 flex justify-center items-center">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>

        {/* Description */}
        <p className="text-[#9E9E9E] mb-2 text-sm text-center flex-grow">
          {message}
        </p>

        <div className="w-full">
          {/* <hr className="border-[#9E9E9E80] w-full mb-6" /> */}
          <div className="flex gap-3 w-full">
            <CustomBtn
              className="flex-1 bg-white text-red-600 hover:bg-gray-100 border border-red-600"
              onClick={onClose}
            >
              Close
            </CustomBtn>
          </div>
        </div>
      </div>
    </Modal>
  );
}
