import Image from 'next/image';
import { ChangeEvent } from 'react';
import { PaymentMethodEnum } from '@/app/type/type';

export type PaymentOptionProps = {
  value: PaymentMethodEnum;
  label: string;
  description?: string;
  iconSrc: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export default function PaymentOption({
  value,
  label,
  description,
  iconSrc,
  checked,
  onChange,
}: PaymentOptionProps) {
  return (
    <div className="flex flex-row-reverse w-full justify-between py-7 px-5 bg-[#f5f5f5] rounded-xl">
      <input
        value={value}
        id={value}
        type="radio"
        name="payment"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 self-center"
      />
      <div className="flex gap-2.5 items-start flex-1">
        <Image src={iconSrc} width={24} height={24} alt={`${label} icon`} />
        <div className="flex flex-col gap-4 flex-1">
          <label htmlFor={value} className="font-semibold w-full">
            {label}
          </label>
          {description && (
            <label htmlFor={value} className="text-sm w-full">
              {description}
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
