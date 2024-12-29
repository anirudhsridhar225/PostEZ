import { Imbue } from "next/font/google";

const imbue = Imbue({ subsets: ['latin'] });

const ServiceSection = ({ title }: any) => {
  return (
    <div className="relative flex flex-1 items-center justify-center group w-full h-1/3">
      {/* Background div that turns red on hover */}
      <div className="absolute inset-0 group-hover:bg-[#E55865E5]/[0.9] transition-all duration-700"></div>
      
      {/* Foreground div that rounds on hover with text */}
      <div className="absolute inset-0 flex items-center justify-center border-b border-t border-white/[0.5] group bg-[#0A0A0A] hover:rounded-[110px] transition-all duration-700">
        <p className="text-4xl sm:text-8xl text-center text-white group-hover:text-[#E55865] relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 transition-all duration-700">
          <span className={imbue.className}>{title}</span>
        </p>
      </div>
    </div>
  );
};

export default function Pagethree() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
      <ServiceSection title={<>INFLUENCER<br />MARKETING</>} />
      <ServiceSection title={<>SOCIAL MEDIA<br />MANAGEMENT</>} />
      <ServiceSection title={<>SCHEDULING &<br />PRODUCTION</>} />
    </div>
  );
}