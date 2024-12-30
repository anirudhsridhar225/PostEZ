'use client'
import { MultiStepForm } from "@/components/QuestionForm";
import { Beth_Ellen } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";

const beth_ellen = Beth_Ellen({ weight: "400", subsets: ['latin'] });

export default function Home() {
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        // this forces a rerender
        setHydrated(true)
    }, [])

    if (!hydrated) {
        // this returns null on first render, so the client and server match
        return null
    }
    return (
        <div className="bg-[#171717] min-h-screen min-w-screen pl-40">
            {/* <HamburgerNav /> */}
            <div className="min-h-screen w-4/5 flex flex-col justify-around space-y-5">
                <div className="flex flex-1 flex-col items-center justify-center space-y-5">
                    <div className="w-full flex flex-row space-x-10">
                        <p className="text-6xl tracking-tight font-light">building your <span className="text-[#50B5CC]"><span className={beth_ellen.className}>brand identity</span></span></p>
                        <Image src="/dil.svg" alt="dil" height={80} width={80} />
                    </div>
                    <p className="text-2xl tracking-tight text-white/[0.5]">as a content creator,
                        your unique brand voice is your superpower. let's define yours through a few key questions, so our AI
                        can craft content that truly reflects you and resonates with your audience.
                    </p>
                </div>
                <div className="flex-auto flex justify-start items-start w-full mt-auto">
                    <MultiStepForm />
                </div>
            </div>
        </div>
    );
}