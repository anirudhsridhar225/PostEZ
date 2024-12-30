"use client";
import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && (
          <label className="block text-sm font-medium text-white/70 mb-2">
            {label}
          </label>
        )}
        <div className="relative z-0">
          <input
            type={type}
            className={cn(
              "w-full p-3 text-white",
              "border-b-2 border-[#50B5CC]/50",
              "placeholder:text-white/[0.5]",
              "transition-all duration-200",
              "text-lg",
              error && "border-red-500 focus:border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#50B5CC]/10" />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);