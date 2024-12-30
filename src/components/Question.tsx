"use client";
import React, { useEffect, useRef } from 'react';
import { Input } from './input';

interface QuestionProps {
  question: string;
  type: 'text' | 'email' | 'number';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onComplete: () => void;
}

export function Question({ 
  question, 
  type, 
  placeholder, 
  value, 
  onChange, 
  onComplete 
}: QuestionProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [question]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && value.trim()) {
      onComplete();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (type === 'number' && e.target.value.length >= 2) {
      onComplete();
    }
  };

  return (
    <div className="min-h-[100px]">
      <h2 className="text-3xl font-light text-white mb-4">{question}</h2>
      <Input
        ref={inputRef}
        type={type}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full bg-[#171717] rounded-xl border border-[#50B5CC] text-white placeholder-white focus:outline-none focus:border-white transition-colors"
        required
      />
    </div>
  );
}