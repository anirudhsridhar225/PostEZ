"use client";
import Header from "@/components/Header";
import Pagethree from "@/components/Pagethree";
import Pagetwo from "@/components/Pagetwo";
import { Beth_Ellen } from "next/font/google";
import Link from "next/link";

const beth_ellen = Beth_Ellen({ weight: "400", subsets: ['latin'] });

export default function Home() {
    return (
        <div>
            <div className="min-h-screen min-w-screen bg-[#0A0A0A] bg-grid-white/[0.07] relative flex flex-col items-center">
                <Header />
                <div className="absolute pointer-events-none inset-0 flex items-center justify-end dark:bg-[#0A0A0A] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className="w-4/5 flex flex-col items-end justify-end text-right font-light">
                    <p className="text-4xl sm:text-8xl relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 tracking-tight leading-none">
                        your best content could start<br />with a <span className="text-[#50B5CC]"><span className={beth_ellen.className}>voice message.</span></span>
                    </p>
                    <p className="w-1/2 text-lg sm:text-2xl relative z-20 text-[#FAFAFA]/[0.4] pb-8 tracking-tight flex justify-end text-right">
                        Ditch the keyboard and let your voice do the work. Our intelligent system crafts high-quality content from your voice messages, saving you time and effort.
                    </p>
                    <Link href="/onboarding">
                        <button className="bg-white py-3 px-4 rounded-lg z-10 text-black font-normal tracking-tighter hover:scale-110 transition-all duration-100">Try for free</button>
                    </Link>
                </div>
            </div>
            <Pagetwo />
            <div className="bg-[#0A0A0A] min-h-screen flex justify-center items-center">
                <p className="text-6xl w-4/5 text-center text-[#FAFAFA]/[0.2] tracking-tight justified-text font-light hover:text-[#FAFAFA]/[0.7] transition-colors duration-700">
                    Ditch the keyboard and let your voice do the work. Our intelligent system crafts high-quality content from your
                    voice messages, saving you time and effort. Ditch the keyboard and let your voice do the work.
                    Our intelligent system crafts high-quality content from your voice messages,
                    saving you time and effort.
                </p>
            </div>
            <Pagethree />
        </div>
    );
}

{/*
  display name
  link to instagram profile
  describe themselves as word traits max 3 words
  expected sm goals
  ideal audience
  feed aesthetic
  looks vs content tradeoff
  ideal account
*/}