import { cn } from '@/lib/utils';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-8 py-3 bg-[#50B5CC] text-white rounded-lg",
        "hover:bg-[#3a9bb1] transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[#50B5CC]/50",
        "text-lg font-medium",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}