import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type CustomProps = {
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CustomBtn({
  className = '',
  children,
  ...rest
}: CustomProps) {
  return (
    <button
      className={twMerge(
        'text-white rounded-sm sm:px-2.5 px-3 sm:py-2 py-1 cursor-pointer',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
