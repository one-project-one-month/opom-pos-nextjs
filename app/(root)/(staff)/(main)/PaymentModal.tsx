import CustomBtn from '@/app/components/custom-btn';
import Modal from '@/app/components/modal';
import {
  ModalTypes,
  PaymentMethodTypes,
  PaymentMethodEnum,
} from '@/app/type/type';
import { SetStateAction, Dispatch, ChangeEvent } from 'react';
import PaymentOption from '@/app/components/payment-option';

type PaymentModalProps = {
  paymentMethod: PaymentMethodTypes;
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethodTypes>>;
  setCurrentModal: Dispatch<SetStateAction<ModalTypes>>;
};

function PaymentModal({
  setCurrentModal,
  paymentMethod,
  setPaymentMethod,
}: PaymentModalProps) {
  const handlePaymentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.currentTarget.value as PaymentMethodTypes);
  };
  return (
    <Modal
      onClose={() => setCurrentModal(null)}
      // className="flex flex-col gap-11"
    >
      <h1 className="font-bold text-2xl text-center mt-5">Payment Method</h1>
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
          className="bg-[#FB9E3A] hover:bg-[#E28E34] rounded-xl px-3.5 font-bold"
          onClick={() => setCurrentModal('success')}
        >
          Pay Now
        </CustomBtn>
      </div>
    </Modal>
  );
}

export default PaymentModal;
