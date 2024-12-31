import { Beth_Ellen } from 'next/font/google';

const beth_ellen = Beth_Ellen({ weight: '400', subsets: ['latin'] });

export default function Footer() {
  return (
    <div className="min-h-screen min-w-screen bg-[#0A0A0A] relative flex items-center justify-center">
      <p className="text-6xl text-white tracking-tight font-light">start <span className="text-[#50B5CC] "><span className={beth_ellen.className}>today</span></span></p>
    </div>
  );
}
