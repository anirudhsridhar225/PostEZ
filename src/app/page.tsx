import Header from "@/components/Header";
import { Beth_Ellen, Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });
const beth_ellen = Beth_Ellen({ weight: "400", subsets: ['latin'] });

export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-[rgb(32, 33, 37)] bg-grid-white/[0.07] relative flex flex-col items-center">
      <Header />
      <div className="absolute pointer-events-none inset-0 flex items-center justify-end dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="w-4/5 flex flex-col items-end justify-end text-right">
        <p className="text-4xl sm:text-8xl relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 tracking-tighter">
          <span className={inter.className}>your best content could start with a <span className="text-[#50B5CC]"><span className={beth_ellen.className}>voice message.</span></span></span>
        </p>
        <p className="w-1/2 text-lg sm:text-2xl relative z-20 text-[#FAFAFA]/[0.4] py-8 tracking-tighter flex justify-end text-right">
          Ditch the keyboard and let your voice do the work. Our intelligent system crafts high-quality content from your voice messages, saving you time and effort.
        </p>
        <button className="bg-white py-3 px-4 rounded-lg z-10 text-black tracking-tighter"><span className={inter.className}>Try for free</span></button>
      </div>
    </div>
  );
}
