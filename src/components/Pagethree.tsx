'use client'
import localFont from 'next/font/local';
import { useRef } from 'react';
import CustomCursor from './CustomCursor';

const imbue = localFont({
  src: './billing.woff2',
  display: 'swap'
});

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ServiceSection = ({ title }: any) => {
  return (
    <div className="relative flex flex-1 items-center justify-center group w-full h-1/3">
      <div className="absolute inset-0 group-hover:bg-white/[0.9] transition-all duration-700"></div>
      <div className="absolute inset-0 flex items-center justify-center border-b border-t border-white/[0.5] group bg-[#0A0A0A] hover:rounded-[110px] transition-all duration-700">
        <p className="text-4xl sm:text-8xl text-center font-thin text-white group-hover:text-[#E55865] relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 transition-all duration-700">
          <span className={imbue.className}>{title}</span>
        </p>
      </div>
    </div>
  );
};

export default function Pagethree() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen min-w-screen flex flex-col items-center justify-center cursor-none overflow-hidden"
    >
      <CustomCursor containerRef={containerRef} />
      <ServiceSection title={<>INFLUENCER<br />MARKETING</>} />
      <ServiceSection title={<>SOCIAL MEDIA<br />MANAGEMENT</>} />
      <ServiceSection title={<>SCHEDULING &<br />PRODUCTION</>} />
    </div>
  );
}