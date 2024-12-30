"use client";

import { Menu } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface HamburgerNavProps {
  onMicClick?: () => void;
  onCalendarClick?: () => void;
}

const HamburgerNav = ({ onMicClick, onCalendarClick }: HamburgerNavProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`
        fixed left-0 top-0 h-screen bg-[#0E0E0E] transition-all duration-300 ease-in-out z-10
        ${isExpanded ? 'w-48' : 'w-18'}
        flex flex-col items-center justify-start py-4 border-r border-[#262626]
      `}
    >
      {/* Hamburger Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 flex gap-3"
      >
        <Menu className="h-[30px] w-[30px] text-white min-w-[20px] text-center" />
        <span 
          className={`
            text-white whitespace-nowrap transition-opacity duration-300
            ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}
          `}
        >
          Menu
        </span>
      </button>

      {/* Navigation Items */}
      <div className="flex flex-col items-center w-full">
        <button
          onClick={onMicClick}
          className="w-full px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors group"
        >
          <Image src="/mic.svg" alt="mic" height={30} width={30} />
          <span 
            className={`
              text-white whitespace-nowrap transition-opacity duration-300
              ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}
              group-hover:text-[#007AFF]
            `}
          >
            Microphone
          </span>
        </button>
      </div>
    </div>
  );
};

export default HamburgerNav;